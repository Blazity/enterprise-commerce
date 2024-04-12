"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "components/Accordion/Accordion"
import { SearchIcon } from "components/Icons/SearchIcon"
import type { CategoriesDistribution } from "meilisearch"
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryState } from "nuqs"
import { Facet } from "./Facet"
import { CategoryFacet } from "./CategoryFacet"
import { useFilterTransitionStore } from "stores/filterTransitionStore"
import { PriceFacet } from "./PriceFacet"

interface FacetsContentProps {
  facetDistribution: Record<string, CategoriesDistribution> | undefined
  className?: string
  disabledFacets?: string[]
}

export function FacetsContent({ facetDistribution, className, disabledFacets }: FacetsContentProps) {
  const collections = facetDistribution?.["collections.title"]
  const tags = facetDistribution?.["tags"]
  const vendors = facetDistribution?.["vendor"]
  const sizes = facetDistribution?.["flatOptions.Size"]
  const colors = facetDistribution?.["flatOptions.Color"]

  const { set: setLastSelected, selected: lastSelected } = useFilterTransitionStore((s) => s)

  const [selectedCategories, setSelectedCategories] = useQueryState("categories", {
    ...parseAsArrayOf(parseAsString),
    defaultValue: [],
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
  const [selectedTags, setSelectedTags] = useQueryState("tags", { ...parseAsArrayOf(parseAsString), defaultValue: [], shallow: false, history: "push", clearOnDefault: true })
  const [selectedColors, setSelectedColors] = useQueryState("colors", { ...parseAsArrayOf(parseAsString), defaultValue: [], shallow: false, history: "push", clearOnDefault: true })
  const [selectedSizes, setSelectedSizes] = useQueryState("sizes", { ...parseAsArrayOf(parseAsString), defaultValue: [], shallow: false, history: "push", clearOnDefault: true })

  const [query, setQuery] = useQueryState("q", { shallow: false })
  const [_, setPage] = useQueryState("page", { ...parseAsInteger, defaultValue: 1, shallow: false, history: "push", clearOnDefault: true })

  const [minPrice, setMinPrice] = useQueryState("minPrice", { ...parseAsInteger, shallow: false, defaultValue: 0, clearOnDefault: true })
  const [maxPrice, setMaxPrice] = useQueryState("maxPrice", { ...parseAsInteger, shallow: false, defaultValue: 0, clearOnDefault: true })

  const filtersCount = [selectedCategories, selectedVendors, selectedTags, selectedColors, selectedSizes, minPrice, maxPrice].filter((v) =>
    Array.isArray(v) ? v.length !== 0 : !!v
  ).length

  function resetAllFilters() {
    setSelectedCategories(null)
    setSelectedVendors(null)
    setSelectedTags(null)
    setSelectedColors(null)
    setSelectedSizes(null)
    setMinPrice(null)
    setMaxPrice(null)
  }

  return (
    <div className={className}>
      {!disabledFacets?.includes("category") ? (
        <CategoryFacet
          title="categories"
          distribution={collections}
          isChecked={(category) => selectedCategories.includes(category)}
          onCheckedChange={(checked, category) => {
            setSelectedCategories((prev) => (checked ? [...prev, category] : prev.filter((cat) => cat !== category)))
            setPage(1)
          }}
        />
      ) : null}
      <div className={"relative mb-6 block overflow-hidden rounded-md"}>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
          <SearchIcon className="size-4 text-neutral-500" />
        </div>
        <input
          className="block w-full rounded-md border border-neutral-300 bg-neutral-100 px-2.5 py-1.5 pl-10 text-[14px] text-black focus:border-blue-500 focus:ring-blue-500"
          placeholder="Search..."
          type="search"
          value={query || ""}
          onChange={(event) => {
            setQuery(event.target.value)
            setPage(1)
          }}
        />
      </div>

      <Accordion collapsible className="w-full" type="single" defaultValue={lastSelected}>
        {!disabledFacets?.includes("tags") ? (
          <Facet
            id="tags"
            title="Tags"
            distribution={tags}
            isChecked={(tag) => selectedTags.includes(tag)}
            onCheckedChange={(checked, tag) => {
              setSelectedTags((prev) => (checked ? [...prev, tag] : prev.filter((cat) => cat !== tag)))
              setLastSelected("tags")
              setPage(1)
            }}
          />
        ) : null}

        {!disabledFacets?.includes("vendors") ? (
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
        ) : null}

        {!disabledFacets?.includes("sizes") ? (
          <Facet
            id="sizes"
            title="Sizes"
            distribution={sizes}
            isChecked={(size) => selectedSizes.includes(size)}
            onCheckedChange={(checked, size) => {
              setSelectedSizes((prev) => (checked ? [...prev, size] : prev.filter((cat) => cat !== size)))
              setLastSelected("sizes")
              setPage(1)
            }}
          />
        ) : null}

        {!disabledFacets?.includes("colors") ? (
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
        ) : null}

        <AccordionItem value="price">
          <AccordionTrigger className="text-base">Price Range</AccordionTrigger>
          <AccordionContent>
            <PriceFacet
              initMin={minPrice}
              initMax={maxPrice}
              setFacet={({ minPrice, maxPrice }) => {
                setMinPrice(minPrice)
                setMaxPrice(maxPrice)
                setPage(1)
                setLastSelected("price")
              }}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {!!filtersCount ? (
        <div className="mt-10 inline-flex cursor-pointer text-[15px] text-black underline" onClick={() => resetAllFilters()}>
          Reset all filters {filtersCount}
        </div>
      ) : null}
    </div>
  )
}
