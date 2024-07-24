import { meilisearch } from "clients/search"
import { Carousel, CarouselContent } from "components/Carousel/Carousel"
import { Skeleton } from "components/Skeleton/Skeleton"
import { env } from "env.mjs"
import { unstable_cache } from "next/cache"
import Image from "next/image"
import Link from "next/link"
import { getDemoProducts, isDemoMode } from "utils/demoUtils"
import type { CommerceProduct } from "types"

export async function ProductsWeekSection() {
  const items = await getNewestProducts()

  return (
    <div className="overflow-hidden border-y border-black">
      <div className="max-w-container-md mx-auto flex w-full flex-col items-center gap-28 px-4 py-20 md:py-32 lg:flex-row xl:px-0">
        <div className="m-auto basis-1/3 text-center text-5xl font-normal tracking-tighter sm:min-w-[280px] md:text-left md:text-6xl">
          <h2>Products of the week</h2>
        </div>
        <div className="w-full">
          <Carousel opts={{ skipSnaps: true }}>
            <CarouselContent className="ml-0 justify-start gap-8">
              {items.map((product, idx) => (
                <Link aria-label={`Go to ${product.title}`} key={"newest_" + product.id + idx} href={`/product/${product.handle}`} prefetch={false}>
                  <div className="flex h-[224px] min-w-[224px] max-w-[224px] items-center justify-center overflow-hidden rounded-full border border-black">
                    <Image
                      alt={product.featuredImage?.altText || ""}
                      className="size-[150px] object-contain py-2 transition-transform hover:scale-110 group-hover:scale-105 md:size-[250px] md:py-16"
                      height={150}
                      src={product.featuredImage?.url || "/default-product-image.svg"}
                      sizes="150px"
                      width={150}
                    />
                  </div>
                </Link>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  )
}

const getNewestProducts = unstable_cache(
  async () => {
    if (isDemoMode()) return getDemoProducts().hits.slice(0, 8)
    const results = await meilisearch.searchDocuments<CommerceProduct>({
      indexName: env.MEILISEARCH_PRODUCTS_INDEX,
      options: {
        matchingStrategy: "last",
        limit: 8,
        sort: ["updatedAtTimestamp:desc"],
      },
    })

    return [...results.hits]
  },
  ["newest-products"],
  { revalidate: 3600 }
)

export function ProductsWeekSectionSkeleton() {
  return (
    <div className="overflow-hidden border-y border-black">
      <div className="max-w-container-md mx-auto flex w-full flex-col items-center gap-28 px-4 py-20 md:py-32 lg:flex-row xl:px-0">
        <div className="m-auto basis-1/3 text-center text-5xl font-normal tracking-tighter sm:min-w-[280px] md:text-left md:text-6xl">
          <h2>Products of the week</h2>
        </div>
        <div className="w-full">
          <Carousel opts={{ containScroll: "keepSnaps", dragFree: true }}>
            <CarouselContent className="ml-0 justify-start gap-8">
              {Array.from({ length: 8 }, (_, idx) => (
                <Skeleton key={idx} className="flex h-[224px] min-w-[224px] max-w-[224px] items-center justify-center overflow-hidden rounded-full border border-black" />
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  )
}
