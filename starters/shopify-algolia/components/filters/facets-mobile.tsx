"use client"

import { Button } from "components/ui/button-old"
import { Placeholder } from "components/generic-modal"
import { FiltersIcon } from "components/icons/filters-icon"
import dynamic from "next/dynamic"
import { useModalStore } from "stores/modal-store"

const FacetsContent = dynamic(() => import("components/filters/facets-content").then((m) => m.FacetsContent))
const GenericModal = dynamic(() => import("components/generic-modal").then((m) => m.GenericModal), { loading: Placeholder })

interface FacetsMobileProps {
  className?: string
  facetDistribution: Record<string, Record<string, number>> | undefined
  independentFacetDistribution: Record<string, Record<string, number>> | undefined
  disabledFacets?: string[]
}

export function FacetsMobile({ className, facetDistribution, disabledFacets, independentFacetDistribution }: FacetsMobileProps) {
  const { modals, openModal, closeModal } = useModalStore()

  return (
    <div className={className}>
      <Button className="px-1 py-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2" onClick={() => openModal("facets-mobile")}>
        <FiltersIcon className="size-4" />
        <span className="text-sm">Filters</span>
      </Button>
      {!!modals["facets-mobile"] && (
        <GenericModal className="h-full overflow-auto" title="Filters" open={!!modals["facets-mobile"]} onOpenChange={() => closeModal("facets-mobile")}>
          <FacetsContent independentFacetDistribution={independentFacetDistribution} facetDistribution={facetDistribution} disabledFacets={disabledFacets} />
        </GenericModal>
      )}
    </div>
  )
}
