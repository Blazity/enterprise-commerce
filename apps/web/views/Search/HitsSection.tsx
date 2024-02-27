import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { ProductCard } from "components/ProductCard"

interface HitsSectionProps {
  hits: PlatformProduct[]
}

export async function HitsSection({ hits }: HitsSectionProps) {
  return (
    <div className="grid w-full grid-cols-[repeat(_auto-fill,minmax(280px,1fr)_)] items-start gap-4 gap-y-8">
      {hits.map((singleResult, idx) => (
        <ProductCard key={singleResult.id} {...singleResult} />
      ))}
    </div>
  )
}
