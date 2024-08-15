import { Suspense } from "react"
import { FacetsMobile } from "./FacetsMobile"
import { Sorter } from "./Sorter"
import { CategoriesDistribution } from "meilisearch"

type ControlsProps = {
  independentFacetDistribution: Record<string, CategoriesDistribution>
  facetDistribution: Record<string, CategoriesDistribution>
  totalHits: number
  disabledFacets?: string[]
}

export const Controls = ({ disabledFacets, facetDistribution, totalHits, independentFacetDistribution }: ControlsProps) => {
  return (
    <div className="flex items-center justify-between pb-8">
      <FacetsMobile disabledFacets={disabledFacets} independentFacetDistribution={independentFacetDistribution} facetDistribution={facetDistribution} className="lg:hidden" />
      {/*  has to be wrapped w. suspense, nuqs is using useSearchParams in useQueryState
       * https://github.com/47ng/nuqs/issues/496
       */}
      <div>
        <span className="text-sm text-gray-500">{totalHits} results found</span>
      </div>
      <Suspense>
        <Sorter className="hidden lg:block" />
      </Suspense>
    </div>
  )
}
