import { env } from "env.mjs"
import { meilisearch as searchClient } from "lib/meilisearch"

export const meilisearch: ReturnType<typeof searchClient> = searchClient({
  host: env.MEILISEARCH_HOST || "",
  adminApiKey: env.MEILISEARCH_ADMIN_KEY || "",
})
