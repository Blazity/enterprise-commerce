import { unstable_noStore } from "next/cache"
import { env } from "env.mjs"
import { authenticate } from "utils/authenticate-api-route"
import { isOptIn, notifyOptIn } from "utils/opt-in"
import { isDemoMode } from "utils/demo-utils"
import { getAllProducts, getAllReviews, updateProducts, updateReviews } from "lib/meilisearch"
import { getAllProductReviews } from "lib/reviews"

export const maxDuration = 60

export async function GET(req: Request) {
  unstable_noStore()
  if (!authenticate(req)) {
    return new Response("Unauthorized", {
      status: 401,
    })
  }

  if (!isOptIn("reviews")) {
    const res = notifyOptIn({ feature: "reviews", source: "api/reviews/sync" })
    return new Response(JSON.stringify(res), { status: 200 })
  }

  if (isDemoMode() || !env.MEILISEARCH_REVIEWS_INDEX) {
    console.error({
      message: "Lacking environment variables",
      source: "api/reviews/sync",
    })
    return new Response(JSON.stringify({ message: "Sorry, something went wrong" }), { status: 500 })
  }

  const [allReviews, { results: allProducts }, { reviews }] = await Promise.all([
    getAllProductReviews(),
    getAllProducts({
      fields: ["handle", "title", "avgRating", "totalReviews"],
    }),
    getAllReviews({
      fields: ["updated_at", "id"],
    }),
  ])

  const reviewsDelta = allReviews.filter((review) => {
    const indexReview = reviews?.find((r) => r.id === review.id)
    return indexReview?.updated_at !== review.updated_at
  })

  const productTotalReviewsDelta = allProducts
    ?.map((product) => {
      const productReviews = allReviews.filter((review) => review.product_handle === product.handle && review.published && !review.hidden)
      if (!!productReviews.length && productReviews.length !== product.totalReviews) {
        const avgRating = productReviews.reduce((acc, review) => acc + review.rating, 0) / productReviews.length || 0
        return { ...product, avgRating, totalReviews: productReviews.length }
      }

      return null
    })
    .filter(Boolean)

  if (!reviewsDelta.length && !productTotalReviewsDelta?.length) {
    return new Response(JSON.stringify({ message: "Nothing to sync" }), { status: 200 })
  }

  !!reviewsDelta.length && updateReviews(reviewsDelta)
  !!productTotalReviewsDelta?.length && updateProducts(productTotalReviewsDelta)

  return new Response(JSON.stringify({ message: "All synced" }), { status: 200 })
}
