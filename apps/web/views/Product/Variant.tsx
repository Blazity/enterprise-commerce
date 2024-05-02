import type { PlatformCartItem } from "@enterprise-commerce/core/platform/types"
import Link from "next/link"
import { cn } from "utils/cn"
import type { Combination } from "utils/productOptionsUtils"

type VariantProps = {
  singleCombination: Combination | undefined
  isActive: boolean
  href: string
  cartItem: PlatformCartItem | undefined
}

export function Variant({ singleCombination, isActive, href, cartItem }: VariantProps) {
  const quantityAvailable = singleCombination?.quantityAvailable ?? 0
  const quantityInCart = cartItem?.quantity ?? 0

  const availableForSale = singleCombination?.availableForSale && quantityAvailable > 0
  const isOutOfStock = quantityAvailable <= quantityInCart || !availableForSale

  return (
    <Link
      href={href}
      prefetch={false}
      scroll={false}
      className={cn(
        "relative flex h-[40px] min-w-[80px] cursor-pointer items-center justify-center border border-black bg-white p-1.5 text-[11px] uppercase transition-colors hover:bg-neutral-800 hover:text-white",
        { "bg-neutral-800 text-white": isActive },
        { "stroke-black opacity-80 hover:bg-transparent hover:text-black": isOutOfStock }
      )}
    >
      {singleCombination?.title}
      {isOutOfStock && (
        <svg className={"absolute inset-0 block size-full"}>
          <line x1="0" y1="100%" x2="100%" y2="0"></line>
        </svg>
      )}
    </Link>
  )
}
