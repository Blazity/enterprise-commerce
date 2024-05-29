import { cn } from "utils/cn"
import { slugToName } from "utils/slug-name"

interface CategoryFacetProps {
  title: string
  distribution: Record<string, number> | undefined
  isChecked: (value: string) => boolean
  onCheckedChange: (checked: boolean, value: string) => void
}

export function CategoryFacet({ distribution, isChecked, onCheckedChange }: CategoryFacetProps) {
  const distributionsEntries = Object.entries(distribution || {})
  const hasNoResults = distributionsEntries.length === 0

  function handleClick(value: string) {
    onCheckedChange(!isChecked(value), value)
  }

  return (
    <div className="mb-[50px] mt-[72px] tracking-[-0.44px]">
      {hasNoResults ? null : (
        <div className="grid gap-[24px]">
          {distributionsEntries.map(([value, count], index) => (
            <button
              key={index + value}
              className={cn("flex items-center gap-2 bg-transparent text-[18px]/[18px] font-normal", isChecked(value) && "font-bold")}
              onClick={() => handleClick(value)}
            >
              {slugToName(value)} ({count})
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
