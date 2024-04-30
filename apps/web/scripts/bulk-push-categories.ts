import { storefrontClient } from "../clients/storefrontClient"
import { meilisearch } from "../clients/meilisearch"
import { env } from "../env.mjs"
import { PlatformCollection } from "@enterprise-commerce/core/platform/types"

/*
 * This script pushes all categories from storefront client to Meilisearch (bulk operation, should be done just once)
 */
async function bulkPushCategories() {
  const collections = await storefrontClient.getCollections()

  if (!collections?.length) return

  if (!env.MEILISEARCH_CATEGORIES_INDEX) throw new Error("Missing index variable")

  const index = await getMeilisearchIndex(env.MEILISEARCH_CATEGORIES_INDEX)

  await index.updateDocuments(
    collections.map((collection) => normalizeCollection(collection)),
    { primaryKey: "id" }
  )
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

function normalizeCollection(collection: PlatformCollection) {
  return {
    id: normalizeId(collection.id),
    title: collection.title,
    description: collection.description,
    descriptionHtml: collection.descriptionHtml,
    handle: collection.handle,
    seo: {
      title: collection.seo?.title,
      description: collection.seo?.description,
    },
    updatedAt: collection.updatedAt,
    image: collection.image,
  }
}

function normalizeId(id: string) {
  const shopifyIdPrefix = "gid://shopify/Collection/"
  return id.replace(shopifyIdPrefix, "")
}

bulkPushCategories()
