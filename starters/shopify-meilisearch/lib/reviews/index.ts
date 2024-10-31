import { unstable_cache } from "next/cache"
import { reviewsClient } from "./client"
import type { ProductReviewBody } from "./types"

export const getAllProductReviews = unstable_cache(reviewsClient.getAllProductReviews, ["all-product-reviews"], { revalidate: 86400 })

export const createProductReview = async (payload: ProductReviewBody) => {
  return await reviewsClient.createProductReview(payload)
}
