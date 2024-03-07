"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "components/Accordion"
import { SearchIcon } from "components/Icons/SearchIcon"
import { Input } from "components/Input"
import { Label } from "components/Label"
import type { CategoriesDistribution } from "meilisearch"
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryState } from "nuqs"
import { ChangeEvent } from "react"
import { Facet } from "./Facet"

interface FacetsContentProps {
  facetDistribution: Record<string, CategoriesDistribution> | undefined
  className?: string
}

export function FacetsContent({ facetDistribution, className }: FacetsContentProps) {
  const collections = facetDistribution?.["collections.title"]
  const tags = facetDistribution?.["tags"]
  const vendors = facetDistribution?.["vendor"]
  const sizes = facetDistribution?.["flatOptions.Size"]
  const colors = facetDistribution?.["flatOptions.Color"]

  const [selectedCategories, setSelectedCategories] = useQueryState("categories", { ...parseAsArrayOf(parseAsString), defaultValue: [], shallow: false, history: "push" })
  const [selectedVendors, setSelectedVendors] = useQueryState("vendors", { ...parseAsArrayOf(parseAsString), defaultValue: [], shallow: false, history: "push" })
  const [selectedTags, setSelectedTags] = useQueryState("tags", { ...parseAsArrayOf(parseAsString), defaultValue: [], shallow: false, history: "push" })
  const [selectedColors, setSelectedColors] = useQueryState("colors", { ...parseAsArrayOf(parseAsString), defaultValue: [], shallow: false, history: "push" })
  const [selectedSizes, setSelectedSizes] = useQueryState("sizes", { ...parseAsArrayOf(parseAsString), defaultValue: [], shallow: false, history: "push" })

  const [query, setQuery] = useQueryState("q", { shallow: false })
  const [_, setPage] = useQueryState("page", { ...parseAsInteger, defaultValue: 1, shallow: false, history: "push", clearOnDefault: true })

  const [minPrice, setMinPrice] = useQueryState("minPrice", { ...parseAsInteger, shallow: false })
  const [maxPrice, setMaxPrice] = useQueryState("maxPrice", { ...parseAsInteger, shallow: false })

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
      <div className={"relative mb-6 block overflow-hidden rounded-md"}>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
          <SearchIcon className="size-4 text-neutral-500" />
        </div>
        <input
          className="block w-full rounded-md border border-gray-300 bg-gray-100 px-2.5 py-1.5 pl-10 text-[14px] text-black focus:border-blue-500 focus:ring-blue-500"
          placeholder="Search..."
          type="search"
          value={query || ""}
          onChange={(event) => {
            setQuery(event.target.value)
            setPage(1)
          }}
        />
      </div>

      <Accordion collapsible className="w-full" type="single">
        <Facet
          id="category"
          title="Category"
          distribution={collections}
          isChecked={(category) => selectedCategories.includes(category)}
          onCheckedChange={(checked, category) => {
            setSelectedCategories((prev) => (checked ? [...prev, category] : prev.filter((cat) => cat !== category)))
            setPage(1)
          }}
        />

        <Facet
          id="tags"
          title="Tags"
          distribution={tags}
          isChecked={(tag) => selectedTags.includes(tag)}
          onCheckedChange={(checked, tag) => {
            setSelectedTags((prev) => (checked ? [...prev, tag] : prev.filter((cat) => cat !== tag)))
            setPage(1)
          }}
        />

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

        <Facet
          id="sizes"
          title="Sizes"
          distribution={sizes}
          isChecked={(size) => selectedSizes.includes(size)}
          onCheckedChange={(checked, size) => {
            setSelectedSizes((prev) => (checked ? [...prev, size] : prev.filter((cat) => cat !== size)))
            setPage(1)
          }}
        />

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

        <AccordionItem value="price">
          <AccordionTrigger className="text-base">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="flex justify-between gap-4">
              <PriceInput
                label="Min price"
                value={minPrice || undefined}
                onChange={(e) => {
                  setMinPrice(+e.target.value)
                  setPage(1)
                }}
              />

              <PriceInput
                label="Max price"
                value={maxPrice || undefined}
                onChange={(e) => {
                  setMaxPrice(+e.target.value)
                  setPage(1)
                }}
              />
            </div>
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

interface PriceInputProps {
  value: number | undefined
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  label: string
}

function PriceInput({ value, onChange, label }: PriceInputProps) {
  return (
    <Label className="flex w-full min-w-[90px] flex-col gap-2">
      Min price
      <Input
        placeholder="10.0"
        className="block h-auto w-full rounded-md border border-gray-300 bg-gray-100 px-2.5 py-1.5 text-[14px] text-black focus:border-blue-500 focus:ring-blue-500  "
        type="number"
        value={value}
        onChange={onChange}
      />
    </Label>
  )
}
