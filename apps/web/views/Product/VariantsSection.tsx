import { PlatformVariant } from "@enterprise-commerce/core/platform/types"
import Link from "next/link"
import { cn } from "utils/cn"
import { Combination, createOptionfulUrl, getAllCombinations } from "utils/productOptionsUtils"

interface VariantsSectionProps {
  variants: PlatformVariant[]
  className?: string
  combination: Combination | undefined
  handle: string
}

export function VariantsSection({ variants, className, handle, combination }: VariantsSectionProps) {
  const combinations = getAllCombinations(variants)

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <p className="text-sm text-neutral-500">Select variant</p>
      <div className="relative flex w-full flex-wrap gap-2">
        {combinations.map((singleCombination) => (
          <Link
            href={createOptionfulUrl(handle, singleCombination.size, singleCombination.color)}
            key={singleCombination.id}
            prefetch={false}
            scroll={false}
            className={cn(
              "relative flex h-[40px] min-w-[80px] cursor-pointer items-center justify-center border border-black bg-white p-1.5 text-[11px] uppercase transition-colors hover:bg-neutral-800 hover:text-white",
              { "bg-neutral-800 text-white": singleCombination.id === combination?.id },
              { "stroke-black opacity-80 hover:bg-transparent hover:text-black": !singleCombination.availableForSale }
            )}
          >
            {singleCombination.title}
            {singleCombination.availableForSale ? null : (
              <svg className={"absolute inset-0 block size-full"}>
                <line x1="0" y1="100%" x2="100%" y2="0"></line>
              </svg>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
