"use server"

import { meilisearch } from "client/meilisearch"
import { PlatformProduct } from "@enterprise-commerce/core/platform/types"

export async function searchProducts(query: string, limit: number = 4): Promise<PlatformProduct[]> {
  const index = await meilisearch?.getIndex<PlatformProduct>("products")

  if (!index) return []

  return (await index?.search(query, { limit })).hits
}
