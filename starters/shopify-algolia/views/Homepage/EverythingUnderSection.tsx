import { algolia } from "clients/search"
import { unstable_cache } from "next/cache"
import { ComparisonOperators } from "lib/algolia/filterBuilder"
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

    const { hits } = await algolia.search<CommerceProduct>({
      indexName: env.ALGOLIA_PRODUCTS_INDEX,
      //@TODO REIMPLEMENT SORT
      searchParams: {
        hitsPerPage: 8,
        filters: algolia.filterBuilder().where("minPrice", 50, ComparisonOperators.LessThanOrEqual).build(),
      },
    })

    return hits
  },
  ["relevant-products"],
  { revalidate: 3600 }
)
