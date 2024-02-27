import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import Image from "next/image"
import Link from "next/link"

interface ProductCardProps extends PlatformProduct {
  priority?: boolean
}

export function ProductCard(props: ProductCardProps) {
  return (
    <div className="group relative" key={props.id}>
      <div className="relative flex min-h-[320px] items-center justify-center bg-gray-100">
        <Image
          alt={props.featuredImage?.altText || ""}
          className="z-10 size-[250px] object-contain transition-transform group-hover:scale-105"
          height={250}
          src={props.images[0].url}
          sizes="280px"
          width={250}
          priority={props.priority}
        />
      </div>

      <Link className="absolute inset-0 z-10" href={`/products/${props.handle}`}>
        <span className="sr-only">View</span>
      </Link>

      <div className="mt-4 flex flex-col gap-0.5 text-slate-700">
        <div className="line-clamp-2 text-[19px]">{props.title}</div>
        {props.minPrice ? <p className="text-[23px]">${props.minPrice}</p> : null}
      </div>
    </div>
  )
}
