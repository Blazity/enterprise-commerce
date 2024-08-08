import type { Dispatch, SetStateAction } from "react"
import Image from "next/image"
import type { CommerceProduct } from "types"
import { cn } from "utils/cn"
import { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "components/Carousel/Carousel"

type CenterSectionProps = {
  images: CommerceProduct["images"]
  setApi: Dispatch<SetStateAction<CarouselApi>>
  className?: string
}

export const CenterSection = ({ className, images, setApi }: CenterSectionProps) => {
  const hasOnlyOneImage = images.length <= 1
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="md:sticky md:top-[100px]">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem className="relative aspect-square" key={image.url}>
                <Image alt={image.altText || ""} src={image.url || "/default-product-image.svg"} fill priority={index === 0} sizes="(max-width: 450px) 300px, 480px" />
              </CarouselItem>
            ))}
          </CarouselContent>
          {!hasOnlyOneImage && (
            <div className="mt-4 flex justify-center gap-10 pb-6">
              <CarouselPrevious className="relative" />
              <CarouselNext className="relative" />
            </div>
          )}
        </Carousel>
      </div>
    </div>
  )
}
