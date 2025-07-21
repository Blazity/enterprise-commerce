"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryState } from "nuqs"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "components/ui/accordion"
import { HIERARCHICAL_ATRIBUTES, HIERARCHICAL_SEPARATOR } from "constants/index"
import { cn } from "utils/cn"

import { Facet } from "./facet"
import { CategoryFacet } from "./category-facet"
import { PriceFacet } from "./price-facet"
import { RatingFacet } from "./rating-facet"
import { VendorsFacet } from "./vendors-facet"
import { useFilterTransitionStore } from "stores/filter-transition-store"
import { ActiveFilters } from "./active-filters"

export interface FacetsContentProps {
  independentFacetDistribution: Record<string, Record<string, number>> | undefined
  facetDistribution: Record<string, Record<string, number>> | undefined
  className?: string
  disabledFacets?: string[]
  categoryDisplayTypes?: Record<string, "CLP" | "PLP">
}

export function FacetsContent({
  independentFacetDistribution,
  facetDistribution,
  className,
  disabledFacets,
  categoryDisplayTypes,
}: FacetsContentProps) {
  const router = useRouter()
  const pathname = usePathname()
  const isAiPath = pathname.startsWith("/ai")
  const [showFilterTags, setShowFilterTags] = useState(true)
  const setLastSelected = useFilterTransitionStore((s) => s.set)
  const lastSelected = useFilterTransitionStore((s) => s.selected)

  const collections: Record<string, Record<string, number>> = HIERARCHICAL_ATRIBUTES.reduce((acc, key) => {
    acc[key] = independentFacetDistribution?.[key] || {}
    return acc
  }, {})

  const vendors = independentFacetDistribution?.["vendor"]
  const colors = facetDistribution?.["flatOptions.Color"]

  const [selectedCategories, setSelectedCategories] = useQueryState("categories", {
    ...parseAsArrayOf(parseAsString),
    defaultValue: [],
    shallow: false,
    history: "push",
    clearOnDefault: true,
  })

  const [selectedRating, setSelectedRating] = useQueryState("rating", {
    ...parseAsInteger,
    defaultValue: 0,
    shallow: false,
    history: "push",
    clearOnDefault: true,
  })
  const [selectedVendors, setSelectedVendors] = useQueryState("vendors", {
    ...parseAsArrayOf(parseAsString),
    defaultValue: [],
    shallow: false,
    history: "push",
    clearOnDefault: true,
  })
  const [selectedColors, setSelectedColors] = useQueryState("colors", {
    ...parseAsArrayOf(parseAsString),
    defaultValue: [],
    shallow: false,
    history: "push",
    clearOnDefault: true,
  })

  const [page, setPage] = useQueryState("page", {
    ...parseAsInteger,
    defaultValue: 1,
    shallow: false,
    history: "push",
    clearOnDefault: true,
  })

  const [minPrice, setMinPrice] = useQueryState("minPrice", {
    ...parseAsInteger,
    shallow: false,
    defaultValue: 0,
    clearOnDefault: true,
  })
  const [maxPrice, setMaxPrice] = useQueryState("maxPrice", {
    ...parseAsInteger,
    shallow: false,
    defaultValue: 0,
    clearOnDefault: true,
  })

  const allFilters = [selectedVendors, selectedColors, minPrice, maxPrice, selectedRating]
  const flattenedFilters = allFilters.flat().filter((v) => typeof v === "string")
  const filtersCount = flattenedFilters.length
  const filtersActive = filtersCount > 0

  const roundedRatings = Object.entries(facetDistribution?.["avgRating"] || {}).reduce(
    (acc, [key, value]) => {
      const numKey = parseFloat(key)
      const roundedKey = Math.floor(numKey)

      for (let i = 1; i <= roundedKey; i++) {
        acc[i] = (acc[i] || 0) + value
      }

      return acc
    },
    {
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
    }
  )

  function removeTag(element: string) {
    const filterActions = {
      categories: [selectedCategories, setSelectedCategories],
      vendors: [selectedVendors, setSelectedVendors],
      colors: [selectedColors, setSelectedColors],
    } as const

    for (const [_, [selected, setter]] of Object.entries(filterActions)) {
      if (selected.includes(element)) {
        setter(selected.filter((v) => v !== element))
        setPage(1)
        break
      }
    }
  }

  function resetAllFilters() {
    setSelectedCategories(null)
    setSelectedVendors(null)
    setSelectedColors(null)
    setMinPrice(null)
    setMaxPrice(null)
    setSelectedRating(null)
    setPage(1)
  }

  return (
    <Accordion
      className={cn("overflow-x-hidden", className)}
      type="single"
      collapsible
      defaultValue={lastSelected || "categories"}
    >
      <div className="mb-2 flex flex-col border-b border-black/5">
        <ActiveFilters
          filtersCount={filtersCount}
          showFilterTags={showFilterTags}
          setShowFilterTags={setShowFilterTags}
          filtersActive={filtersActive}
          filters={flattenedFilters as string[]}
          page={page}
          removeTag={removeTag}
        />

        <button
          className="my-3 inline-flex cursor-pointer bg-white text-xs text-black underline underline-offset-2"
          onClick={() => resetAllFilters()}
        >
          Clear filters
        </button>
      </div>

      {!disabledFacets?.includes("categories") && (
        <CategoryFacet
          id="categories"
          title="Categories"
          distribution={collections}
          isChecked={(category) => {
            return selectedCategories.some((el) => el.split(HIERARCHICAL_SEPARATOR).includes(category))
          }}
          onCheckedChange={(category) => {
            setLastSelected("categories")

            const categoryHandle = category.split(HIERARCHICAL_SEPARATOR).pop()!
            const displayType = categoryDisplayTypes?.[categoryHandle] || "PLP"

            if (displayType === "CLP") {
              router.push(`${isAiPath ? "/ai/category/plp" : "/category/plp"}/${categoryHandle}`)
            } else {
              router.push(`${isAiPath ? "/ai/category" : "/category"}/${categoryHandle}`)
            }
          }}
          categoryDisplayTypes={categoryDisplayTypes}
        />
      )}
      {!disabledFacets?.includes("vendors") && (
        <VendorsFacet
          id="vendors"
          title="Vendors"
          distribution={vendors}
          isChecked={(vendor) => selectedVendors.includes(vendor)}
          onCheckedChange={(checked, vendor) => {
            setSelectedVendors((prev) => (checked ? [...prev, vendor] : prev.filter((cat) => cat !== vendor)))
            setLastSelected("vendors")
            setPage(1)
          }}
        />
      )}

      {!disabledFacets?.includes("colors") && (
        <Facet
          id="colors"
          title="Colors"
          distribution={colors}
          isChecked={(color) => selectedColors.includes(color)}
          onCheckedChange={(checked, color) => {
            setSelectedColors((prev) => (checked ? [...prev, color] : prev.filter((cat) => cat !== color)))
            setLastSelected("colors")
            setPage(1)
          }}
        />
      )}

      {!disabledFacets?.includes("avgRating") && (
        <RatingFacet
          id="avgRating"
          title="Rating"
          distribution={roundedRatings}
          isChecked={(rating) => selectedRating === parseInt(rating)}
          onCheckedChange={(checked, rating) => {
            setSelectedRating(checked ? parseInt(rating) : 0)
            setLastSelected("avgRating")
            setPage(1)
          }}
        />
      )}

      <AccordionItem value="price">
        <AccordionTrigger className="py-2 text-base">Price</AccordionTrigger>
        <AccordionContent className="py-2">
          <PriceFacet
            minPrice={minPrice}
            maxPrice={maxPrice}
            setFacet={({ minPrice, maxPrice }) => {
              setMinPrice(minPrice)
              setMaxPrice(maxPrice)
              setLastSelected("price")
              setPage(1)
            }}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
