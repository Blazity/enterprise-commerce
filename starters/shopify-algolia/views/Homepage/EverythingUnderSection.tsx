import { meilisearch } from "clients/search"
import { unstable_cache } from "next/cache"
import { ComparisonOperators, FilterBuilder } from "utils/filterBuilder"
import { CarouselSection } from "./CarouselSection"
import { getDemoProducts, isDemoMode } from "utils/demoUtils"
import type { CommerceProduct } from "types"
import { env } from "env.mjs"

export async function EverythingUnderSection() {
  const items = await getPriceRangedProducts()

  if (!items.length) return null

  return <CarouselSection className="my-16" title="Everything under $50" items={items} />
}

const getPriceRangedProducts = unstable_cache(
  async () => {
    if (isDemoMode()) return getDemoProducts().hits.slice(0, 8)

    const results = await meilisearch.searchDocuments<CommerceProduct>({
      indexName: env.MEILISEARCH_PRODUCTS_INDEX,
      options: {
        matchingStrategy: "last",
        limit: 8,
        filter: new FilterBuilder().where("minPrice", ComparisonOperators.LessThanOrEqual, 50).build(),
        sort: ["minPrice:asc"],
      },
    })

    return [...results.hits]
  },
  ["relevant-products"],
  { revalidate: 3600 }
)
