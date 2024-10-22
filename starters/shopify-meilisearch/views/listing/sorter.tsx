"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "components/ui/dropdown-menu"
import { ChevronIcon } from "components/icons/chevron-icon"
import { parseAsStringEnum, useQueryState } from "nuqs"

export enum Sorting {
  PRICE_DESC = "minPrice:desc",
  PRICE_ASC = "minPrice:asc",
  DATE_ASC = "updatedAtTimestamp:asc",
  DATE_DESC = "updatedAtTimestamp:desc",
  RELEVANCY = "",
  RATING = "avgRating:desc",
}

const LABELS = {
  [Sorting.PRICE_DESC]: "Price: High to Low",
  [Sorting.PRICE_ASC]: "Price: Low to High",
  [Sorting.RATING]: "Customer Reviews",
  [Sorting.DATE_ASC]: "Newest",
  [Sorting.DATE_DESC]: "Oldest",
  [Sorting.RELEVANCY]: "Relevancy",
}

interface SorterProps {
  className?: string
}

export function Sorter({ className }: SorterProps) {
  const [_, setSortBy] = useQueryState("sortBy", {
    ...parseAsStringEnum<Sorting>(Object.values(Sorting)).withDefault(Sorting.RELEVANCY),
    shallow: false,
    history: "push",
  })

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex cursor-pointer flex-wrap items-center justify-center gap-2 font-normal text-black [&[data-state=open]>svg]:rotate-180">
            <span>Sort by</span>
            <ChevronIcon />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[240px] rounded-b-md bg-white px-0 text-neutral-500 shadow-lg" align="end">
          {Object.entries(LABELS).map(([key, label]) => (
            <DropdownMenuItem
              key={label}
              className="cursor-pointer border-b border-neutral-200 py-2 last:border-b-0 hover:bg-neutral-50 focus:bg-neutral-50 active:bg-neutral-50"
              onClick={() => setSortBy(key as Sorting)}
            >
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
