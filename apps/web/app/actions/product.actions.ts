"use server"

import { unstable_cache } from "next/cache"
import { env } from "env.mjs"

import { meilisearch } from "clients/meilisearch"
import type { Review } from "@enterprise-commerce/reviews"

import { ComparisonOperators, FilterBuilder } from "utils/filterBuilder"
import { getDemoProductReviews, getDemoSingleProduct, isDemoMode } from "utils/demoUtils"
import type { CommerceProduct } from "types"
import { notifyOptIn } from "utils/opt-in"

export const searchProducts = unstable_cache(
  async (query: string, limit: number = 4) => {
    if (isDemoMode())
      return {
        hits: [],
        hasMore: false,
      }

    const index = await meilisearch?.getIndex<CommerceProduct>(env.MEILISEARCH_PRODUCTS_INDEX)

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

    const index = await meilisearch?.getIndex<CommerceProduct>(env.MEILISEARCH_PRODUCTS_INDEX)
    const documents = await index?.getDocuments({ filter: new FilterBuilder().where("handle", ComparisonOperators.Equal, handle).build(), limit: 1 })
    return documents.results.find(Boolean) || null
  },
  ["product-by-handle"],
  { revalidate: 3600 }
)

export const getProductReviews = unstable_cache(
  async (handle: string, { page = 1, limit = 10 } = { page: 1, limit: 10 }) => {
    if (isDemoMode()) return getDemoProductReviews()

    if (!env.MEILISEARCH_REVIEWS_INDEX) {
      notifyOptIn({ feature: "reviews", source: "product.actions.ts" })
      return { reviews: [], total: 0 }
    }

    const index = await meilisearch?.getIndex<Review>(env.MEILISEARCH_REVIEWS_INDEX)

    if (!index) {
      throw new Error("No reviews index found")
    }

    const { results, total } = await index?.getDocuments({
      filter: new FilterBuilder()
        .where("product_handle", ComparisonOperators.Equal, handle)
        .and()
        .where("published", ComparisonOperators.Equal, "true")
        .and()
        .where("hidden", ComparisonOperators.Equal, "false")
        .build(),
      limit,
      offset: (page - 1) * limit,
      fields: ["body", "rating", "verified", "reviewer", "published", "created_at", "hidden", "featured"],
    })

    return { reviews: results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()), total }
  },
  ["product-reviews-by-handle"],
  { revalidate: 3600 }
)
