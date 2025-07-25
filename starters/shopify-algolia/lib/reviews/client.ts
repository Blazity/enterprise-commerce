import { isOptIn, notifyOptIn } from "utils/opt-in"
import type {
  GetProductReviewsOpts,
  GetProductReviewsResponse,
  JudgeMeWebhookKey,
  ProductReviewArgs,
  ProductReviewBody,
  Review,
} from "./types"
import { env } from "env.mjs"

type CreateJudgeClientArgs = {
  baseUrl: string
  apiKey: string
  shopDomain: string
}

export function createJudgeClient({ baseUrl, apiKey, shopDomain }: CreateJudgeClientArgs) {
  const url = new URL(baseUrl)
  url.searchParams.set("api_token", apiKey)
  url.searchParams.set("shop_domain", shopDomain)

  return {
    getProductReviews: async (opts: GetProductReviewsOpts = {}) => getProductReviews(url, opts),
    getAllProductReviews: async () => getAllProductReviews(url),
    createProductReview: async (body: ProductReviewBody) => createProductReview({ baseUrl: url, body }),
    createWebhook: async (key: JudgeMeWebhookKey, subscribeUrl: string) => createWebhook(url, key, subscribeUrl),
  }
}

async function getProductReviews(
  baseUrl: URL,
  opts: GetProductReviewsOpts = {
    per_page: 10,
    page: 1,
  }
): Promise<GetProductReviewsResponse> {
  const localParams = new URLSearchParams(baseUrl.searchParams)
  Object.entries(opts).forEach(([key, value]) => {
    localParams.set(key, value.toString())
  })

  const url = `${baseUrl.origin}${baseUrl.pathname}/reviews?${baseUrl.searchParams.toString()}&${localParams.toString()}`

  const reviewsCountUrl = `${baseUrl.origin}${baseUrl.pathname}/reviews/count?${baseUrl.searchParams.toString()}`

  const reviewsCount = await fetch(reviewsCountUrl)
  const { count } = (await reviewsCount.json()) as { count: number }

  const reviews = (await fetch(url).then((res) => res.json())) as Pick<
    GetProductReviewsResponse,
    "per_page" | "reviews" | "current_page"
  >

  return { ...reviews, total: count, totalPages: Math.ceil(count / reviews.per_page) }
}

async function getAllProductReviews(baseUrl: URL) {
  const allReviews: Review[] = []

  const { reviews, totalPages } = await getProductReviews(baseUrl, { per_page: 100 })
  allReviews.push(...reviews)

  for (let page = 2; page <= totalPages; page++) {
    const { reviews } = await getProductReviews(baseUrl, { per_page: 100, page })
    allReviews.push(...reviews)
  }

  return allReviews
}

async function createProductReview({ baseUrl, body }: ProductReviewArgs) {
  const url = `${baseUrl.origin}${baseUrl.pathname}/reviews`
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...body,
      shop_domain: baseUrl.searchParams.get("shop_domain"),
      platform: "shopify",
    }),
  })

  if (!res.ok) {
    throw new Error("Failed to create review")
  }

  const data = await res.json()

  return data
}

async function createWebhook(baseUrl: URL, key: JudgeMeWebhookKey, subscribeUrl: string) {
  const url = `${baseUrl.origin}${baseUrl.pathname}/webhooks?${baseUrl.searchParams.toString()}`

  if (key !== "review/created" && key !== "review/updated" && key !== "review/created_fail") {
    throw new Error("Judge me:  Invalid key to create a webhook")
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key,
      subscribe_url: subscribeUrl,
    }),
  })

  if (!res.ok) {
    throw new Error("Failed to create webhook")
  }

  return await res.json()
}

export const reviewsClient = (() => {
  if (!isOptIn("reviews")) {
    notifyOptIn({ feature: "reviews", source: "clients/reviews" })
  }

  return createJudgeClient({
    baseUrl: env.JUDGE_BASE_URL!,
    apiKey: env.JUDGE_API_TOKEN!,
    shopDomain: env.SHOPIFY_STORE_DOMAIN,
  })
})()
