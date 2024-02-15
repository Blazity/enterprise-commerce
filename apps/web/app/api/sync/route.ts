import { meilisearch } from "client/meilisearch"
import { env } from "env.mjs"
import { FailedAttemptError } from "p-retry"
import { Product, Root } from "shopify"
import { createHmac } from "crypto"

export async function POST(req: Request) {
  const hmac = req.headers.get("X-Shopify-Hmac-Sha256")

  if (!env.SHOPIFY_APP_API_KEY) {
    return new Response(JSON.stringify({ message: "Not all credentials were provided for the deployment" }), { status: 500, headers: { "Content-Type": "application/json" } })
  }

  if (!isWebhookVerified(await req.text(), hmac!)) {
    return new Response(JSON.stringify({ message: "Could not verify request." }), { status: 401, headers: { "Content-Type": "application/json" } })
  }

  const { product, metadata } = (await req.json()) as Root

  let index = await getMeilisearchIndex("products")

  const normalizedProduct = normalizeProduct(product)

  if (!normalizedProduct?.id) {
    return Response.json({ status: "error", message: "Could not create product" })
  }

  if (metadata.action === "DELETE") {
    await index.deleteDocument(normalizedProduct.id)
  }

  if (metadata.action === "UPDATE" || metadata.action === "CREATE") {
    await index.updateDocuments([normalizedProduct], {
      primaryKey: "id",
    })
  }

  return Response.json({ status: "ok" })
}

function normalizeProduct(product: Product | undefined | null) {
  if (!product) return product

  const shopifyIdPrefix = "gid://shopify/Product/"
  return { ...product, id: product.id.replace(shopifyIdPrefix, "") }
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
