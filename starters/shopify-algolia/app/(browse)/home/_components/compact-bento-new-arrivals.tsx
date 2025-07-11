import { UniformProductCard } from "components/uniform-product-card"
import { CommerceProduct } from "types"

export const CompactBentoNewArrivals = ({
  products,
}: {
  products: Pick<CommerceProduct, "id" | "variants" | "handle" | "images" | "title" | "featuredImage" | "minPrice" | "avgRating" | "totalReviews" | "vendor">[]
}) => {
  if (!products.length) return null

  // Take only first 8 products for a clean 4x2 grid
  const displayProducts = products.slice(0, 8)

  return (
    <section className="relative w-full py-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            New Arrivals
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Fresh styles, just dropped
          </p>
        </div>

        {/* Compact Bento Grid - Fixed height grid */}
        <div className="grid auto-rows-fr grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-5">
          {/* Featured Product - Takes 2 cells but same height as others */}
          {displayProducts[0] && (
            <div className="col-span-2">
              <UniformProductCard 
                {...displayProducts[0]} 
                featured
                priority
                prefetch
                className="h-full"
              />
            </div>
          )}

          {/* Regular Products - Using UniformProductCard for consistent heights */}
          {displayProducts.slice(1).map((product) => (
            <UniformProductCard 
              key={product.id} 
              {...product} 
              prefetch
              className="h-full"
            />
          ))}
        </div>
      </div>
    </section>
  )
}