import { env } from "env.mjs"
import { algolia as searchClient } from "lib/algolia"

export const meilisearch: ReturnType<typeof searchClient> = searchClient({
  host: env.MEILISEARCH_HOST || "",
  adminApiKey: env.MEILISEARCH_ADMIN_KEY || "",
})
