import { env } from "env.mjs"
import { algolia as searchClient } from "lib/algolia"

export const algolia: ReturnType<typeof searchClient> = searchClient({
  applicationId: env.ALGOLIA_APP_ID || "",
  apiKey: env.ALGOLIA_API_KEY || "",
})
