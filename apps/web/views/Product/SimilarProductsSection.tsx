import { meilisearch } from "clients/meilisearch"
import { Carousel, CarouselContent } from "components/Carousel/Carousel"
import { ProductCard } from "components/ProductCard/ProductCard"
import { unstable_cache } from "next/cache"
import { ComparisonOperators, FilterBuilder } from "utils/filterBuilder"
import { getDemoProducts, isDemoMode } from "utils/demoUtils"
import type { CommerceProduct } from "types"
import { env } from "env.mjs"

interface SimilarProductsSectionProps {
  slug: string
  collectionHandle: string | undefined
}

export async function SimilarProductsSection({ slug, collectionHandle }: SimilarProductsSectionProps) {
  const items = await getSimilarProducts(slug, collectionHandle)

  return (
    <section className="py-40">
      <h2 className="mb-10 text-[26px] font-normal tracking-[-0.78px]">You might also like</h2>
      <Carousel opts={{ skipSnaps: true }}>
        <CarouselContent className="ml-0 justify-start gap-6">
          {items.map((product, idx) => (
            <ProductCard className="h-full min-w-[150px] max-w-[150px] md:min-w-[280px] md:max-w-[280px]" key={"featured_" + product.id + idx} {...product} />
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}

const getSimilarProducts = unstable_cache(
  async (handle: string, collection: string | undefined) => {
    const limit = 8

    if (isDemoMode()) return getDemoProducts().hits.slice(0, limit)

    const index = await meilisearch?.getIndex<CommerceProduct>(env.MEILISEARCH_PRODUCTS_INDEX)

    if (!index) {
      console.warn({ message: "Missing products index", source: "SimilarProductsSection" })
    }

    const similarSearchResults = await index.search(handle, { matchingStrategy: "last", limit, hybrid: { semanticRatio: 1 } })

    let collectionSearchResults = { hits: [] }
    if (similarSearchResults.hits.length < limit) {
      collectionSearchResults = await index.search("", {
        matchingStrategy: "last",
        limit: limit - similarSearchResults.hits.length,
        filter: collection ? new FilterBuilder().where("collections.handle", ComparisonOperators.Equal, collection).build() : undefined,
      })
    }

    return [...similarSearchResults.hits, ...collectionSearchResults.hits]
  },
  ["product-by-handle"],
  { revalidate: 3600 }
)
