"use client"

import { Button } from "components/Button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "components/DropdownMenu"
import { ChevronIcon } from "components/Icons/ChevronIcon"
import { parseAsStringEnum, useQueryState } from "nuqs"

export enum Sorting {
  PRICE_DESC = "minPrice:desc",
  PRICE_ASC = "minPrice:asc",
  DATE_ASC = "updatedAtTimestamp:asc",
  DATE_DESC = "updatedAtTimestamp:desc",
  RELEVANCY = "",
}

const LABELS = {
  [Sorting.PRICE_DESC]: "Price: High to Low",
  [Sorting.PRICE_ASC]: "Price: Low to High",
  [Sorting.DATE_ASC]: "Newest",
  [Sorting.DATE_DESC]: "Oldest",
  [Sorting.RELEVANCY]: "Relevancy",
}

interface SorterProps {
  className?: string
}

export function Sorter({ className }: SorterProps) {
  const [sortBy, setSortBy] = useQueryState("sortBy", {
    ...parseAsStringEnum<Sorting>(Object.values(Sorting)).withDefault(Sorting.DATE_DESC),
    shallow: false,
    history: "push",
  })

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger aria-expanded={undefined} asChild>
          <div className="inline-flex cursor-pointer items-center justify-center gap-1.5 text-[15px] text-black">
            Sort by <span className="text-slate-700 underline">{LABELS[sortBy]}</span>
            <ChevronIcon />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[240px] rounded-b-md bg-white px-0 text-gray-400 shadow-lg" align="end">
          {Object.entries(LABELS).map(([key, label]) => (
            <DropdownMenuItem key={label} className="cursor-pointer border-b border-gray-200 py-2 last:border-b-0 hover:bg-gray-50" onClick={() => setSortBy(key as Sorting)}>
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
