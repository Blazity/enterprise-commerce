import { algolia } from "clients/search"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "components/Carousel/Carousel"
import { ProductCard } from "components/ProductCard/ProductCard"
import { unstable_cache } from "next/cache"
import { ComparisonOperators } from "lib/algolia/filterBuilder"
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

    const similarSearchResults = await algolia.search<CommerceProduct>({
      indexName: env.ALGOLIA_PRODUCTS_INDEX,
      //@TODO REIMPLEMENT SORT AND AI SEARCH
      searchParams: {
        query: handle,
        hitsPerPage: limit,
      },
    })

    let collectionSearchResults: { hits: CommerceProduct[] } = { hits: [] }
    if (similarSearchResults.hits.length < limit) {
      collectionSearchResults = await algolia.search<CommerceProduct>({
        indexName: env.ALGOLIA_PRODUCTS_INDEX,
        //@TODO REIMPLEMENT SORT
        searchParams: {
          hitsPerPage: limit - similarSearchResults.hits.length,
          filters: algolia.filterBuilder().where("collections.handle", collection!, ComparisonOperators.Equal).build(),
        },
      })
    }

    return [...similarSearchResults.hits, ...collectionSearchResults.hits]
  },
  ["product-by-handle"],
  { revalidate: 3600 }
)
