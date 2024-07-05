import { ArrowIcon } from "components/Icons/ArrowIcon"
import { HIERARCHICAL_ATRIBUTES, HIERARCHICAL_SEPARATOR } from "constants/index"
import type { CategoriesDistribution } from "meilisearch"
import { usePathname } from "next/navigation"
import { cn } from "utils/cn"
import { slugToName } from "utils/slug-name"
import { useHierarchicalMenu } from "utils/useHierarchicalMenu"

interface CategoryFacetProps {
  title: string
  distribution: Record<string, CategoriesDistribution>
  isChecked: (value: string) => boolean
  onCheckedChange: (checked: boolean, value: string) => void
  onBackClick: (currentCategory: string | null, parentSlug: string | null) => void
}

export function CategoryFacet({ distribution, isChecked, onCheckedChange, onBackClick }: CategoryFacetProps) {
  const { items, current } = useHierarchicalMenu({
    attributes: HIERARCHICAL_ATRIBUTES,
    distribution: distribution,
    separator: HIERARCHICAL_SEPARATOR,
  })

  const distributionsEntries = Object.entries(items || {})

  function handleClick(value: string) {
    onCheckedChange(!isChecked(value), value)
  }

  return (
    <div className="tracking-[-0.44px]">
      <BackButton distribution={distribution} onBackClick={onBackClick} />
      {!!current && <h2 className="mb-4 text-base/5 font-bold">{slugToName(current)}</h2>}
      <div className="grid gap-6">
        {distributionsEntries.map(([value, count], index) => (
          <button key={index + value} className={cn("flex items-center gap-2 bg-transparent text-sm/3 ")} onClick={() => handleClick(value)}>
            {slugToName(value)} ({count})
          </button>
        ))}
      </div>
      {distributionsEntries.length === 0 && !current && <p className="text-sm/3 text-neutral-500">No categories found</p>}
      <hr className="my-6 border-neutral-400" />
    </div>
  )
}

const BackButton = ({ distribution, onBackClick }: { distribution: CategoryFacetProps["distribution"]; onBackClick: CategoryFacetProps["onBackClick"] }) => {
  const pathname = usePathname()
  const { parent, current } = useHierarchicalMenu({
    attributes: HIERARCHICAL_ATRIBUTES,
    distribution: distribution,
    separator: HIERARCHICAL_SEPARATOR,
  })

  const parentCategory = {
    label: !!parent ? slugToName(parent) : null,
    value: parent || null,
  }
  const currentCategory = {
    label: !!current ? slugToName(current) : null,
    value: current || null,
  }

  if (pathname === "/search") {
    return (
      <>
        {!parentCategory.value && !currentCategory.value ? (
          <span className="mb-6 mt-2 flex items-center gap-2 bg-transparent text-base font-semibold">All Categories:</span>
        ) : (
          <button className="mb-6 mt-2 flex items-center gap-2 bg-transparent text-sm" onClick={() => onBackClick(currentCategory.value, parentCategory.value)}>
            {(parentCategory.value || currentCategory.label) && <ArrowIcon className="size-4" />}
            {parentCategory.label || "All Categories:"}
          </button>
        )}
      </>
    )
  }

  return (
    parentCategory.value && (
      <button className="mb-6 mt-2 flex items-center gap-2 bg-transparent text-sm" onClick={() => onBackClick(currentCategory.value, parentCategory.value)}>
        {parentCategory.value && <ArrowIcon className="size-4" />}
        {parentCategory.label || "All Categories:"}
      </button>
    )
  )
}
