import "server-only"

import { env } from "env.mjs"
import { algolia as searchClient } from "lib/algolia"

export const algolia: ReturnType<typeof searchClient> = searchClient({
  applicationId: env.ALGOLIA_APP_ID || "",
  // Make sure write api key never leaks to the client
  apiKey: env.ALGOLIA_WRITE_API_KEY || "",
})
