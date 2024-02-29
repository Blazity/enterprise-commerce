import { Carousel, CarouselContent } from "components/Carousel"
import { Skeleton } from "components/Skeleton"

export function SimilarProductsSection() {
  return (
    <section className="py-40">
      <h2 className="mb-10 text-[26px] font-normal tracking-[-0.78px]">You might also like</h2>
      <Carousel opts={{ containScroll: "keepSnaps", dragFree: true }}>
        <CarouselContent className="ml-0 justify-start gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <div className="flex w-[280px] shrink-0 flex-col gap-4 md:h-[430px]">
              <Skeleton className="h-[320px]" key={index} />
              <div>
                <Skeleton className="h-[25px] w-3/4" />
                <Skeleton className="mt-1 h-[32px] w-12" />
              </div>
            </div>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
