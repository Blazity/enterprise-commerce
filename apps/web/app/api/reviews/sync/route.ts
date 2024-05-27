import type { Review } from "@enterprise-commerce/reviews"
import { meilisearch } from "clients/meilisearch"
import { reviewsClient } from "clients/reviews"
import { env } from "env.mjs"
import { authenticate } from "utils/authenticate-api-route"

export const maxDuration = 60

export async function POST(req: Request) {
  if (!authenticate(req)) {
    return new Response("Unauthorized", {
      status: 401,
    })
  }

  if (!env.MEILISEARCH_REVIEWS_INDEX) {
    console.error({
      message: "Lacking environment variable",
      source: "api/reviews/sync",
    })
    return new Response(JSON.stringify({ message: "Sorry, something went wrong" }), { status: 500 })
  }

  const allReviews: Review[] = []
  const { reviews, totalPages } = await reviewsClient.getProductReviews({ per_page: 100 })
  allReviews.push(...reviews)

  for (let page = 2; page <= totalPages; page++) {
    const { reviews } = await reviewsClient.getProductReviews({ per_page: 100, page })
    allReviews.push(...reviews)
  }

  const reviewsIndex = meilisearch?.index(env.MEILISEARCH_REVIEWS_INDEX)

  if (!reviewsIndex) {
    console.error({
      message: "No reviews index found",
      source: "api/reviews/sync",
    })
    return new Response(JSON.stringify({ message: "Sorry, something went wrong" }), { status: 500 })
  }

  const allIndexReviews = await reviewsIndex?.getDocuments<Review>({
    limit: 10000,
  })

  const delta = allReviews.filter((review) => {
    const indexReview = allIndexReviews?.results.find((r) => r.id === review.id)
    return indexReview?.updated_at !== review.updated_at
  })

  if (!delta.length) {
    return new Response(JSON.stringify({ message: "No reviews to sync" }), { status: 200 })
  }

  await reviewsIndex.updateDocuments(delta, { primaryKey: "id" })

  return new Response(JSON.stringify({ message: "Reviews synced" }), { status: 200 })
}
