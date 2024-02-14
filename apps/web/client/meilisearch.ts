import { env } from "env.mjs"
import { MeiliSearch } from "meilisearch"

const meilisearchClientSingleton = () => {
  return new MeiliSearch({
    host: env.MEILISEARCH_HOST || "",
    apiKey: env.MEILISEARCH_MASTER_KEY || "",
  })
}

declare global {
  var meilisearch: undefined | ReturnType<typeof meilisearchClientSingleton>
}

const meilisearch = globalThis.meilisearch ?? meilisearchClientSingleton()

export { meilisearch }

if (process.env.NODE_ENV !== "production") globalThis.meilisearch = meilisearch
