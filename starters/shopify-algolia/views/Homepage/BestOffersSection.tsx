import { algolia } from "clients/search"
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

    const { hits } = await algolia.search<CommerceProduct>({
      indexName: env.ALGOLIA_PRODUCTS_INDEX,
      searchParams: {
        hitsPerPage: 8,
      },
    })

    return hits
  },
  ["relevant-products"],
  { revalidate: 3600 }
)
