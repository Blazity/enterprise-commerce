import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "components/ui/carousel"
import { ProductCard } from "components/product-card"
import { Skeleton } from "components/ui/skeleton"
import type { CommerceProduct } from "types"
import { cn } from "utils/cn"

interface CarouselSectionProps {
  title: string
  items: CommerceProduct[]
  className?: string
}

export function CarouselSection({ items, title, className }: CarouselSectionProps) {
  return (
    <Carousel opts={{ skipSnaps: true }}>
      <div className={cn("mx-auto flex max-w-container-md flex-col gap-4", className)}>
        <div className="flex justify-between sm:min-w-[280px]">
          <h2 className="px-4 text-left text-4xl font-thin tracking-tighter">{title}</h2>
          <div className="hidden gap-4 md:flex">
            <CarouselPrevious className="relative" />
            <CarouselNext className="relative" />
          </div>
        </div>
        <CarouselContent>
          {items.map((product, idx) => (
            <CarouselItem key={"relevant_" + product.id + idx} className="basis-1/2 md:basis-1/4">
              <ProductCard prefetch {...product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
    </Carousel>
  )
}

export function CarouselSectionSkeleton() {
  return (
    <div className="mx-auto flex max-w-container-md flex-col gap-16 px-4 py-20 md:pb-32 md:pt-24 xl:px-0">
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
