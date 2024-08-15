import { meilisearch } from "clients/meilisearch"
import { unstable_cache } from "next/cache"
import { CarouselSection } from "./CarouselSection"
import { getDemoProducts, isDemoMode } from "utils/demoUtils"
import type { CommerceProduct } from "types"
import { env } from "env.mjs"

export async function BestOffersSection() {
  const items = await getBestOffers()

  if (!items.length) return null

  return <CarouselSection className="my-16" title="Best Offers" items={items} />
}

const getBestOffers = unstable_cache(
  async () => {
    if (isDemoMode()) return getDemoProducts().hits.slice(0, 8)

    const index = await meilisearch?.getIndex<CommerceProduct>(env.MEILISEARCH_PRODUCTS_INDEX)

    if (!index) {
      console.warn({ message: "Missing products index", source: "BestOffersSection" })
    }

    const results = await index.search("", { matchingStrategy: "last", limit: 8, sort: ["minPrice:asc"] })

    return [...results.hits]
  },
  ["relevant-products"],
  { revalidate: 3600 }
)
