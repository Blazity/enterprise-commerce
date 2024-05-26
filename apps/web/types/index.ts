import { PlatformProduct } from "@enterprise-commerce/core/platform/types"

export type SearchParamsType = Record<string, string | string[] | undefined>

/*
 * Storefront product enriched with the reviews fields that we attach whenever we sync results in meilisearch.
 */
export type CommerceProduct = PlatformProduct & {
  avgRating: number
  totalReviews: number
}
