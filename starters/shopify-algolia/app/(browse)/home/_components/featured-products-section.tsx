import { ProductCard } from "components/product-card"
import { CommerceProduct } from "types"

export const FeaturedProductsSection = ({
  products,
}: {
  products: Pick<
    CommerceProduct,
    | "id"
    | "variants"
    | "handle"
    | "images"
    | "title"
    | "featuredImage"
    | "minPrice"
    | "avgRating"
    | "totalReviews"
    | "vendor"
  >[]
}) => {
  const highlightedProducts = products.slice(0, 2)
  const restProducts = products.slice(2)

  return (
    <div className="mx-auto my-4 w-full max-w-container-sm space-y-4 px-4">
      <h2 className="mb-8 text-4xl font-semibold">New Arrivals</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-1">
        {highlightedProducts.map((product, index) => (
          <ProductCard
            highlighted={index < 2}
            prefetch
            className="md:col-span-2 md:row-span-2"
            key={product.id}
            {...product}
          />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-1">
        {restProducts.map((product) => (
          <ProductCard prefetch className="" key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}
