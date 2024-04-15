"use client"

import { Placeholder } from "components/GenericModal/GenericModal"
import { FiltersIcon } from "components/Icons/FiltersIcon"
import { CategoriesDistribution } from "meilisearch"
import dynamic from "next/dynamic"
import { useModalStore } from "stores/modalStore"

const FacetsContent = dynamic(() => import("views/Listing/FacetsContent").then((m) => m.FacetsContent))
const GenericModal = dynamic(() => import("components/GenericModal/GenericModal").then((m) => m.GenericModal), { loading: Placeholder })

interface FacetsMobileProps {
  className?: string
  facetDistribution: Record<string, CategoriesDistribution> | undefined
  disabledFacets?: string[]
}

export function FacetsMobile({ className, facetDistribution, disabledFacets }: FacetsMobileProps) {
  const { modals, openModal, closeModal } = useModalStore()

  return (
    <div className={className}>
      <div onClick={() => openModal("facets-mobile")}>
        <FiltersIcon className="size-5" />
      </div>
      {!!modals["facets-mobile"] && (
        <GenericModal className="h-full overflow-auto" title="Filters" open={!!modals["facets-mobile"]} onOpenChange={() => closeModal("facets-mobile")}>
          <FacetsContent facetDistribution={facetDistribution} disabledFacets={disabledFacets} />
        </GenericModal>
      )}
    </div>
  )
}
