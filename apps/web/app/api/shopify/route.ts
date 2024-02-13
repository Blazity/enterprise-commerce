import { meilisearch } from "client/meilisearch"
import { Root } from "shopify"

export async function POST(req: Request) {
  const { product } = (await req.json()) as Root

  let index = await meilisearch.getIndex("products")

  if (!index.uid) {
    await meilisearch.createIndex("products")
    index = await meilisearch.getIndex("products")
  }

  await index.updateDocuments([{ ...product, id: product.id.replace("gid://shopify/Product/", "") }], {
    primaryKey: "id",
  })

  return Response.json({ status: "ok" })
}
