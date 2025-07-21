import { env } from "env.mjs"

type Feature = "reviews" | "ai-reviews" | "altTags"

const features: Record<Feature, Record<"message" | "predicate", unknown>> = {
  reviews: {
    message:
      "No keys provided for reviews feature, to opt-in set environment variables: JUDGE_API_TOKEN, JUDGE_BASE_URL, SHOPIFY_STORE_DOMAIN, ALGOLIA_REVIEWS_INDEX",
    predicate: !!env.JUDGE_BASE_URL && !!env.JUDGE_API_TOKEN && !!env.SHOPIFY_STORE_DOMAIN && env.ALGOLIA_REVIEWS_INDEX,
  },
  "ai-reviews": {
    message:
      "No keys provided for ai reviews summary feautre, to opt-in set envrioment variables: OpenAI API, JUDGE_API_TOKEN ",
    predicate: !!env.OPENAI_API_KEY,
  },
  altTags: {
    message: "No keys provided for alt tags feature, to opt-in set environment variables: REPLICATE_API_KEY",
    predicate: !!env.REPLICATE_API_KEY,
  },
}

const optInNotification = ({ message, source }: { message: string; source?: string }) => {}

export const isOptIn = (feature: Feature) => {
  return features[feature].predicate
}

export const notifyOptIn = ({ feature, source }: { feature: Feature; source?: string }) => {
  optInNotification({ message: features[feature].message as string, source })

  return "This feature is not enabled, to enable set required keys"
}
