import Image from "next/image"
import Link from "next/link"
import { cn } from "utils/cn"
import { QuickAdd } from "./QuickAdd"
import { type CurrencyType, mapCurrencyToSign } from "utils/mapCurrencyToSign"
import type { CommerceProduct } from "types"
import { StarIcon } from "components/Icons/StarIcon"

interface ProductCardProps extends Pick<CommerceProduct, "variants" | "handle" | "images" | "title" | "featuredImage" | "minPrice" | "avgRating" | "totalReviews"> {
  priority?: boolean
  className?: string
}

export function ProductCard(props: ProductCardProps) {
  const variant = props.variants?.find(Boolean)?.price
  const href = `/product/${props.handle}`
  const linkAria = `Visit product: ${props.title}`
  const featuredImageAltTag = props.images?.find((singleImage) => singleImage.url === props.featuredImage?.url)?.altText || ""

  return (
    <div className={cn("group relative p-0 md:bg-transparent md:p-0", props.className)}>
      <div className="relative flex size-full min-h-[100px] items-center justify-center">
        <Link aria-label={linkAria} href={href} className="transform-[translateZ(0)] relative z-[2] size-[200px] overflow-hidden md:size-[300px]">
          <Image
            alt={featuredImageAltTag}
            className="z-0 select-none object-cover transition-transform group-hover:scale-105"
            fill
            src={props.featuredImage?.url || "/default-product-image.svg"}
            sizes="(max-width: 450px) 150px, 300px"
            priority={props.priority}
          />
        </Link>

        <QuickAdd product={props as CommerceProduct} variants={props.variants} />
      </div>
      <Link aria-label={linkAria} href={href}>
        <div className="mt-4 flex flex-col gap-0.5 text-slate-700">
          <div className="line-clamp-2 text-base tracking-tight md:text-xl">{props.title}</div>
          {!!props.avgRating && !!props.totalReviews && (
            <div className="flex items-center space-x-1">
              <StarIcon className="size-4 fill-yellow-400 stroke-yellow-500" />
              <span className="text-sm">{props.avgRating.toFixed(2)}</span>
              <span className="text-xs">
                ({props.totalReviews} review{props.totalReviews !== 1 && "s"})
              </span>
            </div>
          )}
          {!!variant && (
            <p className="text-base font-semibold tracking-tight text-black md:text-lg">
              From {props.minPrice.toFixed(2) + mapCurrencyToSign(variant.currencyCode as CurrencyType)}
            </p>
          )}
        </div>
      </Link>
    </div>
  )
}
