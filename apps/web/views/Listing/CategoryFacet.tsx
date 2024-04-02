import { cn } from "utils/cn"

interface CategoryFacetProps {
  title: string
  distribution: Record<string, number> | undefined
  isChecked: (value: string) => boolean
  onCheckedChange: (checked: boolean, value: string) => void
}

export function CategoryFacet({ title, distribution, isChecked, onCheckedChange }: CategoryFacetProps) {
  const distributionsEntries = Object.entries(distribution || {})
  const hasNoResults = distributionsEntries.length === 0

  function handleClick(value: string) {
    onCheckedChange(!isChecked(value), value)
  }

  return (
    <div className="my-[72px]">
      <h2 className="mb-9 text-[22px]/[18px] font-semibold capitalize underline">All {title}</h2>
      {hasNoResults ? (
        <p className="text-[14px] text-neutral-500">No {title.toLowerCase()} found</p>
      ) : (
        <div className="grid gap-9">
          {distributionsEntries.map(([value], index) => (
            <button key={index + value} className={cn("flex items-center gap-2 bg-transparent font-normal", isChecked(value) && "underline")} onClick={() => handleClick(value)}>
              {value}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
