"use client"

import { Button } from "components/Button/ButtonNew"
import { FiltersIcon } from "components/Icons/FiltersIcon"
import { useFilterStore } from "stores/filtersStore"

export const HideFilters = () => {
  const { set, status } = useFilterStore((s) => s)

  return (
    <Button
      onClick={() => {
        if (status === "hidden") {
          set("visible")
          return
        }

        set("hidden")
      }}
      className="hidden items-center gap-2 bg-transparent text-base font-thin text-black transition-colors lg:flex"
    >
      <span>{status === "hidden" ? "Show" : "Hide"} filters</span>
      <FiltersIcon />
    </Button>
  )
}
