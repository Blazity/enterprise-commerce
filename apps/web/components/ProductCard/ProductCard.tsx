import Image from "next/image"
import Link from "next/link"
import { cn } from "utils/cn"
import { type CurrencyType, mapCurrencyToSign } from "utils/mapCurrencyToSign"
import type { CommerceProduct } from "types"
import { StarIcon } from "components/Icons/StarIcon"

interface ProductCardProps extends Pick<CommerceProduct, "variants" | "handle" | "images" | "title" | "featuredImage" | "minPrice" | "avgRating" | "totalReviews" | "vendor"> {
  priority?: boolean
  prefetch?: boolean
  className?: string
}

export const ProductCard = ({ variants, handle, title, featuredImage, minPrice, avgRating, totalReviews, className, priority, vendor, prefetch = false }: ProductCardProps) => {
  const noOfVariants = variants?.length
  const href = `/product/${handle}`
  const linkAria = `Visit product: ${title}`
  const variantPrice = variants?.find(Boolean)?.price

  return (
    <Link className={cn("group flex h-full w-full flex-col overflow-hidden transition-all hover:shadow-md", className)} aria-label={linkAria} href={href} prefetch={prefetch}>
      <div className="relative aspect-square overflow-hidden">
        <Image
          priority={priority}
          className="object-cover transition-transform group-hover:scale-105"
          src={featuredImage?.url || "/default-product-image.svg"}
          alt={featuredImage?.altText || title}
          fill
        />
      </div>
      <div className="flex shrink-0 grow flex-col gap-2 p-4">
        {/* remove first word from the title as it includes vendor (this just needs feed update and then can be removed) */}
        <h3 className="line-clamp-2 text-lg font-semibold transition-colors group-hover:text-orange-500">{title.split(" ").slice(1).join(" ")}</h3>
        <div className="mt-auto flex flex-col gap-1">
          {!!vendor && <p className="text-sm text-orange-400">{vendor}</p>}
          {noOfVariants > 0 && (
            <p className="text-sm text-gray-500">
              {noOfVariants} variant{noOfVariants > 1 ? "s" : ""}
            </p>
          )}
          {!!avgRating && !!totalReviews && (
            <div className="flex items-center space-x-1">
              <StarIcon className="size-4 fill-yellow-400 stroke-yellow-500" />
              <span className="text-sm">{avgRating.toFixed(2)}</span>
              <span className="text-xs">
                ({totalReviews} review{totalReviews !== 1 && "s"})
              </span>
            </div>
          )}
          {!!variantPrice && <span>From {mapCurrencyToSign((variantPrice.currencyCode as CurrencyType) || "USD") + minPrice.toFixed(2)}</span>}
        </div>
      </div>
    </Link>
  )
}
