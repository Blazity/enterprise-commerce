import { env } from "env.mjs"

type Feature = "reviews" | "ai-reviews"

const features: Record<Feature, Record<"message" | "predicate", unknown>> = {
  reviews: {
    message: "No keys provided for reviews feature, to opt-in set environment variables: JUDGE_API_TOKEN, JUDGE_ME_BASE_URL, SHOPIFY_STORE_DOMAIN",
    predicate: !!env.JUDGE_BASE_URL && !!env.JUDGE_API_TOKEN && !!env.SHOPIFY_STORE_DOMAIN,
  },
  "ai-reviews": {
    message: "No keys provided for ai reviews summary feautre, to opt-in set envrioment variables: OpenAI API, JUDGE_API_TOKEN ",
    predicate: !!env.OPENAI_API_KEY,
  },
}

const optInNotification = ({ message, source }: { message: string; source?: string }) => {
  console.warn({
    message,
    source,
  })
}

export const isOptIn = (feature: Feature) => {
  return features[feature].predicate
}

export const notifyOptIn = ({ feature, source }: { feature: Feature; source?: string }) => {
  optInNotification({ message: features[feature].message as string, source })

  return "This feature is not enabled, to enable set required keys"
}
