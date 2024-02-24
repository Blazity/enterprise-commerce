"use client"

import { Button } from "components/Button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "components/DropdownMenu"
import { parseAsStringEnum, useQueryState } from "nuqs"

export enum Sorting {
  PRICE_DESC = "minPrice:desc",
  PRICE_ASC = "minPrice:asc",
  DATE_ASC = "updatedAtTimestamp:asc",
  DATE_DESC = "updatedAtTimestamp:desc",
  RELEVANCY = "",
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
        <DropdownMenuTrigger asChild>
          <Button>Sort by {sortBy}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white" align="end">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={() => setSortBy(Sorting.RELEVANCY)}>
            Relevancy
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => setSortBy(Sorting.PRICE_ASC)}>
            Price: Low to High
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => setSortBy(Sorting.PRICE_DESC)}>
            Price: High to Low
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => setSortBy(Sorting.DATE_DESC)}>
            Oldest
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => setSortBy(Sorting.DATE_ASC)}>
            Newest
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
