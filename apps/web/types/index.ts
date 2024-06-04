import { PlatformProduct } from "@enterprise-commerce/core/platform/types"

export type SearchParamsType = Record<string, string | string[] | undefined>

export type CommerceProduct = PlatformProduct & {
  // These are opt-in features, must exist in meilisearch index first (They are set via cron jobs)
  avgRating?: number
  totalReviews?: number
  reviewsSummary?: string
}
