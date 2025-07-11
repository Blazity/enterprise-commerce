import { ProductCard } from "components/product-card"
import { CommerceProduct } from "types"
import Link from "next/link"
import Image from "next/image"
import { type CurrencyType, mapCurrencyToSign } from "utils/map-currency-to-sign"

export const BentoNewArrivalsSection = ({
  products,
}: {
  products: Pick<CommerceProduct, "id" | "variants" | "handle" | "images" | "title" | "featuredImage" | "minPrice" | "avgRating" | "totalReviews" | "vendor">[]
}) => {
  if (!products.length) return null

  // Organize products for bento layout
  const featuredProduct = products[0]
  const secondaryProducts = products.slice(1, 3) // 2 products for medium cards
  const gridProducts = products.slice(3, 9) // 6 products for standard grid

  const variantPrice = featuredProduct?.variants?.find(Boolean)?.price
  const currencySymbol = variantPrice ? mapCurrencyToSign((variantPrice.currencyCode as CurrencyType) || "USD") : "$"

  return (
    <section className="relative w-full py-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            New Arrivals
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Fresh styles, just dropped
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid gap-4 md:grid-cols-12 lg:gap-5">
          {/* Featured Product - Large Card */}
          {featuredProduct && (
            <div className="md:col-span-6 lg:col-span-5">
              <Link 
                href={`/product/${featuredProduct.handle}`}
                className="group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-xl bg-secondary/5 transition-all duration-300 hover:shadow-xl md:min-h-[320px]"
                prefetch={true}
              >
                <div className="relative flex-1">
                  {featuredProduct.featuredImage?.url && (
                    <Image
                      src={featuredProduct.featuredImage.url}
                      alt={featuredProduct.featuredImage.altText || featuredProduct.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 450px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                  )}
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider opacity-90">
                      Featured
                    </p>
                    <h3 className="mb-1 text-xl font-bold line-clamp-2">
                      {featuredProduct.title}
                    </h3>
                    {featuredProduct.vendor && (
                      <p className="mb-2 text-sm opacity-90">{featuredProduct.vendor}</p>
                    )}
                    {featuredProduct.minPrice && (
                      <p className="text-lg font-semibold">
                        {currencySymbol}{featuredProduct.minPrice.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Secondary Products - Medium Cards */}
          <div className="md:col-span-6 lg:col-span-7">
            <div className="grid grid-cols-2 gap-4 lg:gap-5">
              {secondaryProducts.map((product, index) => (
                <ProductCard 
                  key={product.id}
                  {...product} 
                  prefetch
                  priority={index === 0}
                  className="h-full"
                />
              ))}
              {/* Fill remaining grid spots with more products */}
              {gridProducts.slice(0, 2).map((product) => (
                <ProductCard 
                  key={product.id} 
                  {...product} 
                  prefetch
                  className="h-full"
                />
              ))}
            </div>
          </div>

          {/* Additional Products Row */}
          {gridProducts.slice(2).length > 0 && (
            <div className="md:col-span-12">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-5">
                {gridProducts.slice(2).map((product) => (
                  <ProductCard 
                    key={product.id} 
                    {...product} 
                    prefetch
                    className="h-full"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}