"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "components/DropdownMenu/DropdownMenu"
import { ChevronIcon } from "components/Icons/ChevronIcon"
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
  const [sortBy, setSortBy] = useQueryState("sortBy", {
    ...parseAsStringEnum<Sorting>(Object.values(Sorting)).withDefault(Sorting.RELEVANCY),
    shallow: false,
    history: "push",
  })

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger aria-expanded={undefined} asChild>
          <div className="flex cursor-pointer flex-wrap items-center justify-center gap-0.5 text-[15px] text-black">
            Sort by: <span className="ml-0.5 text-slate-700 underline">{LABELS[sortBy]}</span>
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
