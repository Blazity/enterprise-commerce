import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { meilisearch } from "clients/meilisearch"
import { Carousel, CarouselContent } from "components/Carousel"
import { ProductCard } from "components/ProductCard"
import { unstable_cache } from "next/cache"
import { ComparisonOperators, FilterBuilder } from "utils/filterBuilder"

interface SimilarProductsSectionProps {
  slug: string
  collection: string | undefined
}

export async function SimilarProductsSection({ slug, collection }: SimilarProductsSectionProps) {
  const items = await getSimilarProducts(slug, collection)

  return (
    <section className="py-40">
      <h2 className="mb-10 text-[26px] font-normal tracking-[-0.78px]">You might also like</h2>
      <Carousel opts={{ containScroll: "keepSnaps", dragFree: true }}>
        <CarouselContent className="ml-0 justify-start gap-6">
          {items.map((product) => (
            <ProductCard className="min-w-[280px] max-w-[280px]" key={product.id} {...product} />
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}

const getSimilarProducts = unstable_cache(
  async (handle: string, collection: string | undefined) => {
    const limit = 8
    const index = await meilisearch?.getIndex<PlatformProduct>("products")
    const similarSearchResults = await index.search(handle, { matchingStrategy: "last", limit })

    let collectionSearchResults = { hits: [] }
    if (similarSearchResults.hits.length < limit) {
      collectionSearchResults = await index.search("", {
        matchingStrategy: "last",
        limit: limit - similarSearchResults.hits.length,
        filter: collection ? new FilterBuilder().where("collections.title", ComparisonOperators.Equal, collection).build() : undefined,
      })
    }

    return [...similarSearchResults.hits, ...collectionSearchResults.hits]
  },
  ["product-by-handle"],
  { revalidate: 3600 }
)
