import { meilisearch } from "client/meilisearch"
import { storefrontClient } from "client/storefrontClient"
import { env } from "env.mjs"
import { FailedAttemptError } from "p-retry"
import { Root } from "shopify-webhooks"
import { createHmac } from "crypto"

import { SingleProductQuery } from "../../../../../types/storefront.generated"

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

  let index = await getMeilisearchIndex("products")

  if (!product?.id) {
    return Response.json({ status: "error", message: "Could not create product" })
  }

  if (metadata.action === "DELETE") {
    await index.deleteDocument(normalizeId(product.id))
  }

  if (metadata.action === "UPDATE" || metadata.action === "CREATE") {
    const originalProduct = await storefrontClient.getProduct(product.id)
    const normalizedProduct = normalizeProduct(originalProduct.data?.product)

    if (normalizedProduct) {
      await index.updateDocuments([normalizedProduct], {
        primaryKey: "id",
      })
    }
  }

  return Response.json({ status: "ok" })
}

function normalizeProduct(product: SingleProductQuery["product"] | undefined | null) {
  if (!product) return product

  return {
    ...product,
    id: normalizeId(product.id),
    title: product.title,
    descriptionHtml: product.descriptionHtml,
    priceRange: product.priceRange,
    featuredImage: product.featuredImage,
    seo: product.seo,
    updatedAt: product.updatedAt,
    handle: product.handle,
    description: product.description,
    options: product.options,
    tags: product.tags,
    images: product?.images?.edges?.map((image) => image?.node),
    variants: product?.variants?.edges?.map((variant) => variant?.node),
    collections: product?.collections?.nodes?.map((collection) => collection),
  }
}

function normalizeId(id: string) {
  const shopifyIdPrefix = "gid://shopify/Product/"
  return id.replace(shopifyIdPrefix, "")
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
