import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import Image from "next/image"
import Link from "next/link"
import { cn } from "utils/cn"
import { QuickAdd } from "./QuickAdd"

interface ProductCardProps extends PlatformProduct {
  priority?: boolean
  className?: string
}

export function ProductCard(props: ProductCardProps) {
  const variant = props.variants?.find(Boolean)?.price
  const href = `/products/${props.handle}`
  const linkAria = `Visit product: ${props.title}`
  const featuredImageAltTag = props.images.find((singleImage) => singleImage.url === props.featuredImage?.url)?.altText || ""

  return (
    <div className={cn("group relative p-0 md:bg-transparent md:p-0", props.className)}>
      <div className="relative flex min-h-[100px] items-center justify-center md:min-h-[320px]">
        <Link aria-label={linkAria} href={href} className="relative z-10">
          <Image
            alt={featuredImageAltTag}
            className="size-[150px] select-none object-contain transition-transform group-hover:scale-105 md:size-[300px]"
            width={300}
            height={300}
            src={props.featuredImage?.url || "/default-product-image.svg"}
            sizes="300px"
            priority={props.priority}
          />
        </Link>

        <QuickAdd variants={props.variants} />
      </div>

      <Link aria-label={linkAria} href={href}>
        <div className="mt-4 flex flex-col gap-0.5 text-slate-700">
          <div className="line-clamp-2 text-[13px] tracking-tight md:text-[19px]">{props.title}</div>
          {variant ? <p className="text-[13px] font-bold tracking-tight text-black md:text-[23px] md:font-normal">{variant.amount + " " + variant.currencyCode}</p> : null}
        </div>
      </Link>
    </div>
  )
}
