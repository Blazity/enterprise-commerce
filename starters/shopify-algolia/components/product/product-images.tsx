"use client"

import { useEffect, useState } from "react"
import { CarouselApi } from "components/ui/carousel"
import { CenterSection } from "./center-image-section"
import { SideImages } from "./side-images"
import { cn } from "utils/cn"
import type { CommerceProduct } from "types"

interface ProductImagesProps {
  images: CommerceProduct["images"]
  initialActiveIndex?: number
}

export const ProductImages = ({ images, initialActiveIndex = 0 }: ProductImagesProps) => {
  const [api, setApi] = useState<CarouselApi>()
  const [thumbsApi, setThumbsApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(initialActiveIndex)

  useEffect(() => {
    if (!api || !thumbsApi) {
      return
    }

    if (initialActiveIndex >= 0) {
      api.scrollTo(initialActiveIndex, true)
      thumbsApi.scrollTo(initialActiveIndex, true)
      setCurrent(initialActiveIndex)
    }

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
      thumbsApi.scrollTo(api.selectedScrollSnap())
    })
  }, [api, thumbsApi, initialActiveIndex])

  useEffect(() => {
    setCurrent(initialActiveIndex)
  }, [initialActiveIndex])

  return (
    <>
      <CenterSection
        setApi={setApi}
        images={images}
        className={cn("md:col-span-6", images.length > 1 ? "md:col-start-2" : "md:col-start-1")}
      />
      {images.length > 1 && (
        <SideImages
          setThumbsApi={setThumbsApi}
          current={current}
          api={api}
          images={images}
          className="md:-order-1 md:col-span-1"
        />
      )}
    </>
  )
}
