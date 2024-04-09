import { env } from "env.mjs"
import { MetadataRoute } from "next"
import { meilisearch } from "clients/meilisearch"
import { MEILISEARCH_INDEX } from "constants/index"
import { getDemoCategories, getDemoProducts, isDemoMode } from "utils/demoUtils"
import { PlatformCollection, PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { storefrontClient } from "clients/storefrontClient"

export const revalidate = 604800
export const runtime = "edge"

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

  let allHits: PlatformProduct[] = []
  let allCollections: PlatformCollection[] = []
  let finished = false
  let page = 0

  if (!isDemoMode()) {
    while (finished === false) {
      const response = await (await meilisearch.getIndex(MEILISEARCH_INDEX)).getDocuments<PlatformProduct>({ limit: 100, offset: page * 100 })
      allHits.push(...response.results)
      page++

      if (allHits.length >= response.total) {
        finished = true
      }
    }

    const collections = await storefrontClient.getCollections()
    allCollections = collections || []
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
