import Image from "next/image"
import Link from "next/link"
import { cn } from "utils/cn"
import { type CurrencyType, mapCurrencyToSign } from "utils/map-currency-to-sign"
import { createMultiOptionSlug } from "utils/visual-variant-utils"
import type { CommerceProduct } from "types"

interface CompactProductCardProps
  extends Pick<CommerceProduct, "variants" | "handle" | "title" | "featuredImage" | "minPrice"> {
  className?: string
  priority?: boolean
  selectedVariant?: any
  variantOptions?: Record<string, string>
  loading?: "eager" | "lazy"
}

export const CompactProductCard = ({
  variants,
  handle,
  title,
  featuredImage,
  minPrice,
  className,
  priority = false,
  selectedVariant,
  variantOptions,
  loading = "lazy",
}: CompactProductCardProps) => {
  const variantPrice = selectedVariant?.price || variants?.find(Boolean)?.price

  let displayPrice = minPrice
  if (selectedVariant?.price?.amount) {
    displayPrice =
      typeof selectedVariant.price.amount === "number"
        ? selectedVariant.price.amount
        : parseFloat(selectedVariant.price.amount)
  }

  let href = `/product/${handle}`
  if (variantOptions && Object.keys(variantOptions).length > 0) {
    href = `/product/${createMultiOptionSlug(handle, variantOptions)}`
  }

  return (
    <Link
      href={href}
      className={cn(
        "group flex w-full flex-col overflow-hidden rounded-lg border border-border bg-background shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
        className
      )}
      aria-label={`View product: ${title}`}
    >
      <div className="relative aspect-square overflow-hidden bg-secondary/10">
        <Image
          src={featuredImage?.url || "/default-product-image.svg"}
          alt={featuredImage?.altText || title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-foreground">{title}</h3>

        {variantPrice && displayPrice !== null && displayPrice !== undefined && (
          <div className="mt-auto flex items-baseline justify-between">
            <span className="text-xs text-muted-foreground">From</span>
            <span className="text-base font-bold text-primary">
              {mapCurrencyToSign((variantPrice.currencyCode as CurrencyType) || "USD")}
              {typeof displayPrice === "number" ? displayPrice.toFixed(2) : displayPrice}
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
