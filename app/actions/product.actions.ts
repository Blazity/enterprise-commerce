"use server"

import { searchClient } from "lib/algolia/client"
import { env } from "env.mjs"
import { unstable_cache } from "next/cache"
import type { CommerceProduct } from "types"
import { isDemoMode } from "utils/demo-utils"

export const searchProducts = unstable_cache(
  async (query: string, limit: number = 4) => {
    if (isDemoMode())
      return {
        hits: [],
        hasMore: false,
      }

    const { hits, estimatedTotalHits } = await searchClient.search<CommerceProduct>({
      indexName: env.ALGOLIA_PRODUCTS_INDEX,
      searchParams: {
        query,
        hitsPerPage: limit,
        attributesToRetrieve: ["id", "handle", "title", "featuredImage", "images", "variants"],
      },
    })

    return { hits, hasMore: estimatedTotalHits > limit }
  },
  ["autocomplete-search"],
  { revalidate: 3600 }
)
