import type { PlatformProduct } from "lib/shopify/types"
import { env } from "env.mjs"
import { compareHmac } from "utils/compare-hmac"
import { enrichProduct } from "utils/enrich-product"
import { deleteCategories, deleteProducts, updateCategories, updateProducts } from "lib/meilisearch"
import { getCollection, getHierarchicalCollections, getProduct } from "lib/shopify"

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
      const collection = await getCollection(makeShopifyId(`${id}`, "Collection"))
      if (!collection) {
        console.error(`Collection ${id} not found`)
        return new Response(JSON.stringify({ message: "Collection not found" }), { status: 404, headers: { "Content-Type": "application/json" } })
      }

      await updateCategories([{ ...collection, id: `${id}` }])

      break

    case "collections/delete":
      await deleteCategories([id])
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
      const product = await getProduct(makeShopifyId(`${id}`, "Product"))
      const items = env.SHOPIFY_HIERARCHICAL_NAV_HANDLE ? (await getHierarchicalCollections(env.SHOPIFY_HIERARCHICAL_NAV_HANDLE)).items : []

      if (!product) {
        console.error(`Product ${id} not found`)
        return new Response(JSON.stringify({ message: "Product not found" }), { status: 404, headers: { "Content-Type": "application/json" } })
      }

      const enrichedProduct = await enrichProduct(product, items)

      await updateProducts([normalizeProduct(enrichedProduct, id)])

      break
    case "products/delete":
      await deleteProducts([id])
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
