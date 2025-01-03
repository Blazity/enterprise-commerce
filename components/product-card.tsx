import Image from "next/image"
import Link from "next/link"
import { cn } from "utils/cn"
import { type CurrencyType, mapCurrencyToSign } from "utils/map-currency-to-sign"
import type { CommerceProduct } from "types"
import { StarIcon } from "components/icons/star-icon"

interface ProductCardProps extends Pick<CommerceProduct, "variants" | "handle" | "images" | "title" | "featuredImage" | "minPrice" | "avgRating" | "totalReviews" | "vendor"> {
  priority?: boolean
  prefetch?: boolean
  className?: string
  href?: string
}

export const ProductCard = ({
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
  href = "",
}: ProductCardProps) => {
  const noOfVariants = variants?.length
  const path = href || `/product/${handle}`
  const linkAria = `Visit product: ${title}`
  const variantPrice = variants?.find(Boolean)?.price

  return (
    <Link className={cn("group flex h-full w-full flex-col overflow-hidden rounded-lg", className)} aria-label={linkAria} href={path} prefetch={prefetch}>
      <div className="relative aspect-square overflow-hidden">
        <Image
          priority={priority}
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          src={featuredImage?.url || "/default-product-image.svg"}
          alt={featuredImage?.altText || title}
          fill
        />
      </div>
      <div className="flex shrink-0 grow flex-col text-pretty bg-gradient-to-b from-transparent to-primary/5 p-4 ">
        {/* remove first word from the title as it includes vendor (this just needs feed update and then can be removed) */}
        <h3 className="line-clamp-2 text-xl font-semibold transition-colors">{title.split(" ").slice(1).join(" ")}</h3>
        <div className="flex flex-col">
          {!!vendor && <p className="text-sm text-gray-500">{vendor}</p>}
          <div className="flex flex-wrap items-center gap-1">
            {!!avgRating && !!totalReviews && (
              <>
                <div className="flex items-center space-x-1">
                  <StarIcon className="size-4 fill-gray-400 stroke-gray-500" />
                  <span className="text-sm">{avgRating.toFixed(2)}</span>
                  <span className="text-xs">
                    ({totalReviews} review{totalReviews !== 1 && "s"})
                  </span>
                </div>
                •
              </>
            )}
          </div>
        </div>

        {!!variantPrice && (
          <div className="mt-auto flex items-center justify-between gap-2 pt-4">
            {noOfVariants > 0 && (
              <p className="text-sm text-gray-500">
                {noOfVariants} variant{noOfVariants > 1 ? "s" : ""}
              </p>
            )}
            <span className="rounded-md bg-primary px-3 py-1 text-sm text-white transition-colors duration-300 ease-out  hover:bg-primary/85">
              From {mapCurrencyToSign((variantPrice.currencyCode as CurrencyType) || "USD") + minPrice.toFixed(2)}
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
