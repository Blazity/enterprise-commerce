import { meilisearch } from "clients/meilisearch"
import { storefrontClient } from "clients/storefrontClient"
import { env } from "env.mjs"
import { Index } from "meilisearch"
import { FailedAttemptError } from "p-retry"
import { Root } from "shopify-webhooks"
import { MEILISEARCH_INDEX } from "constants/index"
import { createHmac } from "crypto"
import { replicate } from "clients/replicate"

import { PlatformImage, PlatformProduct } from "@enterprise-commerce/core/platform/types"

export async function POST(req: Request) {
  const hmac = req.headers.get("X-Shopify-Hmac-Sha256")

  if (!env.SHOPIFY_APP_API_KEY) {
    return new Response(JSON.stringify({ message: "Not all credentials were provided for the deployment" }), { status: 500, headers: { "Content-Type": "application/json" } })
  }

  const rawPayload = await req.text()
  if (!isWebhookVerified(rawPayload, hmac!)) {
    return new Response(JSON.stringify({ message: "Could not verify request." }), { status: 401, headers: { "Content-Type": "application/json" } })
  }

  const { product, metadata } = JSON.parse(rawPayload) as Root

  let index = await getMeilisearchIndex(MEILISEARCH_INDEX)

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
      await index.updateDocuments([{ ...originalProduct, id: normalizeId(originalProduct.id), images: newImages }], { primaryKey: "id" })
      return Response.json({ status: "ok" })
    }

    await index.deleteDocument(normalizeId(product.id))
  }

  if (metadata.action === "UPDATE" || metadata.action === "CREATE") {
    if (originalProduct) {
      const newImages = await generateProductAltTags(originalProduct)
      await index.updateDocuments([{ ...originalProduct, id: normalizeId(originalProduct.id), images: newImages }], { primaryKey: "id" })
    }
  }

  return Response.json({ status: "ok" })
}

function normalizeId(id: string) {
  const shopifyIdPrefix = "gid://shopify/Product/"
  return id.replace(shopifyIdPrefix, "")
}

function denormalizeId(id: string) {
  return id.startsWith("gid://shopify/Product/") ? id : `gid://shopify/Product/${id}`
}

// TODO: remove, move to docs
async function updateAttributesSettings(index: Index) {
  const sortableAttributes = await index.getSortableAttributes()
  const filterableAttributes = await index.getFilterableAttributes()

  if (!sortableAttributes.includes("minPrice") || !sortableAttributes.includes("updatedAtTimestamp")) {
    await index.updateSortableAttributes(["minPrice", "updatedAtTimestamp"])
  }

  if (!filterableAttributes.includes("tags") || !filterableAttributes.includes("collections")) {
    await index.updateFilterableAttributes(["tags", "collections"])
  }
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

function isWebhookVerified(rawBody: string, hmac: string) {
  const genHash = createHmac("sha256", env.SHOPIFY_APP_API_KEY!).update(rawBody).digest("base64")
  return genHash === hmac
}

async function generateProductAltTags(product: PlatformProduct) {
  const altTagAwareImages = await Promise.all(product?.images?.map(mapper).filter(Boolean))
  return altTagAwareImages || []

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
