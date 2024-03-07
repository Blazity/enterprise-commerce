import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { meilisearch } from "clients/meilisearch"
import { Button } from "components/Button"
import { Carousel, CarouselContent } from "components/Carousel"
import { ProductCard } from "components/ProductCard"
import { unstable_cache } from "next/cache"
import Image from "next/image"
import Link from "next/link"

export async function HomepageView() {
  const items = await getNewestProducts()

  return (
    <>
      <div className="max-w-container-lg mx-auto flex w-full flex-col-reverse justify-between lg:flex-row">
        <div className="shrink-1 flex basis-1/2 items-center justify-center bg-gray-100 p-24">
          <Image width={400} height={400} sizes="400px" alt="Homepage featured image" priority src={"/default-product-image.svg"} />
        </div>
        <div className="flex basis-1/2 flex-col items-center justify-start gap-16 px-4 py-20 md:items-start md:p-24">
          <h1 className="text-center text-5xl font-bold tracking-tighter sm:text-7xl md:text-left md:text-8xl">Your daily trendsetting deals</h1>
          <Link href="/search" prefetch={false}>
            <Button size="xl" variant="secondary">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>

      <div className="overflow-hidden border-y border-black">
        <div className="max-w-container-md mx-auto flex w-full flex-col items-center gap-28 px-4 py-20 md:py-32 lg:flex-row xl:px-0">
          <div className="m-auto basis-1/3 text-center text-5xl font-normal tracking-tighter sm:min-w-[280px] md:text-left md:text-6xl">
            <h2>Products of the week</h2>
          </div>
          <div className="w-full">
            <Carousel opts={{ containScroll: "keepSnaps", dragFree: true }}>
              <CarouselContent className="ml-0 justify-start gap-8">
                {items.map((product, idx) => (
                  <Link key={"newest_" + product.id + idx} href={`/products/${product.handle}`} prefetch={false}>
                    <div className="flex h-[224px] min-w-[224px] max-w-[224px] items-center justify-center overflow-hidden rounded-full border border-black">
                      <Image
                        alt={product.featuredImage?.altText || ""}
                        className="size-[150px] object-contain py-2 transition-transform hover:scale-110 group-hover:scale-105 md:size-[250px] md:py-16"
                        height={250}
                        src={product.featuredImage?.url || "/default-product-image.svg"}
                        sizes="250px"
                        width={250}
                      />
                    </div>
                  </Link>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>

      <div className="max-w-container-md mx-auto flex flex-col gap-16 px-4 py-20 md:py-32 xl:px-0">
        <div className="basis-1/3 text-center text-5xl font-normal tracking-tighter sm:min-w-[280px] md:text-left md:text-6xl">
          <h2>Shop by Category</h2>
        </div>
        <div className="group mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="relative h-[260px] w-full overflow-hidden rounded-2xl ">
              <div className="absolute inset-0 size-full bg-neutral-100 transition-all hover:bg-neutral-50 hover:blur"></div>
              <h3 className="absolute bottom-8 left-8 text-[26px] leading-none tracking-tight text-black">Fashion</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

const getNewestProducts = unstable_cache(
  async () => {
    const index = await meilisearch?.getIndex<PlatformProduct>("products")
    const similarSearchResults = await index.search("", { matchingStrategy: "last", limit: 8, sort: ["updatedAtTimestamp:desc"] })

    return [...similarSearchResults.hits]
  },
  ["newest-products"],
  { revalidate: 3600 }
)
