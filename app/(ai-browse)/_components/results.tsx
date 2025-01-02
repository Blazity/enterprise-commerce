import { CategoryCard } from "components/category-card"
import { ProductCard } from "components/product-card"
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "components/ui/carousel"
import type { CommerceProduct } from "types"
import type { PlatformCollection } from "lib/shopify/types"

export const ProductResultsList = ({ products }: { products: CommerceProduct[] }) => {
  if (!products.length) return null

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Products</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} href={`/ai/product/${product.handle}`} {...product} />
        ))}
      </div>
    </div>
  )
}

export const CategoriesResultsList = ({ categories }: { categories: PlatformCollection[] }) => {
  if (!categories.length) return null

  return (
    <div className="relative px-2">
      <h2 className="mb-4 text-xl font-bold">Categories</h2>
      <Carousel opts={{ skipSnaps: true }}>
        <CarouselPrevious className="absolute -left-4 top-[40%] z-50 hidden xl:flex" />
        <CarouselContent className="ml-0 justify-start gap-8">
          {categories.map((category, index) => (
            <div key={category.id} className="min-w-[400px]">
              <CategoryCard index={index + 3} href={`/ai/category/${category.handle}`} {...category} />
            </div>
          ))}
        </CarouselContent>
        <CarouselNext className="absolute -right-4 top-[40%] z-50 hidden xl:flex" />
      </Carousel>
    </div>
  )
}
