"use client"

import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"

import { createContext, forwardRef, useCallback, useContext, useEffect, useState } from "react"
import { cn } from "utils/cn"
import { Button } from "../Button/Button"
import { ChevronIcon } from "../Icons/ChevronIcon"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

interface CarouselProps {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

interface CarouselContextProps extends CarouselProps {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
}

const CarouselContext = createContext<CarouselContextProps | null>(null)

export function useCarousel() {
  const context = useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & CarouselProps>(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )

    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    const onSelect = useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div ref={ref} onKeyDownCapture={handleKeyDown} className={cn("relative", className)} role="region" aria-roledescription="carousel" {...props}>
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div ref={ref} className={cn("flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className)} {...props} />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0 basis-full", orientation === "horizontal" ? "pl-4" : "pt-4", className)}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(({ className, ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant="secondary"
      isAnimated={false}
      size="lg"
      className={cn("absolute flex size-12 rotate-90 items-center justify-center rounded-full transition-transform hover:scale-105 hover:text-white", className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronIcon className="size-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(({ className, ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      isAnimated={false}
      variant="secondary"
      size="lg"
      className={cn("absolute flex size-12 rotate-90 items-center justify-center rounded-full transition-transform hover:scale-105 hover:text-white", className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronIcon className="m-auto size-4 rotate-180" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext }
