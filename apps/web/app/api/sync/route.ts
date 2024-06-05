import type { PlatformImage, PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { FailedAttemptError } from "p-retry"
import { meilisearch } from "clients/meilisearch"
import { replicate } from "clients/replicate"
import { storefrontClient } from "clients/storefrontClient"
import { env } from "env.mjs"
import { Root } from "shopify-webhooks"
import { compareHmac } from "utils/compare-hmac"
import { isDemoMode } from "utils/demoUtils"

export async function POST(req: Request) {
  const hmac = req.headers.get("X-Shopify-Hmac-Sha256")

  if (!env.SHOPIFY_APP_API_SECRET_KEY || !hmac) {
    return new Response(JSON.stringify({ message: "Not all credentials were provided for the deployment" }), { status: 500, headers: { "Content-Type": "application/json" } })
  }

  const rawPayload = await req.text()

  if (
    !compareHmac({
      body: rawPayload,
      hmac,
      secret: env.SHOPIFY_APP_API_SECRET_KEY,
    })
  ) {
    return new Response(JSON.stringify({ message: "Could not verify request." }), { status: 401, headers: { "Content-Type": "application/json" } })
  }

  const { product, metadata } = JSON.parse(rawPayload) as Root

  if (isDemoMode()) {
    console.error({
      message: "Missing environment variable MEILISEARCH_PRODUCTS_INDEX",
    })
    return new Response(JSON.stringify({ message: "Sorry, something went wrong" }), { status: 500, headers: { "Content-Type": "application/json" } })
  }

  let index = await getMeilisearchIndex(env.MEILISEARCH_PRODUCTS_INDEX)

  if (!index) {
    return new Response(JSON.stringify({ message: "Could not get products index" }), { status: 500, headers: { "Content-Type": "application/json" } })
  }

  // await updateAttributesSettings(index)

  if (!product?.id) {
    return Response.json({ status: "error", message: "Could not create product" })
  }

  const originalProduct = await storefrontClient.getProduct(product.id)

  if (metadata.action === "DELETE") {
    // Shopify sends a DELETE webhook not only when a product is deleted, but also when a product is unpublished or product variant is deleted.
    // Because of this, we need to first check if the product is REALLY deleted.
    const productStatus = await storefrontClient.getProductStatus(denormalizeId(product.id))

    if (productStatus?.status === "DRAFT") {
      return Response.json({ status: "ok", message: "Product drafted" })
    }

    if (originalProduct?.id) {
      const newImages = await generateProductAltTags(originalProduct)
      await index.updateDocuments([normalizeProduct({ product: originalProduct, newImages })], { primaryKey: "id" })
      return Response.json({ status: "ok" })
    }

    await index.deleteDocument(normalizeId(product.id))
  }

  if (metadata.action === "UPDATE" || metadata.action === "CREATE") {
    if (originalProduct) {
      const newImages = await generateProductAltTags(originalProduct)
      await index.updateDocuments([normalizeProduct({ product: originalProduct, newImages })], { primaryKey: "id" })
    }
  }

  return Response.json({ status: "ok" })
}

function normalizeProduct({ product, newImages }: { product: PlatformProduct; newImages: (PlatformImage | undefined)[] }) {
  return {
    ...product,
    id: normalizeId(product.id),
    images: newImages,
    collections: product.collections.map((collection) => ({ handle: collection.handle, id: collection.id })),
  }
}

function normalizeId(id: string) {
  const shopifyIdPrefix = "gid://shopify/Product/"
  return id.replace(shopifyIdPrefix, "")
}

function denormalizeId(id: string) {
  return id.startsWith("gid://shopify/Product/") ? id : `gid://shopify/Product/${id}`
}

async function getMeilisearchIndex(indexName: string) {
  const pRetry = await import("p-retry")

  const run = async () => {
    return meilisearch.getIndex(indexName)
  }

  const onFailedAttempt = async (error: FailedAttemptError) => {
    await meilisearch.createIndex(indexName)
    console.log(`Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`)
  }

  return pRetry.default(run, {
    retries: 10,
    onFailedAttempt,
  })
}

async function generateProductAltTags(product: PlatformProduct) {
  const altTagAwareImages = await Promise.all(product?.images?.slice(0, 1).map(mapper).filter(Boolean))
  return [...altTagAwareImages, ...product?.images?.slice(1)?.filter(Boolean)] || []

  async function mapper(image: PlatformImage) {
    if (!replicate) return
    const output = (await replicate.run("salesforce/blip:2e1dddc8621f72155f24cf2e0adbde548458d3cab9f00c0139eea840d0ac4746", {
      input: {
        task: "image_captioning",
        image: image.url,
      },
    })) as unknown as string

    return { ...image, altText: output?.replace("Caption:", "") || "" }
  }
}
