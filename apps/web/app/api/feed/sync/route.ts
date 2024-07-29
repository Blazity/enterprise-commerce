import type { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { meilisearch } from "clients/search"
import { storefrontClient } from "clients/storefrontClient"
import { env } from "env.mjs"
import { compareHmac } from "utils/compare-hmac"
import { enrichProduct } from "utils/enrich-product"

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
  switch (topic) {
    case "collections/update":
    case "collections/create":
      const collection = await storefrontClient.getCollectionById(makeShopifyId(`${id}`, "Collection"))
      if (!collection) {
        console.error(`Collection ${id} not found`)
        return new Response(JSON.stringify({ message: "Collection not found" }), { status: 404, headers: { "Content-Type": "application/json" } })
      }
      await meilisearch.updateDocuments({
        indexName: env.MEILISEARCH_CATEGORIES_INDEX,
        documents: [{ ...collection, id: `${id}` }],
        options: {
          primaryKey: "id",
        },
      })

      break

    case "collections/delete":
      await meilisearch.deleteDocuments({
        indexName: env.MEILISEARCH_CATEGORIES_INDEX,
        params: [id],
      })
      break

    default:
      return new Response(JSON.stringify({ message: "Unsupported topic" }), { status: 400, headers: { "Content-Type": "application/json" } })
  }

  return new Response(JSON.stringify({ message: "Success" }), { status: 200, headers: { "Content-Type": "application/json" } })
}

async function handleProductTopics(topic: SupportedTopic, { id }: Record<string, string>): Promise<Response> {
  switch (topic) {
    case "products/update":
    case "products/create":
      const product = await storefrontClient.getProduct(makeShopifyId(`${id}`, "Product"))
      const items = env.SHOPIFY_HIERARCHICAL_NAV_HANDLE ? (await storefrontClient.getHierarchicalCollections(env.SHOPIFY_HIERARCHICAL_NAV_HANDLE)).items : []

      if (!product) {
        console.error(`Product ${id} not found`)
        return new Response(JSON.stringify({ message: "Product not found" }), { status: 404, headers: { "Content-Type": "application/json" } })
      }

      const enrichedProduct = await enrichProduct(product, items)
      await meilisearch.updateDocuments({
        indexName: env.MEILISEARCH_PRODUCTS_INDEX,
        documents: [normalizeProduct(enrichedProduct, id)],
        options: {
          primaryKey: "id",
        },
      })

      break
    case "products/delete":
      await meilisearch.deleteDocuments({
        indexName: env.MEILISEARCH_PRODUCTS_INDEX,
        params: [id],
      })
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
