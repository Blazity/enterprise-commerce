import { Suspense } from "react"
import { Sorter } from "./sorter"
import { HideFilters } from "./hide-filters"

export const Controls = () => {
  return (
    <div className="flex items-center gap-6">
      {}
      <HideFilters />
      <Suspense>
        <Sorter className="hidden lg:block" />
      </Suspense>
    </div>
  )
}
