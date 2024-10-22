import { ProductCard } from "components/product-card"
import type { CommerceProduct } from "types"

interface HitsSectionProps {
  hits: CommerceProduct[]
}

export async function HitsSection({ hits }: HitsSectionProps) {
  if (!hits.length) {
    return <p>No results for this query</p>
  }
  return (
    <div className="-px-4 grid w-full grid-cols-2 items-start gap-1 gap-y-8 sm:grid-cols-3 sm:gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {hits.map((singleResult, idx) => (
        <ProductCard key={singleResult.id} priority={[0, 1].includes(idx)} {...singleResult} />
      ))}
    </div>
  )
}
