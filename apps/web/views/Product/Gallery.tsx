/* eslint-disable jsx-a11y/alt-text */
"use client"

import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "components/Carousel"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { cn } from "utils/cn"

interface GalleryProps {
  className?: string
}

export function Gallery({ className }: GalleryProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [thumbsApi, setThumbsApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api || !thumbsApi) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
      thumbsApi.scrollTo(api.selectedScrollSnap())
    })
  }, [api, thumbsApi])

  const onThumbClick = useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api]
  )

  return (
    <div className={cn("flex max-w-full flex-col gap-10 md:max-w-[480px]", className)}>
      <Carousel setApi={setApi} className="relative min-h-[600px] w-full  bg-gray-100">
        <CarouselContent className="size-full">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem className="flex size-full h-[600px] flex-col items-center justify-center" key={index}>
              <Image alt="" src="/default-product-image.svg" width={480} height={600} priority={index === 0} className="mx-auto object-contain" sizes="480px" />
              <span className="text-4xl font-semibold">{index + 1}</span>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 gap-10 pb-6">
          <CarouselPrevious className="relative" />
          <CarouselNext className="relative" />
        </div>
      </Carousel>

      <Carousel setApi={setThumbsApi} opts={{ containScroll: "keepSnaps", dragFree: true }}>
        <CarouselContent className="ml-0 h-[100px] w-full justify-start gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <Thumb key={index} onClick={() => onThumbClick(index)} selected={index === current - 1} index={index} />
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

const Thumb = (props) => {
  const { selected, index, onClick } = props

  return (
    <div onClick={onClick} className={cn("flex size-24 shrink-0 items-center justify-center border border-white bg-gray-100", { "border-black": selected })}>
      <Image alt="" src={`/default-product-image.svg`} width={100} height={100} />
    </div>
  )
}
