import Image from "next/image"
import Link from "next/link"

import { Carousel, CarouselContent } from "components/ui/carousel"
import { Skeleton } from "components/ui/skeleton"

import { getNewestProducts } from "lib/meilisearch"

export async function ProductsWeekSection() {
  const items = await getNewestProducts()

  return (
    <div className="overflow-hidden border-y border-black">
      <div className="mx-auto flex w-full max-w-container-md flex-col items-center gap-28 px-4 py-20 md:py-32 lg:flex-row xl:px-0">
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

export function ProductsWeekSectionSkeleton() {
  return (
    <div className="overflow-hidden border-y border-black">
      <div className="mx-auto flex w-full max-w-container-md flex-col items-center gap-28 px-4 py-20 md:py-32 lg:flex-row xl:px-0">
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
