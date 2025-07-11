import { MiniProductCard } from "components/mini-product-card"
import { CommerceProduct } from "types"
import Link from "next/link"
import Image from "next/image"
import { type CurrencyType, mapCurrencyToSign } from "utils/map-currency-to-sign"

export const AlternatingNewArrivalsSection = ({
  products,
}: {
  products: Pick<CommerceProduct, "id" | "variants" | "handle" | "images" | "title" | "featuredImage" | "minPrice" | "avgRating" | "totalReviews" | "vendor">[]
}) => {
  if (products.length < 10) return null // Need at least 10 products for this layout

  // Split products for the alternating layout
  const firstFeatured = products[0]
  const firstMiniGrid = products.slice(1, 5) // 4 products
  const secondMiniGrid = products.slice(5, 9) // 4 products
  const secondFeatured = products[9]

  const FeaturedCard = ({ product, alignment = "left" }: { product: typeof firstFeatured; alignment?: "left" | "right" }) => {
    const variantPrice = product?.variants?.find(Boolean)?.price
    const currencySymbol = variantPrice ? mapCurrencyToSign((variantPrice.currencyCode as CurrencyType) || "USD") : "$"

    return (
      <Link 
        href={`/product/${product.handle}`}
        className="group relative block h-full overflow-hidden rounded-2xl bg-secondary/5 transition-all duration-300 hover:shadow-xl"
        prefetch={true}
      >
        <div className="relative h-full">
          {product.featuredImage?.url && (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              fill
              sizes="(max-width: 1024px) 100vw, 700px"
              className="object-contain transition-transform duration-500 group-hover:scale-105"
              priority={alignment === "left"}
            />
          )}
          
          {/* Gradient overlay - only at bottom */}
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
          
          {/* Content overlay */}
          <div className="absolute bottom-0 inset-x-0 p-6 text-white">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider opacity-90">
              Featured
            </p>
            <h3 className="mb-1 text-xl font-bold lg:text-2xl line-clamp-2">
              {product.title}
            </h3>
            {product.vendor && (
              <p className="mb-2 text-sm opacity-90">{product.vendor}</p>
            )}
            {product.minPrice && (
              <p className="text-lg font-semibold lg:text-xl">
                {currencySymbol}{product.minPrice.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <section className="relative w-full py-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            New Arrivals
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Fresh styles, just dropped
          </p>
        </div>

        <div className="space-y-6 lg:space-y-8">
          {/* First Row: Large Left, Mini Grid Right */}
          <div className="grid gap-6 lg:grid-cols-2 lg:auto-rows-[400px]">
            <div className="h-full">
              <FeaturedCard product={firstFeatured} alignment="left" />
            </div>
            
            <div className="grid grid-cols-2 gap-2 content-start">
              {firstMiniGrid.map((product, index) => (
                <MiniProductCard 
                  key={product.id} 
                  {...product} 
                  prefetch={false}
                  loading={index < 2 ? "eager" : "lazy"}
                  className="h-[196px]"
                />
              ))}
            </div>
          </div>

          {/* Second Row: Mini Grid Left, Large Right */}
          <div className="grid gap-6 lg:grid-cols-2 lg:auto-rows-[400px]">
            <div className="grid grid-cols-2 gap-2 content-start lg:order-1">
              {secondMiniGrid.map((product) => (
                <MiniProductCard 
                  key={product.id} 
                  {...product} 
                  prefetch={false}
                  loading="lazy"
                  className="h-[196px]"
                />
              ))}
            </div>
            
            <div className="h-full lg:order-2">
              <FeaturedCard product={secondFeatured} alignment="right" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}