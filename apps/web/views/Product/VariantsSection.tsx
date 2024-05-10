"use client"

import { PlatformVariant } from "@enterprise-commerce/core/platform/types"
import { cn } from "utils/cn"
import { Combination, createOptionfulUrl, getAllCombinations } from "utils/productOptionsUtils"
import { Variant } from "./Variant"
import { useCartStore } from "stores/cartStore"

interface VariantsSectionProps {
  variants: PlatformVariant[]
  className?: string
  combination: Combination | undefined
  handle: string
}

export function VariantsSection({ variants, className, handle, combination }: VariantsSectionProps) {
  const combinations = getAllCombinations(variants)
  const cart = useCartStore((s) => s.cart)

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <p className="text-sm text-neutral-500">Select variant</p>
      <div className="relative flex w-full flex-wrap gap-2">
        {combinations.map((singleCombination) => {
          const cartItem = cart?.items.find((item) => item.merchandise.id === singleCombination?.id)
          return (
            <Variant
              cartItem={cartItem}
              key={singleCombination.id}
              href={createOptionfulUrl(handle, singleCombination.size, singleCombination.color)}
              singleCombination={singleCombination}
              isActive={singleCombination.id === combination?.id}
            />
          )
        })}
      </div>
    </div>
  )
}
