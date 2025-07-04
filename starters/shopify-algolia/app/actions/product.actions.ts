"use server"

import { unstable_cache } from "next/cache"
import { isDemoMode } from "utils/demo-utils"
import { searchProducts as searchProductsBase } from "lib/algolia/rate-limited"

export const searchProducts = unstable_cache(
  async (query: string, limit: number = 4) => {
    if (isDemoMode())
      return {
        hits: [],
        hasMore: false,
      }

    const result = await searchProductsBase(query, {
      hitsPerPage: limit,
      attributesToRetrieve: ["id", "handle", "title", "featuredImage", "images", "variants"],
    })

    const totalHits = "nbHits" in result ? result.nbHits : 0
    const hits = "hits" in result ? result.hits : []

    return { hits, hasMore: (totalHits || 0) > limit }
  },
  ["autocomplete-search"],
  { revalidate: 3600 }
)
