import { ProductCard } from "components/product-card"
import { CommerceProduct } from "types"
import Link from "next/link"
import Image from "next/image"
import { cn } from "utils/cn"

export const ModernNewArrivalsSection = ({
  products,
}: {
  products: Pick<CommerceProduct, "id" | "variants" | "handle" | "images" | "title" | "featuredImage" | "minPrice" | "avgRating" | "totalReviews" | "vendor">[]
}) => {
  // Feature first product, then show others in grid
  const featuredProduct = products[0]
  const gridProducts = products.slice(1, 9) // Show up to 8 additional products

  if (!products.length) return null

  return (
    <section className="relative w-full py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center justify-between sm:flex-row">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              New Arrivals
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Fresh styles, just dropped
            </p>
          </div>
          
          <Link
            href="/collections/new-arrivals"
            className={cn(
              "mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all duration-200",
              "hover:scale-105 hover:shadow-lg",
              "focus:outline-none focus:ring-4 focus:ring-foreground/20",
              "sm:mt-0"
            )}
          >
            View All
            <svg
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Featured Product - Takes half the grid on large screens */}
          {featuredProduct && (
            <div className="lg:col-span-6">
              <div className="group relative h-full overflow-hidden rounded-2xl bg-secondary/5">
                <Link 
                  href={`/product/${featuredProduct.handle}`}
                  className="block h-full"
                  prefetch={true}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden lg:aspect-square">
                    {featuredProduct.featuredImage?.url && (
                      <Image
                        src={featuredProduct.featuredImage.url}
                        alt={featuredProduct.featuredImage.altText || featuredProduct.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 700px"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        priority
                      />
                    )}
                    
                    {/* Overlay with product info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    <div className="absolute bottom-0 inset-x-0 p-8 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 translate-y-4">
                      <p className="mb-2 text-sm font-medium uppercase tracking-wider">
                        Featured
                      </p>
                      <h3 className="mb-3 text-2xl font-bold">
                        {featuredProduct.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg">
                          Shop Now →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          )}

          {/* Regular Products Grid */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {gridProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  {...product} 
                  prefetch
                  className="h-full"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Trust Signal */}
        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <svg
            className="size-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <span>New products added weekly</span>
        </div>
      </div>
    </section>
  )
}