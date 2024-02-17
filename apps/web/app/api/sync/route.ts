import { meilisearch } from "client/meilisearch"
import { storefrontClient } from "client/storefrontClient"
import { env } from "env.mjs"
import { Index } from "meilisearch"
import { FailedAttemptError } from "p-retry"
import { Root } from "shopify-webhooks"
import { createHmac } from "crypto"

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

  await updateAttributesSettings(index)

  if (!product?.id) {
    return Response.json({ status: "error", message: "Could not create product" })
  }

  if (metadata.action === "DELETE") {
    await index.deleteDocument(normalizeId(product.id))
  }

  if (metadata.action === "UPDATE" || metadata.action === "CREATE") {
    const originalProduct = await storefrontClient.getProduct(product.id)

    if (originalProduct) {
      await index.updateDocuments([{ ...originalProduct, id: normalizeId(originalProduct.id) }], {
        primaryKey: "id",
      })
    }
  }

  return Response.json({ status: "ok" })
}

function normalizeId(id: string) {
  const shopifyIdPrefix = "gid://shopify/Product/"
  return id.replace(shopifyIdPrefix, "")
}

async function updateAttributesSettings(index: Index) {
  const sortableAttributes = await index.getSortableAttributes()
  const filterableAttributes = await index.getFilterableAttributes()

  if (!sortableAttributes.includes("minPrice") || !sortableAttributes.includes("updatedAt")) {
    await index.updateSortableAttributes(["minPrice", "updatedAt"])
  }

  if (!filterableAttributes.includes("tags") || !sortableAttributes.includes("collections")) {
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
