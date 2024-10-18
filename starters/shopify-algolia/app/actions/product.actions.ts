"use server"

import { unstable_cache } from "next/cache"
import { env } from "env.mjs"

import { algolia } from "clients/search"
import type { Review } from "lib/reviews/types"

import { getDemoProductReviews, getDemoSingleProduct, isDemoMode } from "utils/demo-utils"
import type { CommerceProduct } from "types"
import { notifyOptIn } from "utils/opt-in"

export const searchProducts = unstable_cache(
  async (query: string, limit: number = 4) => {
    if (isDemoMode())
      return {
        hits: [],
        hasMore: false,
      }

    const { hits, estimatedTotalHits } = await algolia.search<CommerceProduct>({
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

export const getProduct = unstable_cache(
  async (handle: string) => {
    if (isDemoMode()) return getDemoSingleProduct(handle)

    const { hits } = await algolia.search<CommerceProduct>({
      indexName: env.ALGOLIA_PRODUCTS_INDEX,
      searchParams: {
        filters: algolia.filterBuilder().where("handle", handle).build(),
        hitsPerPage: 1,
      },
    })

    return hits.find(Boolean) || null
  },
  ["product-by-handle"],
  { revalidate: 3600 }
)

export const getProductReviews = unstable_cache(
  async (handle: string, { page = 1, limit = 10 } = { page: 1, limit: 10 }) => {
    if (isDemoMode()) return getDemoProductReviews()

    if (!env.ALGOLIA_REVIEWS_INDEX) {
      notifyOptIn({ feature: "reviews", source: "product.actions.ts" })
      return { reviews: [], total: 0 }
    }

    const { hits, nbHits } = await algolia.search<Review>({
      indexName: env.ALGOLIA_REVIEWS_INDEX,
      searchParams: {
        filters: algolia.filterBuilder().where("product_handle", handle).and().where("published", "true").and().where("hidden", "false").build(),
        hitsPerPage: limit,
        page,
        attributesToRetrieve: ["body", "rating", "verified", "reviewer", "published", "created_at", "hidden", "featured"],
      },
    })

    return { reviews: hits.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()), total: nbHits }
  },
  ["product-reviews-by-handle"],
  { revalidate: 3600 }
)
