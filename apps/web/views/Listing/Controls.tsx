import { Suspense } from "react"
import { Sorter } from "./Sorter"
import { HideFilters } from "./HideFilters"

export const Controls = () => {
  return (
    <div className="flex items-center gap-6">
      {/*  has to be wrapped w. suspense, nuqs is using useSearchParams in useQueryState
       * https://github.com/47ng/nuqs/issues/496
       */}
      <HideFilters />
      <Suspense>
        <Sorter className="hidden lg:block" />
      </Suspense>
    </div>
  )
}
