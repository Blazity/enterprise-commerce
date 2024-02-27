"use client"

import { Placeholder } from "components/GenericModal"
import { FiltersIcon } from "components/Icons/FiltersIcon"
import { CategoriesDistribution } from "meilisearch"
import dynamic from "next/dynamic"
import { useState } from "react"

const FacetsContent = dynamic(() => import("views/Search/FacetsContent").then((m) => m.FacetsContent))
const GenericModal = dynamic(() => import("components/GenericModal").then((m) => m.GenericModal), { loading: Placeholder })

interface FacetsMobileProps {
  className?: string
  facetDistribution: Record<string, CategoriesDistribution> | undefined
}

export function FacetsMobile({ className, facetDistribution }: FacetsMobileProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={className}>
      <div onClick={() => setIsOpen(true)}>
        <FiltersIcon className="size-5" />
      </div>
      {isOpen && (
        <GenericModal className="h-full overflow-auto" title="Filters" open={isOpen} onOpenChange={() => setIsOpen(false)}>
          <FacetsContent facetDistribution={facetDistribution} />
        </GenericModal>
      )}
    </div>
  )
}
