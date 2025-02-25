"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryState } from "nuqs"
import type { CategoriesDistribution } from "meilisearch"

import { useFilterTransitionStore } from "stores/filter-transition-store"
import { useFilterStore } from "stores/filters-store"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "components/ui/accordion"
import { HIERARCHICAL_ATRIBUTES, HIERARCHICAL_SEPARATOR } from "constants/index"
import { cn } from "utils/cn"

import { Facet } from "./facet"
import { CategoryFacet } from "./category-facet"
import { PriceFacet } from "./price-facet"
import { RatingFacet } from "./rating-facet"

interface FacetsContentProps {
  independentFacetDistribution: Record<string, CategoriesDistribution> | undefined
  facetDistribution: Record<string, CategoriesDistribution> | undefined
  className?: string
  disabledFacets?: string[]
}

export function FacetsContent({ independentFacetDistribution, facetDistribution, className, disabledFacets }: FacetsContentProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { set: setFilterVisibilityStatus, status } = useFilterStore((s) => s)

  const collections: Record<string, CategoriesDistribution> = HIERARCHICAL_ATRIBUTES.reduce((acc, key) => {
    acc[key] = independentFacetDistribution?.[key] || {}
    return acc
  }, {})

  const vendors = facetDistribution?.["vendor"]
  const colors = facetDistribution?.["flatOptions.Color"]

  const { set: setLastSelected, selected: lastSelected } = useFilterTransitionStore((s) => s)

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
  const [selectedColors, setSelectedColors] = useQueryState("colors", { ...parseAsArrayOf(parseAsString), defaultValue: [], shallow: false, history: "push", clearOnDefault: true })

  const [_, setPage] = useQueryState("page", { ...parseAsInteger, defaultValue: 1, shallow: false, history: "push", clearOnDefault: true })

  const [minPrice, setMinPrice] = useQueryState("minPrice", { ...parseAsInteger, shallow: false, defaultValue: 0, clearOnDefault: true })
  const [maxPrice, setMaxPrice] = useQueryState("maxPrice", { ...parseAsInteger, shallow: false, defaultValue: 0, clearOnDefault: true })

  const filtersCount = [selectedCategories, selectedVendors, selectedColors, minPrice, maxPrice, selectedRating].filter((v) => (Array.isArray(v) ? v.length !== 0 : !!v)).length

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

  function resetAllFilters() {
    setSelectedCategories(null)
    setSelectedVendors(null)
    setSelectedColors(null)
    setMinPrice(null)
    setMaxPrice(null)
    setSelectedRating(null)
    setPage(1)
  }

  // set state back to idle when pathname have changed
  useEffect(() => {
    setFilterVisibilityStatus("idle")
  }, [pathname, setFilterVisibilityStatus])

  return (
    <>
      <Accordion
        className={cn(status === "hidden" && "lg:animate-slideOutLeft", status === "visible" && "lg:animate-slideInLeft", className)}
        type="multiple"
        defaultValue={lastSelected}
      >
        {!!filtersCount && (
          <div className="mt-10 inline-flex cursor-pointer text-[15px] text-black underline" onClick={() => resetAllFilters()}>
            Reset all filters {filtersCount}
          </div>
        )}
        {!disabledFacets?.includes("categories") && (
          <CategoryFacet
            id="categories"
            title="Categories"
            distribution={collections}
            isChecked={(category) => {
              return selectedCategories.some((el) => el.split(HIERARCHICAL_SEPARATOR).includes(category))
            }}
            onCheckedChange={(category) => {
              const checked = selectedCategories.includes(category)

              if (pathname === "/search") {
                setSelectedCategories((prev) => {
                  if (checked) {
                    return prev.filter((cat) => cat !== category)
                  } else {
                    // Remove any broader or narrower categories before adding the new one
                    const updatedCategories = prev.filter((cat) => !category.startsWith(cat) && !cat.startsWith(category))
                    return [...updatedCategories, category]
                  }
                })
                return
              }

              setLastSelected("categories")
              router.push(`/category/${category.split(HIERARCHICAL_SEPARATOR).pop()}`)
            }}
          />
        )}
        {!disabledFacets?.includes("vendors") && (
          <Facet
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
              setLastSelected("rating")
              setPage(1)
            }}
          />
        )}

        <AccordionItem value="price">
          <AccordionTrigger className="py-2 text-base">Price</AccordionTrigger>
          <AccordionContent className="px-2">
            <PriceFacet
              initMin={minPrice}
              initMax={maxPrice}
              setFacet={({ minPrice, maxPrice }) => {
                setMinPrice(minPrice)
                setMaxPrice(maxPrice)
                setPage(1)
              }}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}
