import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { meilisearch } from "clients/meilisearch"
import { unstable_cache } from "next/cache"
import { MEILISEARCH_INDEX } from "constants/index"
import { CarouselSection } from "./CarouselSection"

export async function BestOffersSection() {
  const items = await getBestOffers()

  return <CarouselSection title="Best Offers" items={items} />
}

const getBestOffers = unstable_cache(
  async () => {
    const index = await meilisearch?.getIndex<PlatformProduct>(MEILISEARCH_INDEX)
    const results = await index.search("", { matchingStrategy: "last", limit: 8, sort: ["minPrice:asc"] })

    return [...results.hits]
  },
  ["relevant-products"],
  { revalidate: 3600 }
)
