"use server"

import { unstable_cache } from "next/cache"
import { meilisearch } from "clients/meilisearch"
import { ComparisonOperators, FilterBuilder } from "utils/filterBuilder"
import { getDemoSingleCategory, isDemoMode } from "utils/demoUtils"
import type { PlatformCollection } from "@enterprise-commerce/core/platform/types"
import { env } from "env.mjs"

export const getCollection = unstable_cache(
  async (slug: string) => {
    if (isDemoMode()) return getDemoSingleCategory(slug)

    if (!env.MEILISEARCH_CATEGORIES_INDEX) throw new Error("Missing index variable")

    const index = await meilisearch?.getIndex<PlatformCollection>(env.MEILISEARCH_CATEGORIES_INDEX)
    const documents = await index?.getDocuments({ filter: new FilterBuilder().where("handle", ComparisonOperators.Equal, slug).build(), limit: 1 })
    return documents.results.find(Boolean) || null
  },
  ["category-by-handle"],
  { revalidate: 3600 }
)
