import { ProductCard } from "components/ProductCard/ProductCard"
import { CommerceProduct } from "types"

export const FeaturedProductsSection = ({
  products,
}: {
  products: Pick<CommerceProduct, "id" | "variants" | "handle" | "images" | "title" | "featuredImage" | "minPrice" | "avgRating" | "totalReviews" | "vendor">[]
}) => {
  return (
    <div className="max-w-container-md mx-auto my-4 w-full space-y-4 px-4">
      <h2 className="mb-6 text-2xl font-semibold">Bestsellers</h2>
      <div className="grid gap-1 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
        {products.map((product, index) => {
          return <ProductCard prefetch={index < 3} key={product.id} {...product} />
        })}
      </div>
    </div>
  )
}
