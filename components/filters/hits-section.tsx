"use client"

import { ProductCard } from "components/product-card"
import * as m from "motion/react-m"
import { LazyMotion, domAnimation } from "motion/react"
import type { CommerceProduct } from "types"
import { usePathname } from "next/navigation"
import { cn } from "utils/cn"

interface HitsSectionProps {
  hits: CommerceProduct[]
  basePath?: string
}

export function HitsSection({ hits, basePath }: HitsSectionProps) {
  const pathname = usePathname()
  const isAiPath = pathname.startsWith("/ai")

  if (!hits.length) {
    return (
      <div className="mt-2 flex h-[400px] w-full flex-col items-center justify-center rounded-xl bg-gray-50">
        <p className="text-lg font-medium text-gray-500">No results for this query</p>
      </div>
    )
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className={cn("-px-4 grid w-full grid-cols-2 items-start gap-1 gap-y-8 sm:grid-cols-3 sm:gap-6 xl:grid-cols-3", isAiPath && "sm:grid-cols-2")}>
        {hits.map((singleResult, idx) => (
          <m.div key={singleResult.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, delay: 0.02 * idx }}>
            <ProductCard priority={[0, 1].includes(idx)} {...singleResult} href={basePath ? `/${basePath}/product/${singleResult.handle}` : undefined} />
          </m.div>
        ))}
      </div>
    </LazyMotion>
  )
}
