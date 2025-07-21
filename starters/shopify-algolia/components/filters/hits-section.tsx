"use client"

import { ProductCard } from "components/product-card"
import type { CommerceProduct } from "types"
import { usePathname } from "next/navigation"
import { cn } from "utils/cn"
import Link from "next/link"
import { useIsMobile } from "utils/use-mobile"

interface HitsSectionProps {
  hits: CommerceProduct[]
  basePath?: string
}

export function HitsSection({ hits, basePath }: HitsSectionProps) {
  const pathname = usePathname()
  const isAiPath = pathname.startsWith("/ai")
  const isMobile = useIsMobile()

  if (!hits.length) {
    return (
      <div className="mt-2 flex h-[400px] w-full flex-col items-center justify-center rounded-xl bg-gray-50">
        <p className="text-2xl font-medium text-gray-800">Oops! Nothing matches your search</p>
        <p className="font-medium text-gray-400">Explore our full collection to find what you’re looking for</p>
        <Link
          href={isAiPath ? "/ai/search" : "/search"}
          className="mt-3 rounded-md bg-black px-4 py-1.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-black/85"
        >
          See all products
        </Link>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "-px-4 grid w-full auto-rows-fr grid-cols-2 items-start gap-2 gap-y-4 sm:grid-cols-3 sm:gap-4 xl:grid-cols-3",
        isAiPath && "sm:grid-cols-2"
      )}
    >
      {hits.map((singleResult, idx) => {
        const priority = isMobile ? [0, 1, 2, 3].includes(idx) : [0, 1, 2, 3, 4, 5].includes(idx)

        return (
          <div
            key={singleResult.id}
            data-index={idx}
            className="h-full lg:animate-enter lg:opacity-0"
            style={{ "--stagger": idx } as React.CSSProperties}
          >
            <ProductCard
              priority={priority}
              {...singleResult}
              href={basePath ? `/${basePath}/product/${singleResult.handle}` : undefined}
            />
          </div>
        )
      })}
    </div>
  )
}
