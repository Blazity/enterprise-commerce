"use client"

import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
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
    duration: 25,
    skipSnaps: false,
    align: "start",
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [slidesInView, setSlidesInView] = useState<number[]>([0])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    try {
      setSelectedIndex(emblaApi.selectedScrollSnap())
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    } catch (error) {
      console.warn("Error updating carousel state:", error)
    }
  }, [emblaApi])

  const updateSlidesInView = useCallback(() => {
    if (!emblaApi) return
    setSlidesInView(emblaApi.slidesInView())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    onSelect()
    updateSlidesInView()
    
    emblaApi.on("select", onSelect)
    emblaApi.on("slidesInView", updateSlidesInView)
    emblaApi.on("reInit", onSelect)

    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("slidesInView", updateSlidesInView)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect, updateSlidesInView])

  // Preload adjacent slides
  useEffect(() => {
    if (!emblaApi || !slides.length) return

    const preloadAdjacentSlides = () => {
      if (!emblaApi.selectedScrollSnap) return
      
      try {
        const current = emblaApi.selectedScrollSnap()
        const offsets = [-1, 1]
        
        for (const offset of offsets) {
          const index = (current + offset + slides.length) % slides.length
          if (index >= 0 && index < slides.length && slides[index]) {
            const img = new window.Image()
            img.src = slides[index].imageUrl
            if (slides[index].product?.featuredImage?.url) {
              const productImg = new window.Image()
              productImg.src = slides[index].product.featuredImage.url
            }
          }
        }
      } catch (error) {
        console.warn("Error preloading slides:", error)
      }
    }

    emblaApi.on("select", preloadAdjacentSlides)
    preloadAdjacentSlides()

    return () => {
      emblaApi.off("select", preloadAdjacentSlides)
    }
  }, [emblaApi, slides])

  if (!slides || slides.length === 0) {
    return null
  }

  return (
    <div 
      className={cn("relative bg-secondary/5", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured products carousel"
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="relative min-w-0 flex-[0_0_100%]"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slides.length}`}
            >
              <div className="container mx-auto px-4 py-10 lg:py-16">
                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
                  {/* Content Section */}
                  <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
                    <div className="space-y-4">
                      <h2 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl xl:text-6xl">
                        {slide.title}
                      </h2>
                      <p className="text-lg text-muted-foreground lg:text-xl">
                        {slide.subtitle}
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                      <Button size="lg" asChild className="w-full sm:w-auto">
                        <Link href={slide.ctaHref}>
                          {slide.ctaText}
                        </Link>
                      </Button>
                      <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                        <Link href="/search">
                          Browse All Categories
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Image Section with Product Card */}
                  <div className="relative">
                    <div className="relative min-h-[400px] lg:min-h-[500px] xl:min-h-[600px] aspect-[4/5] overflow-hidden rounded-lg lg:aspect-[3/4]">
                      <Image
                        src={slide.imageUrl}
                        alt={slide.imageAlt}
                        fill
                        className="object-contain bg-white"
                        priority={index === 0}
                        loading={slidesInView.includes(index) || index === 0 ? "eager" : "lazy"}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                        quality={90}
                      />
                      
                      {/* Product Card Overlay */}
                      {slide.product && (
                        <div className="absolute bottom-4 right-4 w-[200px] lg:bottom-8 lg:right-8 lg:w-[240px]">
                          <CompactProductCard
                            {...slide.product}
                            selectedVariant={slide.product.selectedVariant}
                            variantOptions={slide.variantOptions}
                            priority={index === 0}
                            className="bg-background/95 backdrop-blur-sm"
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

      {/* Navigation */}
      <div className="absolute inset-x-0 bottom-8 hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Dots Indicator */}
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    selectedIndex === index
                      ? "w-8 bg-foreground"
                      : "w-2 bg-foreground/30 hover:bg-foreground/50"
                  )}
                  onClick={() => emblaApi?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrow Navigation */}
            <div className="flex gap-2">
              <button
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur transition-all duration-300",
                  canScrollPrev
                    ? "hover:bg-background hover:shadow-md"
                    : "cursor-not-allowed opacity-50"
                )}
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                aria-label="Previous slide"
              >
                <svg
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur transition-all duration-300",
                  canScrollNext
                    ? "hover:bg-background hover:shadow-md"
                    : "cursor-not-allowed opacity-50"
                )}
                onClick={scrollNext}
                disabled={!canScrollNext}
                aria-label="Next slide"
              >
                <svg
                  className="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dots */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 lg:hidden">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              selectedIndex === index
                ? "w-6 bg-foreground"
                : "w-2 bg-foreground/30"
            )}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
