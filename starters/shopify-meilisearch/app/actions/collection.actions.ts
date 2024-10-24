"use server"

import { unstable_cacheTag as cacheTag, unstable_cacheLife as cacheLife } from "next/cache"
import { meilisearch } from "clients/search"
import { ComparisonOperators, FilterBuilder } from "lib/meilisearch/filter-builder"
import { getDemoSingleCategory, isDemoMode } from "utils/demo-utils"
import type { PlatformCollection } from "lib/shopify/types"
import { env } from "env.mjs"

export const getCollection = async (slug: string) => {
  "use cache"
  cacheTag(`collection-${slug}`)
  cacheLife("days")

  if (isDemoMode()) return getDemoSingleCategory(slug)

  const results = await meilisearch.searchDocuments<PlatformCollection>({
    indexName: env.MEILISEARCH_CATEGORIES_INDEX,
    options: {
      filter: new FilterBuilder().where("handle", ComparisonOperators.Equal, slug).build(),
      limit: 1,
      attributesToRetrieve: ["handle", "title", "seo"],
    },
  })

  return results.hits.find(Boolean) || null
}
