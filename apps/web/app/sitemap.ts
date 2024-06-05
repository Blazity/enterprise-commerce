import { env } from "env.mjs"
import { MetadataRoute } from "next"
import { meilisearch } from "clients/meilisearch"
import { getDemoCategories, getDemoProducts, isDemoMode } from "utils/demoUtils"
import type { PlatformCollection } from "@enterprise-commerce/core/platform/types"
import type { CommerceProduct } from "types"
import { Index } from "meilisearch"

export const revalidate = 604800
export const runtime = "nodejs"

const BASE_URL = env.LIVE_URL
const HITS_PER_PAGE = 24

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(new Date().setHours(0, 0, 0, 0)),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(new Date().setHours(0, 0, 0, 0)),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/terms-conditions`,
      lastModified: new Date(),
      priority: 0.1,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      priority: 0.1,
    },
  ]

  let allHits: CommerceProduct[] = []
  let allCollections: PlatformCollection[] = []

  if (!isDemoMode()) {
    const productsIndex = await meilisearch.getIndex(env.MEILISEARCH_PRODUCTS_INDEX)
    const categoriesIndex = await meilisearch.getIndex(env.MEILISEARCH_CATEGORIES_INDEX)

    allHits = await getAllResults(productsIndex)
    allCollections = await getAllResults(categoriesIndex)
  } else {
    allHits = getDemoProducts().hits
    allCollections = getDemoCategories()
  }

  const paginationRoutes = Array.from({ length: allHits.length / HITS_PER_PAGE }, (_, i) => {
    const item: MetadataRoute.Sitemap[0] = {
      url: `${BASE_URL}/search?page=${i + 1}`,
      priority: 0.5,
      changeFrequency: "monthly",
    }
    return item
  })

  const productRoutes = allHits.map((hit) => {
    const item: MetadataRoute.Sitemap[0] = {
      url: `${BASE_URL}/products/${hit.handle}`,
      lastModified: hit.updatedAt,
      priority: 0.5,
      changeFrequency: "monthly",
    }
    return item
  })

  const collectionsRoutes = allCollections.map((collection) => {
    const item: MetadataRoute.Sitemap[0] = {
      url: `${BASE_URL}/category/${collection.handle}`,
      lastModified: collection.updatedAt,
      priority: 0.5,
      changeFrequency: "monthly",
    }
    return item
  })

  return [...staticRoutes, ...paginationRoutes, ...productRoutes, ...collectionsRoutes]
}

async function getAllResults<T extends Record<string, any>>(index: Index) {
  let hits: T[] = []
  let page = 0
  let finished = false

  while (!finished) {
    const response = await index.getDocuments<T>({ limit: 100, offset: page * 100 })
    hits.push(...response.results)
    page++
    if (hits.length >= response.total) {
      finished = true
    }
  }

  return hits
}
