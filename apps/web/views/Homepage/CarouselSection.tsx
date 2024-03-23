import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { Carousel, CarouselContent } from "components/Carousel/Carousel"
import { ProductCard } from "components/ProductCard/ProductCard"
import { Skeleton } from "components/Skeleton/Skeleton"

interface CarouselSectionProps {
  title: string
  items: PlatformProduct[]
}

export function CarouselSection({ items, title }: CarouselSectionProps) {
  return (
    <div className="max-w-container-md mx-auto flex flex-col gap-16 px-4 py-20 md:pb-32 md:pt-24 xl:px-0">
      <div className="basis-1/3 text-center text-5xl font-normal tracking-tighter sm:min-w-[280px] md:text-left md:text-6xl">
        <h2>{title}</h2>
      </div>
      <div className="w-full">
        <Carousel opts={{ containScroll: "keepSnaps", dragFree: true }}>
          <CarouselContent className="ml-0 justify-start gap-8">
            {items.map((product, idx) => (
              <ProductCard className="min-w-[280px] max-w-[280px]" {...product} key={"relevant_" + product.id + idx} />
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}

export function CarouselSectionSkeleton() {
  return (
    <div className="max-w-container-md mx-auto flex flex-col gap-16 px-4 py-20 md:pb-32 md:pt-24 xl:px-0">
      <div className="basis-1/3 text-center text-5xl font-normal tracking-tighter sm:min-w-[280px] md:text-left md:text-6xl">
        <Skeleton className="h-[60px] w-[280px]" />
      </div>
      <div className="w-full">
        <Carousel opts={{ containScroll: "keepSnaps", dragFree: true }}>
          <CarouselContent className="ml-0 justify-start gap-8">
            {Array.from({ length: 8 }, (_, idx) => (
              <Skeleton className="h-[430px] min-w-[280px] max-w-[280px]" key={idx} />
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}
