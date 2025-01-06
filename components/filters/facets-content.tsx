"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryState } from "nuqs"
// import * as m from "motion/react-m"
import { AnimatePresence, motion, LazyMotion, domAnimation, LayoutGroup } from "motion/react"

import { useFilterTransitionStore } from "stores/filter-transition-store"
import { useFilterStore } from "stores/filters-store"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "components/ui/accordion"
import { HIERARCHICAL_ATRIBUTES, HIERARCHICAL_SEPARATOR } from "constants/index"
import { cn } from "utils/cn"

import { Facet } from "./facet"
import { CategoryFacet } from "./category-facet"
import { PriceFacet } from "./price-facet"
import { RatingFacet } from "./rating-facet"
import { CloseIcon } from "components/icons/close-icon"

interface FacetsContentProps {
  independentFacetDistribution: Record<string, Record<string, number>> | undefined
  facetDistribution: Record<string, Record<string, number>> | undefined
  className?: string
  disabledFacets?: string[]
}

export function FacetsContent({ independentFacetDistribution, facetDistribution, className, disabledFacets }: FacetsContentProps) {
  const router = useRouter()
  const pathname = usePathname()
  const isAiPath = pathname.startsWith("/ai/category")
  const { set: setFilterVisibilityStatus, status } = useFilterStore((s) => s)

  const collections: Record<string, Record<string, number>> = HIERARCHICAL_ATRIBUTES.reduce((acc, key) => {
    acc[key] = independentFacetDistribution?.[key] || {}
    return acc
  }, {})

  const vendors = independentFacetDistribution?.["vendor"]
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

  const allFilters = [selectedCategories, selectedVendors, selectedColors, minPrice, maxPrice, selectedRating]

  const filtersCount = allFilters.filter((v) => (Array.isArray(v) ? v.length !== 0 : !!v)).length

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

  const flattenedFilters = allFilters.flat()

  function filterElement(element: string) {
    if (selectedVendors.includes(element)) {
      setSelectedVendors(selectedVendors.filter((v) => v !== element))
    }
    if (selectedCategories.includes(element)) {
      setSelectedCategories(selectedCategories.filter((v) => v !== element))
    }
    if (selectedColors.includes(element)) {
      setSelectedColors(selectedColors.filter((v) => v !== element))
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

  // set state back to idle when pathname have changed
  useEffect(() => {
    setFilterVisibilityStatus("idle")
  }, [pathname, setFilterVisibilityStatus])

  return (
    <LazyMotion features={domAnimation}>
      <Accordion
        className={cn(status === "hidden" && "lg:animate-slideOutLeft", status === "visible" && "lg:animate-slideInLeft", className)}
        type="multiple"
        defaultValue={lastSelected}
      >
        {!!filtersCount && (
          <div className="flex flex-col gap-4">
            <div className="text-sm">
              <div className="flex max-h-[150px] flex-wrap gap-1 overflow-y-auto">
                <LayoutGroup>
                  <AnimatePresence initial={false}>
                    {flattenedFilters.map((el) => {
                      if (typeof el === "string") {
                        return (
                          // would be nice to use exit animations here, but that requires AnimatePresence, which makes bundle size bigger
                          <motion.div
                            key={el}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.08 } }}
                            transition={{ duration: 0.15, ease: "easeInOut" }}
                            className="duration-[200ms] flex cursor-pointer items-center gap-1 rounded-md border px-2 py-1 text-xs transition-colors ease-out hover:border-primary"
                            onClick={() => filterElement(el)}
                          >
                            <span>
                              <CloseIcon className="size-2" />
                            </span>
                            <span>{el}</span>
                          </motion.div>
                        )
                      }
                    })}
                  </AnimatePresence>
                </LayoutGroup>
              </div>
            </div>
            <div className="mt-4 inline-flex cursor-pointer text-[15px] text-black underline" onClick={() => resetAllFilters()}>
              Reset all filters {filtersCount}
            </div>
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

              if (pathname === "/search" || pathname === "/ai/search") {
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
              router.push(`${isAiPath ? "/ai/category" : "/category"}/${category.split(HIERARCHICAL_SEPARATOR).pop()}`)
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
              minPrice={minPrice}
              maxPrice={maxPrice}
              setFacet={({ minPrice, maxPrice }) => {
                setMinPrice(minPrice)
                setMaxPrice(maxPrice)
                setPage(1)
              }}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </LazyMotion>
  )
}
