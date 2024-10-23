"use client"

import { Button } from "components/ui/button"
import { FiltersIcon } from "components/icons/filters-icon"
import { useFilterStore } from "stores/filters-store"

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
      className="hidden items-center gap-2 bg-transparent text-base font-normal text-black transition-colors lg:flex"
    >
      <span>{status === "hidden" ? "Show" : "Hide"} filters</span>
      <FiltersIcon />
    </Button>
  )
}
