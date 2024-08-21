import { env } from "env.mjs"
import { meilisearch as searchClient } from "@enterprise-commerce/search-meilisearch"

export const meilisearch: ReturnType<typeof searchClient> =
  globalThis.meilisearch ??
  searchClient({
    host: env.MEILISEARCH_HOST || "",
    adminApiKey: env.MEILISEARCH_ADMIN_KEY || "",
  })

if (process.env.NODE_ENV !== "production") globalThis.meilisearch = meilisearch
