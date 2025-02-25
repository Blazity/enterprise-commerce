import { generateObject } from "ai"
import z from "zod"
import { openai } from "@ai-sdk/openai"
import type { Review } from "lib/reviews/types"
import { env } from "env.mjs"
import { authenticate } from "utils/authenticate-api-route"
import { isOptIn, notifyOptIn } from "utils/opt-in"
import { unstable_noStore } from "next/cache"
import { isDemoMode } from "utils/demo-utils"
import { getAllProducts, getAllReviews, updateProducts } from "lib/meilisearch"

const summarySchema = z.object({
  products: z.array(
    z.object({
      handle: z.string(),
      id: z.string(),
      reviewsSummary: z.string(),
    })
  ),
})

export const maxDuration = 60

/*
 * This API route will be used for cron job, running once a week to re-generate AI summary based on all user reviews, tweak to your needs
 */
export async function GET(req: Request) {
  unstable_noStore()
  if (!authenticate(req)) {
    return new Response("Unauthorized", {
      status: 401,
    })
  }

  if (!isOptIn("ai-reviews")) {
    const res = notifyOptIn({ feature: "ai-reviews", source: "api/reviews/ai-summary" })
    return new Response(JSON.stringify(res), { status: 200 })
  }

  if (isDemoMode() || !env.MEILISEARCH_REVIEWS_INDEX) {
    console.error({
      message: "Lacking environment variables",
      source: "api/reviews/ai-summary",
    })
    return new Response(JSON.stringify({ message: "Sorry, something went wrong" }), { status: 500 })
  }

  const [{ reviews }, allProducts] = await Promise.all([
    getAllReviews({
      fields: ["body", "title", "product_handle", "rating"],
      filter: "published=true AND hidden=false",
    }),
    getAllProducts({
      fields: ["handle", "title", "id", "totalReviews"],
    }),
  ])

  const mappedReviews: Record<string, Review[]> = reviews.reduce(
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

  const productsWithNewReviews = allProducts?.results.filter((product) => product.totalReviews !== (mappedReviews[product.handle]?.length || 0))

  if (!productsWithNewReviews.length) {
    return new Response(JSON.stringify({ message: "No new reviews to re-generate summary" }), { status: 200 })
  }

  const productsWithReviews = productsWithNewReviews
    .map((product) => {
      if (!mappedReviews[product.handle]) {
        return null
      }
      return {
        product_title: product.title,
        id: product.id,
        handle: product.handle,
        reviews: mappedReviews[product.handle],
      }
    })
    .filter(Boolean)

  const batches: Batch[] = []
  const results: { handle: string; id: string; reviewsSummary: string }[] = []
  const batchSize = 25

  for (let i = 0; i < productsWithReviews.length; i += batchSize) {
    const batch = productsWithReviews.slice(i, i + batchSize)

    batches.push(batch)
  }

  for (const batch of batches) {
    const products = await generateBatchSummaries(batch)
    results.push(...products)
  }

  const updatedProducts = results
    .map((result) => {
      const id = productsWithReviews?.find(({ id }) => id === result.id)?.id

      if (!id) return null

      return {
        id,
        reviewsSummary: result.reviewsSummary,
      }
    })
    .filter(Boolean)

  await updateProducts(updatedProducts)

  return new Response(JSON.stringify({ message: "Reviews synced" }), { status: 200 })
}

type Batch = {
  handle: string
  id: string
  reviews: Review[]
}[]

const instructions = `
    You will be given a list of products and a list reviews for each of them. Your task is to generate a short summary (maximum up to 4 sentences) for each product based on the reviews provided highlighting best features and one or two areas of improvement if any are mentioned if not just don't mention it at all. Avoid repeating the same information in the summary whilst keeping casual tone.

    Example of its structure:
        {
            "products": [{
             "product_title": "Sleek Watch",
             "id": "1",
             "handle": "sleek-watch",
             "reviews": [
                {
                "title": "Great watch",
                "body": "I love this watch, it's sleek and stylish. The only downside is that the battery life is not as long as I would like.",
                "rating": 5
                },
                {
                "title": "Very stylish",
                "body": "I love the design of this watch, it's very stylish and goes with everything. The only downside is that the strap is a bit uncomfortable.",
                "rating": 4
                },

            ]
        }]
      }

    Here's the list of products and reviews:
                `

async function generateBatchSummaries(batch: Batch) {
  const { object } = await generateObject({
    model: openai("gpt-4o"),
    system: instructions,
    prompt: JSON.stringify(batch),
    schema: summarySchema,
    mode: "json",
  })

  return object.products
}
