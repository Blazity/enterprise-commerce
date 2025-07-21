"use client"

import { Button } from "components/ui/button-old"
import { Placeholder } from "components/generic-modal"
import dynamic from "next/dynamic"
import { useModalStore } from "stores/modal-store"

const FacetsContent = dynamic(() => import("components/filters/facets-content").then((m) => m.FacetsContent))
const GenericModal = dynamic(() => import("components/generic-modal").then((m) => m.GenericModal), {
  loading: Placeholder,
})

interface FacetsMobileProps {
  className?: string
  facetDistribution: Record<string, Record<string, number>> | undefined
  independentFacetDistribution: Record<string, Record<string, number>> | undefined
  disabledFacets?: string[]
  categoryDisplayTypes?: Record<string, "CLP" | "PLP">
}

export function FacetsMobile({
  className,
  facetDistribution,
  disabledFacets,
  independentFacetDistribution,
  categoryDisplayTypes,
}: FacetsMobileProps) {
  const modals = useModalStore((s) => s.modals)
  const openModal = useModalStore((s) => s.openModal)
  const closeModal = useModalStore((s) => s.closeModal)

  return (
    <div className={className}>
      <Button
        className="border-none bg-transparent px-2 py-1.5 text-sm font-medium hover:bg-gray-100 hover:text-inherit"
        onClick={() => openModal("facets-mobile")}
      >
        Filters
      </Button>

      {!!modals["facets-mobile"] && (
        <GenericModal
          className="h-full overflow-auto rounded-md"
          title="Filters"
          open={!!modals["facets-mobile"]}
          onOpenChange={() => closeModal("facets-mobile")}
        >
          <FacetsContent
            independentFacetDistribution={independentFacetDistribution}
            facetDistribution={facetDistribution}
            disabledFacets={disabledFacets}
            categoryDisplayTypes={categoryDisplayTypes}
          />
        </GenericModal>
      )}
    </div>
  )
}
