"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryState } from "nuqs"
import { AnimatePresence, motion } from "motion/react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "components/ui/accordion"
import { HIERARCHICAL_ATRIBUTES, HIERARCHICAL_SEPARATOR } from "constants/index"
import { cn } from "utils/cn"

import { Facet } from "./facet"
import { CategoryFacet } from "./category-facet"
import { PriceFacet } from "./price-facet"
import { RatingFacet } from "./rating-facet"
import { CloseIcon } from "components/icons/close-icon"

import { slugToName } from "utils/slug-name"
import FadeOutMask from "components/fade-out-mask"

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
  const [showFilterTags, setShowFilterTags] = useState(true)

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
  const [selectedColors, setSelectedColors] = useQueryState("colors", { ...parseAsArrayOf(parseAsString), defaultValue: [], shallow: false, history: "push", clearOnDefault: true })

  const [_, setPage] = useQueryState("page", { ...parseAsInteger, defaultValue: 1, shallow: false, history: "push", clearOnDefault: true })

  const [minPrice, setMinPrice] = useQueryState("minPrice", { ...parseAsInteger, shallow: false, defaultValue: 0, clearOnDefault: true })
  const [maxPrice, setMaxPrice] = useQueryState("maxPrice", { ...parseAsInteger, shallow: false, defaultValue: 0, clearOnDefault: true })

  const allFilters = [selectedCategories, selectedVendors, selectedColors, minPrice, maxPrice, selectedRating]
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
        break // Exit once we've found and removed the element
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
    <Accordion className={cn(className)} type="single" collapsible>
      <div className="mb-2 flex flex-col border-b border-black/5">
        <div>
          <div className="flex items-baseline justify-between pb-1 tracking-tight">
            <p className="text-sm font-medium">{filtersCount === 0 ? "No filters selected" : `Active filters (${filtersCount})`}</p>
            <AnimatePresence>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: filtersActive ? 1 : 0, visibility: filtersActive ? "visible" : "hidden" }}
                exit={{ opacity: 0, transition: { duration: 0.1, visibility: { delay: 0.1 } } }}
                transition={{ duration: 0.2, visibility: { delay: filtersActive ? 0 : 0.2 } }}
                className="duration-[200ms] rounded-md bg-transparent px-1.5 py-0.5 text-xs transition-colors hover:bg-gray-50"
                onClick={() => setShowFilterTags(!showFilterTags)}
              >
                {showFilterTags ? "Hide" : "Show"}
              </motion.button>
            </AnimatePresence>
          </div>
          <motion.div initial={{ height: 0 }} animate={{ height: showFilterTags && filtersActive ? 140 : 0 }} className={cn("relative h-full max-h-[140px] overflow-clip")}>
            <FadeOutMask />
            <div className={cn("flex h-full flex-wrap content-start items-start justify-start gap-1 overflow-y-auto rounded-md bg-gray-50 p-2")}>
              <AnimatePresence>
                {flattenedFilters.map((el) => {
                  if (typeof el === "string") {
                    const isCategory = el.includes(" > ")
                    const categoryName = el.split(" > ").pop()?.trim()
                    return (
                      // would be nice to use exit animations here, but that requires AnimatePresence, which makes bundle size bigger
                      <motion.div
                        key={el}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                        transition={{ duration: 0.15, ease: "easeInOut" }}
                        className="flex grow-0 cursor-pointer items-center gap-1 rounded-md border border-slate-300/60 bg-gray-100/20 py-1 pl-1.5 pr-2 text-xs transition-colors hover:border-slate-400/80 hover:bg-gray-100/70"
                        onClick={() => removeTag(el)}
                      >
                        <span className="rounded-full border border-gray-300 p-px">
                          <CloseIcon className="size-2" />
                        </span>
                        <span className="font-medium tracking-tight">{isCategory && categoryName ? slugToName(categoryName) : el}</span>
                      </motion.div>
                    )
                  }
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
        <AnimatePresence>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: filtersActive ? 1 : 0, visibility: filtersActive ? "visible" : "hidden" }}
            exit={{ opacity: 0, transition: { duration: 0.1, visibility: { delay: 0.1 } } }}
            transition={{ duration: 0.2, visibility: { delay: filtersActive ? 0 : 0.2 } }}
            className="mb-3 mt-3 inline-flex cursor-pointer bg-white text-xs text-black underline"
            onClick={() => resetAllFilters()}
          >
            Clear filters
          </motion.button>
        </AnimatePresence>
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
              setPage(1)
            }}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
