import type { Review } from "@enterprise-commerce/reviews"
import { meilisearch } from "clients/meilisearch"
import { env } from "env.mjs"
import type { CommerceProduct } from "types"
import { authenticate } from "utils/authenticate-api-route"

export const maxDuration = 120 // seconds

/* This API route runs via cron job, and updates products index (daily) to sync avgRating and total reviews with the reviews index */
export async function POST(req: Request) {
  if (!authenticate(req)) {
    return new Response("Unauthorized", {
      status: 401,
    })
  }

  if (!env.MEILISEARCH_PRODUCTS_INDEX || !env.MEILISEARCH_REVIEWS_INDEX) {
    console.error({
      message: "Lacking environment variables",
      source: "api/reviews/sync-products",
    })
    return new Response(JSON.stringify({ message: "Sorry, something went wrong" }), { status: 500 })
  }

  const productsIndex = meilisearch?.index(env.MEILISEARCH_PRODUCTS_INDEX)
  const reviewsIndex = meilisearch?.index(env.MEILISEARCH_REVIEWS_INDEX)

  if (!productsIndex || !reviewsIndex) {
    console.error({
      message: "No index found",
      source: "api/reviews/sync-products",
    })
    return new Response(JSON.stringify({ message: "Sorry, something went wrong" }), { status: 500 })
  }

  const [allProducts, allReviews] = await Promise.all([
    productsIndex?.getDocuments<CommerceProduct>({
      limit: 10000,
      fields: ["handle", "totalReviews", "avgRating", "id"],
    }),
    reviewsIndex?.getDocuments<Review>({
      limit: 10000,
      filter: `published=true AND hidden=false`,
      fields: ["product_handle", "rating"],
    }),
  ])

  const mappedReviews = allReviews?.results.reduce(
    (acc, review) => {
      const productHandle = review.product_handle
      if (acc[productHandle]) {
        acc[productHandle].push(review)
      } else {
        acc[productHandle] = [review]
      }
      return acc
    },
    {} as Record<string, Review[]>
  )

  const delta = allProducts?.results.filter((product) => {
    const totalReviews = product.totalReviews
    const newReviews = mappedReviews[product.handle]?.length || 0

    return totalReviews !== newReviews
  })

  if (!delta.length) {
    return new Response(JSON.stringify({ message: "No products to sync" }), { status: 200 })
  }

  const updatedProducts = delta.map((product) => {
    const newProduct = { ...product }

    newProduct.totalReviews = mappedReviews[product.handle]?.length || 0
    newProduct.avgRating = mappedReviews[product.handle]?.reduce((acc, review) => acc + review.rating, 0) / mappedReviews[product.handle]?.length || 0

    return newProduct
  })

  await productsIndex.updateDocuments(updatedProducts, { primaryKey: "id" })

  return new Response(JSON.stringify({ message: "Reviews synced" }), { status: 200 })
}
