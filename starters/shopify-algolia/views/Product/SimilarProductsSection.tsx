import { algolia } from "clients/search"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "components/Carousel/Carousel"
import { ProductCard } from "components/ProductCard/ProductCard"
import { unstable_cache } from "next/cache"
import { getDemoProducts, isDemoMode } from "utils/demoUtils"
import type { CommerceProduct } from "types"
import { env } from "env.mjs"

interface SimilarProductsSectionProps {
  collectionHandle: string | undefined
  objectID: string
}

export async function SimilarProductsSection({ collectionHandle, objectID }: SimilarProductsSectionProps) {
  const items = await getSimilarProducts(collectionHandle, objectID)

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
  async (collection: string | undefined, objectID: string) => {
    const limit = 8

    if (isDemoMode()) return getDemoProducts().hits.slice(0, limit)

    const { results } = await algolia.getRecommendations({
      requests: [
        {
          indexName: env.ALGOLIA_PRODUCTS_INDEX,
          objectID,
          model: "looking-similar",
          maxRecommendations: limit,
          threshold: 60,
        },
      ],
    })

    let collectionSearchResults: { hits: CommerceProduct[] } = { hits: [] }
    if (results[0].hits.length < limit) {
      collectionSearchResults = await algolia.search<CommerceProduct>({
        indexName: env.ALGOLIA_PRODUCTS_INDEX,
        searchParams: {
          hitsPerPage: limit - results[0].hits.length,
          filters: algolia.filterBuilder().where("collections.handle", collection!).build(),
        },
      })
    }

    return [...results[0].hits, ...collectionSearchResults.hits]
  },
  ["product-by-handle"],
  { revalidate: 3600 }
)
