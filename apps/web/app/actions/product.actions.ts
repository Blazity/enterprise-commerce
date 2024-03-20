"use server"

import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { meilisearch } from "clients/meilisearch"
import { MEILISEARCH_INDEX } from "constants/index"
import { unstable_cache } from "next/cache"
import { ComparisonOperators, FilterBuilder } from "utils/filterBuilder"

export const searchProducts = unstable_cache(
  async (query: string, limit: number = 4) => {
    const index = await meilisearch?.getIndex<PlatformProduct>(MEILISEARCH_INDEX)

    if (!index) return []

    return (await index?.search(query, { limit, attributesToRetrieve: ["id", "handle", "title"] })).hits
  },
  ["autocomplete-search"],
  { revalidate: 3600 }
)

export const getProduct = unstable_cache(
  async (handle: string) => {
    const index = await meilisearch?.getIndex<PlatformProduct>(MEILISEARCH_INDEX)
    const documents = await index?.getDocuments({ filter: new FilterBuilder().where("handle", ComparisonOperators.Equal, handle).build(), limit: 1 })
    return documents.results.find(Boolean) || null
  },
  ["product-by-handle"],
  { revalidate: 3600 }
)
