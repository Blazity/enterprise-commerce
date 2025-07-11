import { ProductCard } from "components/product-card"
import { CommerceProduct } from "types"
import Link from "next/link"
import Image from "next/image"
import { type CurrencyType, mapCurrencyToSign } from "utils/map-currency-to-sign"

export const SimpleNewArrivalsSection = ({
  products,
}: {
  products: Pick<CommerceProduct, "id" | "variants" | "handle" | "images" | "title" | "featuredImage" | "minPrice" | "avgRating" | "totalReviews" | "vendor">[]
}) => {
  if (!products.length) return null

  const featuredProduct = products[0]
  const gridProducts = products.slice(1, 5) // 4 products for the grid
  
  const variantPrice = featuredProduct?.variants?.find(Boolean)?.price
  const currencySymbol = variantPrice ? mapCurrencyToSign((variantPrice.currencyCode as CurrencyType) || "USD") : "$"

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

        {/* Simple Layout: 1 big + 4 small */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Featured Product - Left Side */}
          {featuredProduct && (
            <Link 
              href={`/product/${featuredProduct.handle}`}
              className="group relative block flex-1 overflow-hidden rounded-2xl bg-secondary/5 transition-all duration-300 hover:shadow-xl lg:max-w-[50%]"
              prefetch={true}
            >
              <div className="relative aspect-square lg:aspect-[4/3]">
                {featuredProduct.featuredImage?.url && (
                  <Image
                    src={featuredProduct.featuredImage.url}
                    alt={featuredProduct.featuredImage.altText || featuredProduct.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                )}
                
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-0 inset-x-0 p-8 text-white">
                  <p className="mb-2 text-sm font-medium uppercase tracking-wider">
                    Featured
                  </p>
                  <h3 className="mb-2 text-2xl font-bold">
                    {featuredProduct.title}
                  </h3>
                  {featuredProduct.vendor && (
                    <p className="mb-3 text-base opacity-90">{featuredProduct.vendor}</p>
                  )}
                  {featuredProduct.minPrice && (
                    <p className="text-xl font-semibold">
                      {currencySymbol}{featuredProduct.minPrice.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          )}

          {/* 4 Product Grid - Right Side */}
          <div className="flex-1 lg:max-w-[50%]">
            <div className="grid h-full grid-cols-2 gap-4 content-start">
              {gridProducts.map((product) => (
                <div key={product.id} className="aspect-[3/4]">
                  <ProductCard 
                    {...product} 
                    prefetch
                    className="h-full"
                    variant="default"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}