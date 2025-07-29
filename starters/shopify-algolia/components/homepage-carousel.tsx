"use client"

import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "utils/cn"
import { Button } from "./ui/button"
import { CompactProductCard } from "./compact-product-card"
import type { CommerceProduct } from "types"

export interface HeroSlide {
  id: string
  imageUrl: string
  imageAlt: string
  title: string
  subtitle: string
  ctaText: string
  ctaHref: string
  product?: CommerceProduct & { selectedVariant?: any }
  variantOptions?: Record<string, string>
}

interface HomepageCarouselProps {
  slides: HeroSlide[]
  className?: string
}

export function HomepageCarousel({ slides = [], className }: HomepageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
    inViewThreshold: 0.7,
    watchDrag: true,
    watchResize: true,
    watchSlides: false,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index)
    },
    [emblaApi]
  )

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  if (!slides || slides.length === 0) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative bg-secondary/5", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured products carousel"
    >
      <div
        ref={emblaRef}
        className="overflow-hidden md:snap-x md:snap-mandatory md:scroll-smooth md:[-webkit-overflow-scrolling:touch] md:scrollbar-none md:[scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden motion-safe:scroll-smooth"
      >
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="relative min-w-full flex-[0_0_100%] @container md:snap-start md:snap-always"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slides.length}`}
            >
              <div className="container mx-auto">
                <div className="relative min-h-[500px] px-4 py-12 sm:min-h-[550px] sm:py-16 lg:grid lg:min-h-0 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-16 xl:gap-16">
                  <div className="absolute inset-0 -z-10 lg:hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/75 to-background/90" />
                    <Image
                      src={slide.imageUrl}
                      alt=""
                      width={768}
                      height={500}
                      className="size-full object-cover object-center opacity-25"
                      priority={index === 0}
                      quality={30}
                      sizes="(max-width: 768px) 50vw, 100vw"
                    />
                  </div>

                  <div className="relative flex flex-col justify-center space-y-6 text-center lg:px-4 lg:text-left">
                    <div className="space-y-4">
                      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl xl:text-6xl">
                        {slide.title}
                      </h2>
                      <p className="mx-auto max-w-md text-balance text-base text-muted-foreground sm:text-lg lg:mx-0 lg:text-xl">
                        {slide.subtitle}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                      <Button size="default" asChild className="w-full sm:w-auto lg:px-8 lg:py-6 lg:text-lg">
                        <Link href={slide.ctaHref}>{slide.ctaText}</Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="default"
                        asChild
                        className="w-full sm:w-auto lg:px-8 lg:py-6 lg:text-lg"
                      >
                        <Link href="/search">Browse All Categories</Link>
                      </Button>
                    </div>
                  </div>

                  <div className="relative hidden lg:block lg:px-4">
                    <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-white lg:h-[500px] xl:h-[600px]">
                      <Image
                        src={slide.imageUrl}
                        alt={slide.imageAlt}
                        width={600}
                        height={600}
                        className="size-full object-contain"
                        priority={index === 0}
                        quality={85}
                        sizes="(min-width: 1024px) 50vw, 0vw"
                      />

                      {slide.product && (
                        <div className="absolute bottom-4 right-4 hidden w-[200px] md:block lg:bottom-8 lg:right-8 lg:w-[240px]">
                          <CompactProductCard
                            {...slide.product}
                            selectedVariant={slide.product.selectedVariant}
                            variantOptions={slide.variantOptions}
                            priority={index === 0}
                            className="bg-background/95 shadow-xl backdrop-blur-sm"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <div className="absolute inset-x-0 bottom-8 hidden lg:block">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-2" role="tablist">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        selectedIndex === index
                          ? "w-8 bg-foreground"
                          : "w-2 bg-foreground/30 hover:bg-foreground/50"
                      )}
                      onClick={() => scrollTo(index)}
                      role="tab"
                      aria-selected={selectedIndex === index}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur transition-all",
                      "hover:scale-110 hover:bg-background hover:shadow-md",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    )}
                    onClick={scrollPrev}
                    aria-label="Previous slide"
                  >
                    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur transition-all",
                      "hover:scale-110 hover:bg-background hover:shadow-md",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    )}
                    onClick={scrollNext}
                    aria-label="Next slide"
                  >
                    <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-6 flex justify-center gap-3 lg:hidden">
            {slides.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "relative h-2.5 rounded-full transition-all duration-300",
                  "before:pointer-events-none before:absolute before:inset-[-8px] before:content-['']",
                  selectedIndex === index
                    ? "w-8 bg-foreground"
                    : "w-2.5 bg-foreground/40 active:bg-foreground/60"
                )}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}