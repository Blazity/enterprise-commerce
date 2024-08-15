import { HIERARCHICAL_ATRIBUTES } from "constants/index"
import type { CategoriesDistribution } from "meilisearch"
import { usePathname } from "next/navigation"
import { cn } from "utils/cn"
import { slugToName } from "utils/slug-name"
import { type HierarchicalMenuItem, useHierarchicalMenu } from "utils/useHierarchicalMenu"

interface CategoryFacetProps {
  title: string
  distribution: Record<string, CategoriesDistribution>
  isChecked: (value: string) => boolean
  onCheckedChange: (checked: boolean, value: string) => void
  onBackClick: (currentCategory: string | null, parentSlug: string | null) => void
}

export function CategoryFacet({ distribution, isChecked, onCheckedChange }: CategoryFacetProps) {
  const pathname = usePathname()
  const isSRP = pathname === "/search"

  const { items } = useHierarchicalMenu({
    attributes: HIERARCHICAL_ATRIBUTES,
    distribution,
    transformItems: (items) => (isSRP ? items : items.filter((item) => item.isRefined)),
  })

  function handleClick(value: string) {
    onCheckedChange(!isChecked(value), value)
  }

  return (
    <div className="tracking-[-0.44px]">
      <div className="grid gap-6">
        <CategoryTree items={items} level={0} onClick={handleClick} isChecked={isChecked} />
      </div>
      {items.length === 0 && <p className="text-sm/3 text-neutral-500">No categories found</p>}
      <hr className="my-6 border-neutral-400" />
    </div>
  )
}

interface CategoryTreeProps {
  items: HierarchicalMenuItem[]
  level: number
  onClick: (value: string) => void
  isChecked: (value: string) => boolean
}

const CategoryTree = ({ items, level, onClick, isChecked }: CategoryTreeProps) => {
  return (
    <>
      {items.map(({ value, count, isRefined, data }) => (
        <div key={value} className="flex flex-col gap-4">
          <button className={cn("flex items-center bg-transparent text-sm/3", isRefined ? "font-bold" : "")} onClick={() => onClick(value)}>
            {slugToName(value)} ({count})
          </button>
          {data && data.length > 0 && (
            <div className={`ml-${level * 4} flex flex-col gap-4`}>
              <CategoryTree items={data} level={level + 1} onClick={onClick} isChecked={isChecked} />
            </div>
          )}
        </div>
      ))}
    </>
  )
}
