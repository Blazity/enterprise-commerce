import { unstable_noStore } from "next/cache"
import { algolia } from "clients/search"
import { reviewsClient } from "clients/reviews"
import { env } from "env.mjs"
import { authenticate } from "utils/authenticate-api-route"
import { isOptIn, notifyOptIn } from "utils/opt-in"
import type { Review } from "lib/reviews/types"
import type { CommerceProduct } from "types"
import { isDemoMode } from "utils/demoUtils"

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

  if (isDemoMode() || !env.ALGOLIA_REVIEWS_INDEX) {
    console.error({
      message: "Lacking environment variables",
      source: "api/reviews/sync",
    })
    return new Response(JSON.stringify({ message: "Sorry, something went wrong" }), { status: 500 })
  }

  const [allReviews = [], { hits: allProducts = [] }, { hits: allIndexReviews = [] }] = await Promise.all([
    reviewsClient.getAllProductReviews(),
    algolia.getAllResults<CommerceProduct>({
      indexName: env.ALGOLIA_PRODUCTS_INDEX,
      browseParams: {
        attributesToRetrieve: ["handle", "totalReviews", "avgRating", "id"],
      },
    }),
    algolia.getAllResults<Review>({
      indexName: env.ALGOLIA_REVIEWS_INDEX,
      browseParams: {
        attributesToRetrieve: ["updated_at", "id"],
      },
    }),
  ])

  const reviewsDelta = allReviews.filter((review) => {
    const indexReview = allIndexReviews.find((r) => r.id === review.id)
    return indexReview?.updated_at !== review.updated_at
  })

  const productTotalReviewsDelta = allProducts
    .map((product) => {
      const productReviews = allReviews.filter((review) => review.product_handle === product.handle && review.published && !review.hidden)
      if (!!productReviews.length && productReviews.length !== product.totalReviews) {
        const avgRating = productReviews.reduce((acc, review) => acc + review.rating, 0) / productReviews.length || 0
        return { ...product, avgRating, totalReviews: productReviews.length }
      }

      return null
    })
    .filter(Boolean)

  if (!reviewsDelta.length && !productTotalReviewsDelta.length) {
    return new Response(JSON.stringify({ message: "Nothing to sync" }), {
      status: 200,
    })
  }

  !!reviewsDelta.length &&
    (async () => {
      algolia.update({
        indexName: env.ALGOLIA_REVIEWS_INDEX!,
        objects: reviewsDelta,
      })
      console.log("API/sync: Reviews synced", reviewsDelta.length)
    })()
  !!productTotalReviewsDelta.length &&
    (async () => {
      algolia.update({
        indexName: env.ALGOLIA_PRODUCTS_INDEX,
        objects: productTotalReviewsDelta,
      })
      console.log("API/sync:Products synced", productTotalReviewsDelta.length)
    })()

  return new Response(JSON.stringify({ message: "All synced" }), {
    status: 200,
  })
}
