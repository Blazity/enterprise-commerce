"use server"

import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { unstable_cache } from "next/cache"
import { meilisearch } from "clients/meilisearch"
import { ComparisonOperators, FilterBuilder } from "utils/filterBuilder"
import { getDemoSingleProduct, isDemoMode } from "utils/demoUtils"
import { env } from "env.mjs"

export const searchProducts = unstable_cache(
  async (query: string, limit: number = 4) => {
    if (isDemoMode())
      return {
        hits: [],
        hasMore: false,
      }
    const index = await meilisearch?.getIndex<PlatformProduct>(env.MEILISEARCH_PRODUCTS_INDEX)

    if (!index) return { hits: [], hasMore: false }

    const res = await index?.search(query, { limit, attributesToRetrieve: ["id", "handle", "title", "featuredImage", "images", "variants"] })

    return { hits: res.hits, hasMore: res.estimatedTotalHits > limit }
  },
  ["autocomplete-search"],
  { revalidate: 3600 }
)

export const getProduct = unstable_cache(
  async (handle: string) => {
    if (isDemoMode()) return getDemoSingleProduct(handle)

    const index = await meilisearch?.getIndex<PlatformProduct>(env.MEILISEARCH_PRODUCTS_INDEX)
    const documents = await index?.getDocuments({ filter: new FilterBuilder().where("handle", ComparisonOperators.Equal, handle).build(), limit: 1 })
    return documents.results.find(Boolean) || null
  },
  ["product-by-handle"],
  { revalidate: 3600 }
)
