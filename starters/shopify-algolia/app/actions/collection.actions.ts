"use server"

import { unstable_cache } from "next/cache"
import { algolia } from "clients/search"
import { getDemoSingleCategory, isDemoMode } from "utils/demoUtils"
import type { PlatformCollection } from "lib/shopify/types"
import { env } from "env.mjs"

export const getCollection = unstable_cache(
  async (slug: string) => {
    if (isDemoMode()) return getDemoSingleCategory(slug)

    const results = await algolia.search<PlatformCollection>({
      indexName: env.ALGOLIA_CATEGORIES_INDEX,
      searchParams: {
        filters: algolia.filterBuilder().where("handle", slug).build(),
        hitsPerPage: 1,
        attributesToRetrieve: ["handle", "title", "seo"],
      },
    })

    return results.hits.find(Boolean) || null
  },
  ["category-by-handle"],
  { revalidate: 3600 }
)
