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
  highlighted?: boolean
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
  highlighted = false,
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
          src={featuredImage?.url || "/default-product-image.svg"}
          alt={featuredImage?.altText || title}
          fill
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="bg-size-200 bg-pos-0 hover:bg-pos-100 duration-[200ms] flex shrink-0 grow flex-col text-pretty bg-gradient-to-b from-transparent to-primary/5 p-4 transition-all">
        {/* remove first word from the title as it includes vendor (this just needs feed update and then can be removed) */}
        <h3 className={cn("line-clamp-2 text-lg font-semibold transition-colors data-[featured]:text-2xl", highlighted && "md:text-2xl")}>{title.split(" ").slice(1).join(" ")}</h3>
        <div className="flex flex-col pt-1">
          {!!vendor && <p className={cn("text-sm text-gray-500", highlighted && "md:text-base")}>{vendor}</p>}

          <div className="flex flex-wrap items-center gap-1">
            {!!avgRating && !!totalReviews && (
              <>
                <div className="flex items-center space-x-1">
                  <StarIcon className="size-3.5 fill-gray-800/95 stroke-gray-800/95" />

                  <div className="flex items-center gap-0.5 text-sm font-medium">
                    <div>{avgRating.toFixed(2)}</div>
                    <span className="text-xs text-gray-500">
                      ({totalReviews} review{totalReviews !== 1 && "s"})
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {!!variantPrice && !!minPrice && (
          <div className="mt-auto flex flex-col pt-10">
            {noOfVariants > 0 && (
              <p className={cn("text-sm text-gray-500", highlighted && "md:text-base")}>
                {noOfVariants} variant{noOfVariants > 1 ? "s" : ""}
              </p>
            )}
            <div className={cn("flex w-full items-baseline justify-between text-sm", highlighted && "md:text-base")}>
              <span className="text-primary/50">From</span>
              <span className={cn("text-base font-semibold md:text-lg", highlighted && "md:text-2xl")}>
                {mapCurrencyToSign((variantPrice.currencyCode as CurrencyType) || "USD") + minPrice.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
