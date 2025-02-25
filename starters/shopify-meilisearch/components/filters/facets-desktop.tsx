import { Skeleton } from "components/ui/skeleton"
import type { CategoriesDistribution } from "meilisearch"
import { FacetsContent } from "components/filters/facets-content"

interface FacetsDesktopProps {
  independentFacetDistribution: Record<string, CategoriesDistribution> | undefined
  facetDistribution: Record<string, CategoriesDistribution> | undefined
  className?: string
  disabledFacets?: string[]
}

export function FacetsDesktop({ independentFacetDistribution, facetDistribution, className, disabledFacets }: FacetsDesktopProps) {
  return <FacetsContent independentFacetDistribution={independentFacetDistribution} facetDistribution={facetDistribution} className={className} disabledFacets={disabledFacets} />
}

export function FacetsContentSkeleton() {
  return (
    <div className="my-8 hidden flex-col gap-0 md:flex">
      <Skeleton className="h-[517px] min-w-[300px] md:block" />
      <Skeleton className="mb-[50px] mt-[72px] h-[394px] min-w-[300px] md:block" />
      <Skeleton className="mb-6 flex h-[35px] min-w-[300px] md:block" />
      <Skeleton className="flex h-[400px] min-w-[300px] md:block" />
    </div>
  )
}
