import { usePathname } from "next/navigation"
import type { CategoriesDistribution } from "meilisearch"

import { AccordionContent, AccordionItem, AccordionTrigger } from "components/ui/accordion"

import { HIERARCHICAL_ATRIBUTES, HIERARCHICAL_SEPARATOR } from "constants/index"
import { cn } from "utils/cn"
import { slugToName } from "utils/slug-name"
import { type HierarchicalMenuItem, useHierarchicalMenu } from "utils/use-hierarchical-menu"

interface CategoryFacetProps {
  id: string
  title: string
  distribution: Record<string, CategoriesDistribution>
  isChecked: (value: string) => boolean
  onCheckedChange: (value: string) => void
}

export function CategoryFacet({ id, title, distribution, isChecked, onCheckedChange }: CategoryFacetProps) {
  const pathname = usePathname()
  const isSRP = pathname === "/search"

  const { items } = useHierarchicalMenu({
    attributes: HIERARCHICAL_ATRIBUTES,
    distribution,
    transformItems: (items) => (isSRP ? items : items.filter((item) => item.isRefined)),
  })

  function handleClick(value: string) {
    onCheckedChange(value)
  }

  return (
    <AccordionItem value={id}>
      <AccordionTrigger className="py-2 text-base">{title}</AccordionTrigger>
      <AccordionContent>
        {items.length === 0 ? (
          <p className="text-sm/3 text-neutral-500">No categories found</p>
        ) : (
          <CategoryTree className="my-4 space-y-8" items={items} parent={null} level={0} onClick={handleClick} isChecked={isChecked} />
        )}
      </AccordionContent>
    </AccordionItem>
  )
}

interface CategoryTreeProps {
  items: HierarchicalMenuItem[]
  level: number
  onClick: (value: string) => void
  isChecked: (value: string) => boolean
  className?: string
  parent: string[] | null
}

const CategoryTree = ({ items, level, onClick, isChecked, className, parent }: CategoryTreeProps) => {
  return (
    <ul className={className}>
      {items.map(({ value, isRefined, data }) => {
        const valueWithParent = parent ? [...parent, value].join(HIERARCHICAL_SEPARATOR) : value
        return (
          <li key={value} className={cn("flex flex-col gap-4")}>
            <button
              className={cn("flex items-center bg-transparent text-left text-sm/4", isRefined || isChecked(value) ? "font-normal text-black" : "font-thin text-gray-400")}
              onClick={() => onClick(valueWithParent)}
            >
              {slugToName(value)}
            </button>
            {data && data.length > 0 && (
              <CategoryTree
                className={cn("ml-2 flex flex-col gap-4", level > 0 && (isRefined || isChecked(value)) && "border-l border-orange-500 pl-2")}
                items={data}
                level={level + 1}
                onClick={onClick}
                isChecked={isChecked}
                parent={parent ? [...parent, value] : [value]}
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}
