"use client"

import { useEffect, useState } from "react"

interface ResponsiveCarouselConfig {
  mobile: {
    slidesToScroll: number
    quality: number
    sizes: string
  }
  tablet: {
    slidesToScroll: number
    quality: number
    sizes: string
  }
  desktop: {
    slidesToScroll: number
    quality: number
    sizes: string
  }
}

const defaultConfig: ResponsiveCarouselConfig = {
  mobile: {
    slidesToScroll: 1,
    quality: 70,
    sizes: "100vw",
  },
  tablet: {
    slidesToScroll: 1,
    quality: 75,
    sizes: "90vw",
  },
  desktop: {
    slidesToScroll: 1,
    quality: 85,
    sizes: "(max-width: 1024px) 50vw, 800px",
  },
}

export function useResponsiveCarousel(customConfig?: Partial<ResponsiveCarouselConfig>) {
  const [viewport, setViewport] = useState<"mobile" | "tablet" | "desktop">("desktop")
  const config = { ...defaultConfig, ...customConfig }

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth
      if (width < 640) {
        setViewport("mobile")
      } else if (width < 1024) {
        setViewport("tablet")
      } else {
        setViewport("desktop")
      }
    }

    updateViewport()

    let timeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(timeout)
      timeout = setTimeout(updateViewport, 150)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(timeout)
    }
  }, [])

  return {
    viewport,
    config: config[viewport],
    isMobile: viewport === "mobile",
    isTablet: viewport === "tablet",
    isDesktop: viewport === "desktop",
  }
}
