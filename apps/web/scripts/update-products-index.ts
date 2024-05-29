import { meilisearch } from "../clients/meilisearch"
import { env } from "env.mjs"

/*
 * this script is used only once for bulk cleanup of products index and to remove all categories data from each product, leaving only handle to it
 * (bulk operation, should be done just once)
 */
export async function updateProductIndex() {
  const index = await getMeilisearchIndex(env.MEILISEARCH_PRODUCTS_INDEX!)

  const temp_products = await meilisearch.getIndex("temp_products")

  const { results } = await index.getDocuments({
    limit: 200,
  })

  await temp_products.updateDocuments(
    results.map((product) => normalizeProduct({ product })),
    { primaryKey: "id" }
  )
}

function normalizeProduct({ product }: { product: Record<string, any> }) {
  return {
    ...product,
    collections: product.collections.map((collection) => ({ handle: collection.handle, id: collection.id })),
  }
}

async function getMeilisearchIndex(indexName: string) {
  const pRetry = await import("p-retry")

  const run = async () => {
    return meilisearch.getIndex(indexName)
  }

  const onFailedAttempt = async (error) => {
    await meilisearch.createIndex(indexName)
    console.log(`Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`)
  }

  return pRetry.default(run, {
    retries: 10,
    onFailedAttempt,
  })
}

updateProductIndex()
