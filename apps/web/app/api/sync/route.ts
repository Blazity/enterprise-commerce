import { meilisearch } from "client/meilisearch"
import { Root } from "shopify"

export async function POST(req: Request) {
  const { product, metadata } = (await req.json()) as Root

  let index = await meilisearch.getIndex("products")

  if (!index.uid) {
    await meilisearch.createIndex("products")
    // TODO: wait 5 seconds or so
    index = await meilisearch.getIndex("products")
  }

  const normalizedProduct = { ...product, id: product.id.replace("gid://shopify/Product/", "") }

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
