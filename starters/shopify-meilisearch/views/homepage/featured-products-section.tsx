import { CompactProductCard } from "components/compact-product-card"
import { FeaturedProductCard } from "components/featured-product-card"
import { CommerceProduct } from "types"
import { cn } from "utils/cn"

export const FeaturedProductsSection = ({
  products,
}: {
  products: Pick<CommerceProduct, "id" | "variants" | "handle" | "images" | "title" | "featuredImage" | "minPrice" | "avgRating" | "totalReviews" | "vendor">[]
}) => {
  return (
    <div className="mx-auto my-4 w-full max-w-container-sm space-y-4 px-4">
      <h2 className="mb-8 text-4xl font-semibold">New Arrivals</h2>
      <div className="grid gap-1 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-3 md:gap-4">
        {products.map((product, index) => {
          if (index === 0) {
            return <FeaturedProductCard prefetch className="col-span-2 md:row-span-2" key={product.id} {...product} />
          }
          return (
            <CompactProductCard
              prefetch={index < 2}
              key={product.id}
              {...product}
              className={cn({
                "col-span-2 md:col-auto": index === 5,
              })}
            />
          )
        })}
      </div>
    </div>
  )
}
