"use server"

import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { meilisearch } from "client/meilisearch"
import { unstable_cache } from "next/cache"

export const searchProducts = unstable_cache(uncached_searchProducts, ["autocomplete-search"], { revalidate: 3600 })

async function uncached_searchProducts(query: string, limit: number = 4): Promise<PlatformProduct[]> {
  const index = await meilisearch?.getIndex<PlatformProduct>("products")

  if (!index) return []

  return (await index?.search(query, { limit })).hits
}
