import { env } from "env.mjs"
import { MeiliSearch } from "meilisearch"

const meilisearchClientSingleton = () => {
  return new MeiliSearch({
    host: env.MEILISEARCH_HOST || "",
    apiKey: env.MEILISEARCH_ADMIN_KEY || "",
  })
}

export const meilisearch: ReturnType<typeof meilisearchClientSingleton> = globalThis.meilisearch ?? meilisearchClientSingleton()

if (process.env.NODE_ENV !== "production") globalThis.meilisearch = meilisearch
