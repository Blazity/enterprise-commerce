"use client"

import { ProductCard } from "components/product-card"
import * as m from "motion/react-m"
import { LazyMotion, domAnimation } from "motion/react"
import type { CommerceProduct } from "types"

interface HitsSectionProps {
  hits: CommerceProduct[]
  basePath?: string
}

export function HitsSection({ hits, basePath }: HitsSectionProps) {
  if (!hits.length) {
    return <p>No results for this query</p>
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="-px-4 grid w-full grid-cols-2 items-start gap-1 gap-y-8 sm:grid-cols-3 sm:gap-6 xl:grid-cols-3">
        {hits.map((singleResult, idx) => (
          <m.div key={singleResult.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, delay: 0.02 * idx }}>
            <ProductCard priority={[0, 1].includes(idx)} {...singleResult} href={basePath ? `/${basePath}/product/${singleResult.handle}` : undefined} />
          </m.div>
        ))}
      </div>
    </LazyMotion>
  )
}
