import { PlatformProduct } from "lib/shopify/types"

export type SearchParamsType = Record<string, string | string[] | undefined>

export type CommerceProduct = PlatformProduct & {
  // These are opt-in features, must exist in meilisearch index first (They are set via cron jobs)
  avgRating?: number
  totalReviews?: number
  reviewsSummary?: string
  hierarchicalCategories?: {
    lvl0?: string[]
    lvl1?: string[]
    lvl2?: string[]
  }
}
