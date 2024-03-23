import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { ProductCard } from "components/ProductCard/ProductCard"

interface HitsSectionProps {
  hits: PlatformProduct[]
}

export async function HitsSection({ hits }: HitsSectionProps) {
  if (!hits.length) {
    return <p>No results for this query</p>
  }
  return (
    <div className="grid w-full grid-cols-[repeat(_auto-fill,minmax(140px,1fr)_)] items-start gap-4 gap-y-8 md:grid-cols-[repeat(_auto-fill,minmax(280px,1fr)_)]">
      {hits.map((singleResult, idx) => (
        <ProductCard className="overflow-hidden rounded-lg" key={singleResult.id} priority={[0, 1].includes(idx)} {...singleResult} />
      ))}
    </div>
  )
}
