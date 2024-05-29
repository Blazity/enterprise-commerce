import { meilisearch } from "clients/meilisearch"
import { unstable_cache } from "next/cache"
import { ComparisonOperators, FilterBuilder } from "utils/filterBuilder"
import { CarouselSection } from "./CarouselSection"
import { getDemoProducts, isDemoMode } from "utils/demoUtils"
import { env } from "env.mjs"
import type { CommerceProduct } from "types"

export async function EverythingUnderSection() {
  const items = await getPriceRangedProducts()

  return <CarouselSection title="Everything under $50" items={items} />
}

const getPriceRangedProducts = unstable_cache(
  async () => {
    if (isDemoMode()) return getDemoProducts().hits.slice(0, 8)

    const index = await meilisearch?.getIndex<CommerceProduct>(env.MEILISEARCH_PRODUCTS_INDEX!)
    const results = await index.search("", {
      matchingStrategy: "last",
      limit: 8,
      filter: new FilterBuilder().where("minPrice", ComparisonOperators.LessThanOrEqual, 50).build(),
      sort: ["minPrice:desc"],
    })

    return [...results.hits]
  },
  ["relevant-products"],
  { revalidate: 3600 }
)
