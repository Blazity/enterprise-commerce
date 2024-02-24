"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "components/Accordion"
import { Checkbox } from "components/Checkbox"
import { SearchIcon } from "components/Icons/SearchIcon"
import { Label } from "components/Label"
import type { CategoriesDistribution } from "meilisearch"
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryState } from "nuqs"

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

  return (
    <div className={className}>
      <div className={"relative mb-6 block overflow-hidden rounded-md"}>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
          <SearchIcon className="size-4 text-gray-400" />
        </div>
        <input
          className="block w-full rounded-md border border-gray-300 bg-gray-100 px-2.5 py-1.5 pl-10 text-[14px] text-black focus:border-blue-500 focus:ring-blue-500  "
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
        <AccordionItem value="category">
          <AccordionTrigger className="text-base">Category</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {Object.entries(collections || {}).map(([collection, noOfItems], index) => (
                <Label key={collection} className="flex items-center gap-2 font-normal">
                  <Checkbox
                    name={collection}
                    checked={selectedCategories?.includes(collection)}
                    onCheckedChange={(checked) => {
                      setSelectedCategories((prev) => (checked ? [...prev, collection] : prev.filter((cat) => cat !== collection)))
                      setPage(1)
                    }}
                  />
                  {collection}
                  {"\n                              "}({noOfItems as any} items)
                </Label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="tags">
          <AccordionTrigger className="text-base">Tags</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {Object.entries(tags || {}).map(([tag, noOfItems], index) => (
                <Label key={tag} className="flex items-center gap-2 font-normal">
                  <Checkbox
                    name={tag}
                    checked={selectedTags?.includes(tag)}
                    onCheckedChange={(checked) => {
                      setSelectedTags((prev) => (checked ? [...prev, tag] : prev.filter((cat) => cat !== tag)))
                      setPage(1)
                    }}
                  />
                  {tag}
                  {"\n                              "}({noOfItems as any} items)
                </Label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="vendors">
          <AccordionTrigger className="text-base">Vendors</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {Object.entries(vendors || {}).map(([vendor, noOfItems], index) => (
                <Label key={vendor} className="flex items-center gap-2 font-normal">
                  <Checkbox
                    name={vendor}
                    checked={selectedVendors?.includes(vendor)}
                    onCheckedChange={(checked) => {
                      setSelectedVendors((prev) => (checked ? [...prev, vendor] : prev.filter((cat) => cat !== vendor)))
                      setPage(1)
                    }}
                  />
                  {vendor}
                  {"\n                              "}({noOfItems as any} items)
                </Label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="sizes">
          <AccordionTrigger className="text-base">Sizes</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {Object.entries(sizes || {}).map(([size, noOfItems], index) => (
                <Label key={size} className="flex items-center gap-2 font-normal">
                  <Checkbox
                    name={size}
                    checked={selectedSizes?.includes(size)}
                    onCheckedChange={(checked) => {
                      setSelectedSizes((prev) => (checked ? [...prev, size] : prev.filter((cat) => cat !== size)))
                      setPage(1)
                    }}
                  />
                  {size}
                  {"\n                              "}({noOfItems as any} items)
                </Label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="colors">
          <AccordionTrigger className="text-base">Colors</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              {Object.entries(colors || {}).map(([color, noOfItems], index) => (
                <Label key={color} className="flex items-center gap-2 font-normal">
                  <Checkbox
                    name={color}
                    checked={selectedColors?.includes(color)}
                    onCheckedChange={(checked) => {
                      setSelectedColors((prev) => (checked ? [...prev, color] : prev.filter((cat) => cat !== color)))
                      setPage(1)
                    }}
                  />
                  {color}
                  {"\n                              "}({noOfItems as any} items)
                </Label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger className="text-base">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-2">
              <Label>
                Min price
                <input
                  className="ml-2 inline-flex"
                  type="number"
                  value={minPrice || undefined}
                  onChange={(e) => {
                    setMinPrice(+e.target.value)
                    setPage(1)
                  }}
                />
              </Label>
              <Label>
                Max price
                <input
                  className="ml-2 inline-flex"
                  type="number"
                  value={maxPrice || undefined}
                  onChange={(e) => {
                    setMaxPrice(+e.target.value)
                    setPage(1)
                  }}
                />
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
