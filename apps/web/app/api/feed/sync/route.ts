import type { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { meilisearch } from "clients/meilisearch"
import { storefrontClient } from "clients/storefrontClient"
import { env } from "env.mjs"
import type { FailedAttemptError } from "p-retry"
import { compareHmac } from "utils/compare-hmac"

type SupportedTopic = "products/update" | "products/delete" | "products/create" | "collections/update" | "collections/delete" | "collections/create"

/*
 * Callback Endpoint for Shopify Webhook product updates
 */
export async function POST(req: Request) {
  const hmac = req.headers.get("X-Shopify-Hmac-Sha256")
  const topic = req.headers.get("X-Shopify-Topic")
  const secret = env.SHOPIFY_APP_API_SECRET_KEY
  const rawPayload = await req.text()

  if (!secret || !hmac || !topic) {
    return new Response(JSON.stringify({ message: "Not all credentials were provided for the deployment" }), { status: 500, headers: { "Content-Type": "application/json" } })
  }

  if (
    !compareHmac({
      body: rawPayload,
      hmac,
      secret,
    })
  ) {
    return new Response(JSON.stringify({ message: "Could not verify request." }), { status: 401, headers: { "Content-Type": "application/json" } })
  }
  // there is no clear docs for what the payload looks like for different topics
  const { id } = JSON.parse(rawPayload) as Record<string, string>

  if (!id) {
    return new Response(JSON.stringify({ message: "Invalid payload" }), { status: 400, headers: { "Content-Type": "application/json" } })
  }

  if (topic.startsWith("products")) {
    return await handleProductTopics(topic as SupportedTopic, { id })
  } else if (topic.startsWith("collections")) {
    return await handleCollectionTopics(topic as SupportedTopic, { id })
  } else {
    return new Response(JSON.stringify({ message: "Unsupported topic" }), { status: 400, headers: { "Content-Type": "application/json" } })
  }
}

async function handleCollectionTopics(topic: SupportedTopic, { id }: Record<string, string>): Promise<Response> {
  const index = await getMeilisearchIndex(env.MEILISEARCH_CATEGORIES_INDEX)

  switch (topic) {
    case "collections/update":
    case "collections/create":
      const collection = await storefrontClient.getCollectionById(makeShopifyId(`${id}`, "Collection"))
      if (!collection) {
        console.error(`Collection ${id} not found`)
        return new Response(JSON.stringify({ message: "Collection not found" }), { status: 404, headers: { "Content-Type": "application/json" } })
      }
      await index.updateDocuments([{ ...collection, id: `${id}` }], {
        primaryKey: "id",
      })

      break

    case "collections/delete":
      await index.deleteDocument(id)
      break

    default:
      return new Response(JSON.stringify({ message: "Unsupported topic" }), { status: 400, headers: { "Content-Type": "application/json" } })
  }

  return new Response(JSON.stringify({ message: "Success" }), { status: 200, headers: { "Content-Type": "application/json" } })
}

async function handleProductTopics(topic: SupportedTopic, { id }: Record<string, string>): Promise<Response> {
  const index = await getMeilisearchIndex(env.MEILISEARCH_PRODUCTS_INDEX)

  switch (topic) {
    case "products/update":
    case "products/create":
      const product = await storefrontClient.getProduct(makeShopifyId(`${id}`, "Product"))
      if (!product) {
        console.error(`Product ${id} not found`)
        return new Response(JSON.stringify({ message: "Product not found" }), { status: 404, headers: { "Content-Type": "application/json" } })
      }
      await index.updateDocuments([normalizeProduct(product, id)], {
        primaryKey: "id",
      })

      break
    case "products/delete":
      await index.deleteDocument(id)
      break

    default:
      return new Response(JSON.stringify({ message: "Unsupported topic" }), { status: 400, headers: { "Content-Type": "application/json" } })
  }

  return new Response(JSON.stringify({ message: "Success" }), { status: 200, headers: { "Content-Type": "application/json" } })
}

/* Extract into utils */
function normalizeProduct(product: PlatformProduct, originalId: string): PlatformProduct {
  return {
    ...product,
    id: originalId,
  }
}

function makeShopifyId(id: string, type: "Product" | "Collection") {
  return id.startsWith("gid://shopify/") ? id : `gid://shopify/${type}/${id}`
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
