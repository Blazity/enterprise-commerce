import { createJudgeClient } from "@enterprise-commerce/reviews"
import { env } from "env.mjs"

export const reviewsClient = createJudgeClient({
  baseUrl: env.JUDGE_BASE_URL,
  apiKey: env.JUDGE_API_TOKEN,
  shopDomain: env.SHOPIFY_STORE_DOMAIN,
})
