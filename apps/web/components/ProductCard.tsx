import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import Image from "next/image"
import Link from "next/link"
import { cn } from "utils/cn"

interface ProductCardProps extends PlatformProduct {
  priority?: boolean
  className?: string
}

export function ProductCard(props: ProductCardProps) {
  const variant = props.variants?.find(Boolean)?.price

  return (
    <div className={cn("group relative bg-neutral-100 p-4 md:bg-transparent md:p-0", props.className)}>
      <div className="relative flex min-h-[100px] items-center justify-center bg-neutral-100 md:min-h-[320px]">
        <Image
          alt={props.featuredImage?.altText || ""}
          className="size-[150px] object-contain transition-transform group-hover:scale-105 md:size-[250px]"
          height={150}
          src={props.featuredImage?.url || "/default-product-image.svg"}
          sizes="150px"
          width={150}
          priority={props.priority}
        />
      </div>

      <Link className="absolute inset-0 z-10" href={`/products/${props.handle}`}>
        <span className="sr-only">View</span>
      </Link>

      <div className="mt-4 flex flex-col gap-0.5 text-slate-700">
        <div className="line-clamp-2 text-[13px] tracking-tight md:text-[19px]">{props.title}</div>
        {variant ? <p className="text-[13px] font-bold tracking-tight text-black md:text-[23px] md:font-normal">{variant.amount + " " + variant.currencyCode}</p> : null}
      </div>
    </div>
  )
}
