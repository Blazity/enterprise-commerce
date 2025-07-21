import Image from "next/image"
import Link from "next/link"
import { cn } from "utils/cn"
import { type CurrencyType, mapCurrencyToSign } from "utils/map-currency-to-sign"
import type { CommerceProduct } from "types"

interface MiniProductCardProps
  extends Pick<CommerceProduct, "variants" | "handle" | "images" | "title" | "featuredImage" | "minPrice" | "vendor"> {
  priority?: boolean
  prefetch?: boolean
  className?: string
  loading?: "eager" | "lazy"
}

export const MiniProductCard = ({
  variants,
  handle,
  title,
  featuredImage,
  minPrice,
  className,
  priority,
  vendor,
  prefetch = false,
  loading = "lazy",
}: MiniProductCardProps) => {
  const variantPrice = variants?.find(Boolean)?.price
  const currencySymbol = variantPrice ? mapCurrencyToSign((variantPrice.currencyCode as CurrencyType) || "USD") : "$"

  return (
    <Link
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-lg border border-border/50 bg-background transition-all duration-300 hover:border-border hover:shadow-sm",
        className
      )}
      href={`/product/${handle}`}
      prefetch={prefetch}
    >
      {}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary/5">
        <Image
          priority={priority}
          loading={loading}
          src={featuredImage?.url || "/default-product-image.svg"}
          alt={featuredImage?.altText || title}
          fill
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, 180px"
        />
      </div>

      {}
      <div className="flex flex-1 flex-col p-2">
        <h3 className="line-clamp-1 text-xs font-semibold">{title}</h3>

        {vendor && <p className="line-clamp-1 text-[10px] text-muted-foreground">{vendor}</p>}

        <div className="mt-auto pt-1">
          {minPrice && (
            <p className="text-xs font-bold">
              {currencySymbol}
              {minPrice.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
