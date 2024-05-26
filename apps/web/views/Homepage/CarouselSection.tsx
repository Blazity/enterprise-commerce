import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "components/Carousel/Carousel"
import { ProductCard } from "components/ProductCard/ProductCard"
import { Skeleton } from "components/Skeleton/Skeleton"
import type { CommerceProduct } from "types"

interface CarouselSectionProps {
  title: string
  items: CommerceProduct[]
}

export function CarouselSection({ items, title }: CarouselSectionProps) {
  return (
    <Carousel opts={{ skipSnaps: true }}>
      <div className="max-w-container-md mx-auto flex flex-col gap-16 px-4 py-20 md:pb-32 md:pt-24 xl:px-0">
        <div className="flex basis-1/3 justify-between text-left text-5xl font-normal tracking-tighter sm:min-w-[280px] md:text-left md:text-6xl">
          <h2>{title}</h2>
          <div className="hidden gap-4 md:flex">
            <CarouselPrevious className="relative" />
            <CarouselNext className="relative" />
          </div>
        </div>
        <div className="w-full">
          <CarouselContent className="ml-0 justify-start gap-8">
            {items.map((product, idx) => (
              <ProductCard className="h-full min-w-[200px] max-w-[200px] md:min-w-[280px] md:max-w-[280px]" {...product} key={"relevant_" + product.id + idx} />
            ))}
          </CarouselContent>
        </div>
      </div>
    </Carousel>
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
