"use server"

import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { meilisearch } from "clients/meilisearch"
import { unstable_cache } from "next/cache"

export const searchProducts = unstable_cache(
  async (query: string, limit: number = 4) => {
    const index = await meilisearch?.getIndex<PlatformProduct>("products")

    if (!index) return []

    return (await index?.search(query, { limit, attributesToRetrieve: ["id", "handle", "title"] })).hits
  },
  ["autocomplete-search"],
  { revalidate: 3600 }
)
