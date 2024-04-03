import { PlatformVariant } from "@enterprise-commerce/core/platform/types"
import { getAllCombinations } from "utils/productOptionsUtils"
import QuickAddButton from "./QuickAddButton"

interface QuickAddProps {
  variants: PlatformVariant[]
}

const NO_OF_DISPLAYED_COMBINATIONS = 4

export function QuickAdd({ variants }: QuickAddProps) {
  const combinations = getAllCombinations(variants)

  const hasOnlyOneCombination = combinations?.length === 1
  const combinationsMarkup = combinations?.map((combination) => <QuickAddButton key={combination.id} combination={combination} />).slice(0, NO_OF_DISPLAYED_COMBINATIONS)

  return (
    <div className="absolute inset-x-0 bottom-0 z-50 hidden h-0 w-full overflow-hidden bg-white transition-all group-hover:h-[90px] group-hover:border-t group-hover:border-black lg:block">
      <div className="p-2">
        <p className="mb-2 text-center text-[14px] font-bold uppercase tracking-wide">Quick add</p>
        <div className="flex justify-center gap-1">
          {hasOnlyOneCombination ? <QuickAddButton className="w-[100px]" combination={combinations.find(Boolean)} label="Add to cart" /> : combinationsMarkup}
        </div>
      </div>
    </div>
  )
}
