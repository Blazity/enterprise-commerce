"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "utils/cn"
import { PlatformCollection } from "lib/shopify/types"
import { useState } from "react"

interface EnterpriseCategoryCardProps {
  category: PlatformCollection
  priority?: boolean
  className?: string
}

export const EnterpriseCategoryCard = ({ category, priority = false, className }: EnterpriseCategoryCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Link
      href={`/category/${category.handle}`}
      className={cn(
        "group relative block h-full overflow-hidden rounded-2xl bg-background transition-all duration-500",
        "hover:scale-[1.02] hover:shadow-2xl",
        "focus:outline-none focus:ring-4 focus:ring-primary/20",
        className
      )}
      prefetch={true}
    >
      <div className="relative size-full overflow-hidden bg-secondary/5">
        {category.image?.url && (
          <>
            <div
              className={cn(
                "absolute inset-0 bg-secondary/10 transition-opacity duration-300",
                imageLoaded ? "opacity-0" : "opacity-100"
              )}
            />
            <Image
              src={category.image.url}
              alt={category.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 700px"
              className={cn(
                "object-cover transition-all duration-700",
                "group-hover:scale-110",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              priority={priority}
              onLoad={() => setImageLoaded(true)}
              quality={90}
            />
          </>
        )}

        {}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

        {}
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
          <h3 className="mb-2 text-3xl font-bold tracking-tight transition-transform duration-300 group-hover:translate-y-[-4px]">
            {category.title}
          </h3>
          {category.description && (
            <p className="mb-4 line-clamp-2 text-base opacity-90 transition-opacity duration-300 group-hover:opacity-100">
              {category.description}
            </p>
          )}

          <div className="flex items-center gap-2 text-base font-semibold">
            <span className="relative">
              Shop Now
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </span>
            <svg
              className="size-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}
