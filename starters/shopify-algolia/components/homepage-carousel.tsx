"use client"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { cn } from "utils/cn"
import { Button } from "./ui/button"
import { CompactProductCard } from "./compact-product-card"
import { useIsMobile } from "utils/use-mobile"
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
  const isMobile = useIsMobile()
  
  // Create plugins based on mobile state
  const plugins = useMemo(() => {
    if (isMobile) {
      return [
        Autoplay({ 
          delay: 4000, 
          stopOnInteraction: true,
          stopOnMouseEnter: true,
          playOnInit: true
        })
      ]
    }
    return []
  }, [isMobile])
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 25,
    skipSnaps: false,
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    inViewThreshold: 0.7,
    watchDrag: true,
    watchResize: true,
    watchSlides: true
  }, plugins)

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [slidesInView, setSlidesInView] = useState<number[]>([0])
  const [loadedIndexes, setLoadedIndexes] = useState<Set<number>>(new Set([0]))

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


  // Optimized preloading strategy
  useEffect(() => {
    if (!emblaApi || !slides.length) return

    const preloadImages = () => {
      if (!emblaApi.selectedScrollSnap) return
      
      try {
        const current = emblaApi.selectedScrollSnap()
        const preloadCount = 2
        const indicesToLoad = new Set<number>()
        
        // Preload current and adjacent slides
        for (let i = -preloadCount; i <= preloadCount; i++) {
          const index = (current + i + slides.length) % slides.length
          if (index >= 0 && index < slides.length) {
            indicesToLoad.add(index)
          }
        }
        
        setLoadedIndexes(prev => new Set([...Array.from(prev), ...Array.from(indicesToLoad)]))
        
        // Use requestIdleCallback for non-critical preloading
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => {
            indicesToLoad.forEach(index => {
              if (slides[index]) {
                const link = document.createElement('link')
                link.rel = 'prefetch'
                link.as = 'image'
                link.href = slides[index].imageUrl
                document.head.appendChild(link)
              }
            })
          }, { timeout: 2000 })
        }
      } catch (error) {
        console.warn("Error preloading slides:", error)
      }
    }

    emblaApi.on("select", preloadImages)
    emblaApi.on("init", preloadImages)
    preloadImages()

    return () => {
      emblaApi.off("select", preloadImages)
      emblaApi.off("init", preloadImages)
    }
  }, [emblaApi, slides])

  if (!slides || slides.length === 0) {
    return null
  }
  
  // Ensure embla is properly initialized before rendering
  if (isMobile === undefined) {
    return <div className={cn("relative bg-secondary/5", className)} style={{ minHeight: '500px' }} />
  }

  return (
    <div 
      className={cn("relative bg-secondary/5 [will-change:transform] [contain:layout_style]", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured products carousel"
      style={{
        WebkitOverflowScrolling: "touch"
      }}
    >
      <div 
        ref={emblaRef} 
        className="overflow-hidden [perspective:1000px]"
        style={{
          willChange: "transform",
          WebkitOverflowScrolling: "touch",
          backfaceVisibility: "hidden"
        }}
      >
        <div 
          className="flex touch-pan-y touch-pinch-zoom motion-reduce:!duration-[0.01ms]"
          style={{
            backfaceVisibility: "hidden",
            willChange: "transform"
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="relative min-w-0 flex-[0_0_100%] translate-z-0 @container"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slides.length}`}
              style={{
                contain: "layout style paint",
                contentVisibility: loadedIndexes.has(index) ? "visible" : "auto",
                transform: "translateZ(0)"
              }}
            >
              <div className="container mx-auto">
                <div className="relative min-h-[500px] px-4 py-12 sm:min-h-[550px] sm:py-16 lg:min-h-0 lg:py-16 lg:grid lg:items-center lg:gap-12 lg:grid-cols-2 xl:gap-16">
                  {/* Mobile: Image as background */}
                  <div className="absolute inset-0 -z-10 lg:hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/75 to-background/90" />
                    <Image
                      src={slide.imageUrl}
                      alt={slide.imageAlt}
                      fill
                      className="object-cover object-center opacity-25"
                      priority={index === 0}
                      quality={60}
                      sizes="100vw"
                    />
                  </div>
                  
                  {/* Content Section */}
                  <div className="relative flex flex-col justify-center space-y-6 text-center lg:px-4 lg:text-left">
                    <div className="space-y-4">
                      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl xl:text-6xl">
                        {slide.title}
                      </h2>
                      <p className="text-base text-muted-foreground sm:text-lg lg:text-xl max-w-md mx-auto lg:mx-0 text-balance md:text-pretty">
                        {slide.subtitle}
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                      <Button size="default" asChild className="w-full sm:w-auto lg:text-lg lg:px-8 lg:py-6">
                        <Link href={slide.ctaHref}>
                          {slide.ctaText}
                        </Link>
                      </Button>
                      <Button variant="outline" size="default" asChild className="w-full sm:w-auto lg:text-lg lg:px-8 lg:py-6">
                        <Link href="/search">
                          Browse All Categories
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Desktop: Image Section with Product Card */}
                  <div className="relative hidden lg:block lg:px-4">
                    <div className="relative h-[400px] w-full overflow-hidden rounded-lg bg-white lg:h-[500px] xl:h-[600px]">
                        <Image
                          src={slide.imageUrl}
                          alt={slide.imageAlt}
                          width={1200}
                          height={800}
                          className="size-full object-contain motion-reduce:transition-none"
                          priority={index === 0}
                          fetchPriority={index === 0 ? "high" : index === 1 ? "low" : "auto"}
                          loading={index === 0 ? "eager" : "lazy"}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                          quality={index === 0 ? 85 : 75}
                          style={{
                            opacity: loadedIndexes.has(index) ? 1 : 0,
                            transition: 'opacity 0.3s ease-in-out'
                          }}
                        />
                      
                      {/* Product Card Overlay - Hidden on mobile */}
                      {slide.product && (
                        <div className="absolute bottom-4 right-4 hidden w-[200px] md:block lg:bottom-8 lg:right-8 lg:w-[240px]">
                          <CompactProductCard
                            {...slide.product}
                            selectedVariant={slide.product.selectedVariant}
                            variantOptions={slide.variantOptions}
                            priority={index === 0}
                            className="bg-background/95 backdrop-blur-sm shadow-xl"
                            loading={index === 0 ? "eager" : "lazy"}
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
                    "h-2 rounded-full transition-all duration-300 will-change-[width] translate-z-0 relative before:content-[''] before:absolute before:inset-[-4px] before:pointer-events-none",
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
                  "flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur transition-all duration-300 translate-z-0 will-change-[transform,opacity]",
                  canScrollPrev
                    ? "hover:bg-background hover:shadow-md hover:scale-110"
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
                  "flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur transition-all duration-300 translate-z-0 will-change-[transform,opacity]",
                  canScrollNext
                    ? "hover:bg-background hover:shadow-md hover:scale-110"
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

      {/* Mobile Dots - Touch Optimized */}
      <div className="absolute inset-x-0 bottom-6 flex justify-center gap-3 lg:hidden">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "relative h-2.5 rounded-full transition-all duration-300",
              "before:content-[''] before:absolute before:inset-[-8px] before:pointer-events-none",
              selectedIndex === index
                ? "w-8 bg-foreground"
                : "w-2.5 bg-foreground/40 active:bg-foreground/60"
            )}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
