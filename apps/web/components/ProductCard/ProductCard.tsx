import type { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import Image from "next/image"
import Link from "next/link"
import { cn } from "utils/cn"
import { QuickAdd } from "./QuickAdd"
import { type CurrencyType, mapCurrencyToSign } from "utils/mapCurrencyToSign"

interface ProductCardProps extends Pick<PlatformProduct, "variants" | "handle" | "images" | "title" | "featuredImage" | "minPrice"> {
  priority?: boolean
  className?: string
}

export function ProductCard(props: ProductCardProps) {
  const variant = props.variants?.find(Boolean)?.price
  const href = `/products/${props.handle}`
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

        <QuickAdd product={props as PlatformProduct} variants={props.variants} />
      </div>
      <Link aria-label={linkAria} href={href}>
        <div className="mt-4 flex flex-col gap-0.5 text-slate-700">
          <div className="line-clamp-2 text-base tracking-tight md:text-xl">{props.title}</div>
          {!!variant && !!props.minPrice && (
            <p className="text-base font-semibold tracking-tight text-black md:text-lg">
              From {props.minPrice.toFixed(2) + mapCurrencyToSign(variant.currencyCode as CurrencyType)}
            </p>
          )}
        </div>
      </Link>
    </div>
  )
}
