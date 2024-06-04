import { createJudgeClient } from "@enterprise-commerce/reviews"
import { env } from "env.mjs"
import { isOptIn, notifyOptIn } from "utils/opt-in"

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
