import Image from "next/image"
import Link from "next/link"
import { cn } from "utils/cn"
import { type CurrencyType, mapCurrencyToSign } from "utils/map-currency-to-sign"
import type { CommerceProduct } from "types"
import { StarIcon } from "components/icons/star-icon"

interface UniformProductCardProps
  extends Pick<
    CommerceProduct,
    "variants" | "handle" | "images" | "title" | "featuredImage" | "minPrice" | "avgRating" | "totalReviews" | "vendor"
  > {
  priority?: boolean
  prefetch?: boolean
  className?: string
  featured?: boolean
}

export const UniformProductCard = ({
  variants,
  handle,
  title,
  featuredImage,
  minPrice,
  avgRating,
  totalReviews,
  className,
  priority,
  vendor,
  prefetch = false,
  featured = false,
}: UniformProductCardProps) => {
  const variantPrice = variants?.find(Boolean)?.price
  const currencySymbol = variantPrice ? mapCurrencyToSign((variantPrice.currencyCode as CurrencyType) || "USD") : "$"

  return (
    <Link
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background transition-all duration-300 hover:shadow-lg",
        className
      )}
      href={`/product/${handle}`}
      prefetch={prefetch}
    >
      {}
      <div className="relative aspect-square overflow-hidden bg-secondary/5">
        <Image
          priority={priority}
          src={featuredImage?.url || "/default-product-image.svg"}
          alt={featuredImage?.altText || title}
          fill
          className="object-contain transition-transform duration-300 ease-out group-hover:scale-105"
          sizes={featured ? "(max-width: 640px) 100vw, 350px" : "(max-width: 640px) 50vw, 250px"}
        />

        {featured && (
          <div className="absolute left-3 top-3 rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">
            Featured
          </div>
        )}
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-4">
        <h3 className={cn("mb-1 line-clamp-2 font-semibold", featured ? "text-lg" : "text-base")}>{title}</h3>

        {vendor && <p className="mb-2 line-clamp-1 text-sm text-muted-foreground">{vendor}</p>}

        {}
        {avgRating && totalReviews && (
          <div className="mb-2 flex items-center gap-1">
            <StarIcon className="size-3.5 fill-foreground/80" />
            <span className="text-sm text-muted-foreground">
              {avgRating.toFixed(1)} ({totalReviews})
            </span>
          </div>
        )}

        {}
        <div className="mt-auto">
          {minPrice && (
            <p className={cn("font-bold", featured ? "text-lg" : "text-base")}>
              {currencySymbol}
              {minPrice.toFixed(2)}
            </p>
          )}
          {variants && variants.length > 1 && (
            <p className="text-xs text-muted-foreground">{variants.length} variants</p>
          )}
        </div>
      </div>
    </Link>
  )
}
