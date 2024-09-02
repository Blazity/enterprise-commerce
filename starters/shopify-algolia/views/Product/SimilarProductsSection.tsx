import { meilisearch } from "clients/search"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "components/Carousel/Carousel"
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
    <section className="my-10">
      <Carousel opts={{ skipSnaps: true }}>
        <div className="flex justify-between">
          <h2 className="mb-10 text-[26px] font-normal tracking-[-0.78px]">You might also like</h2>
          <div className="hidden gap-4 md:flex">
            <CarouselPrevious className="relative" />
            <CarouselNext className="relative" />
          </div>
        </div>
        <CarouselContent>
          {items.map((product, idx) => (
            <CarouselItem className="basis-1/2 md:basis-1/4" key={"featured_" + product.id + idx}>
              <ProductCard prefetch {...product} />
            </CarouselItem>
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

    const similarSearchResults = await meilisearch.searchDocuments<CommerceProduct>({
      indexName: env.MEILISEARCH_PRODUCTS_INDEX,
      query: handle,
      options: {
        matchingStrategy: "last",
        limit,
        hybrid: { semanticRatio: 1 },
      },
    })

    let collectionSearchResults: { hits: CommerceProduct[] } = { hits: [] }
    if (similarSearchResults.hits.length < limit) {
      collectionSearchResults = await meilisearch.searchDocuments<CommerceProduct>({
        indexName: env.MEILISEARCH_PRODUCTS_INDEX,
        options: {
          matchingStrategy: "last",
          limit: limit - similarSearchResults.hits.length,
          filter: new FilterBuilder().where("collections.handle", ComparisonOperators.Equal, collection).build(),
        },
      })
    }

    return [...similarSearchResults.hits, ...collectionSearchResults.hits]
  },
  ["product-by-handle"],
  { revalidate: 3600 }
)
