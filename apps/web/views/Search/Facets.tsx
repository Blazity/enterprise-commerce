"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "components/ui/Accordion"
import { Checkbox } from "components/ui/Checkbox"
import { Label } from "components/ui/Label"
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryState, useQueryStates } from "nuqs"
import { ChangeEvent, useEffect } from "react"

export function Facets({ facetDistribution }: any) {
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

  const [_, setPage] = useQueryState("page", { ...parseAsInteger, defaultValue: 1, shallow: false, history: "push", clearOnDefault: true })

  const [minPrice, setMinPrice] = useQueryState("minPrice", { ...parseAsInteger, shallow: false })
  const [maxPrice, setMaxPrice] = useQueryState("maxPrice", { ...parseAsInteger, shallow: false })

  return (
    <Accordion collapsible className="w-full" type="single">
      <AccordionItem value="category">
        <AccordionTrigger className="text-base">Category</AccordionTrigger>
        <AccordionContent>
          <div className="grid gap-2">
            {Object.entries(collections || {}).map(([collection, noOfItems], index) => (
              <Label key={collection} className="flex items-center gap-2 font-normal">
                <input
                  type="checkbox"
                  name={collection}
                  checked={selectedCategories?.includes(collection)}
                  onChange={(e: any) => {
                    setSelectedCategories((prev) => (e.target.checked ? [...prev, collection] : prev.filter((cat) => cat !== collection)))
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
                <input
                  type="checkbox"
                  name={tag}
                  checked={selectedTags?.includes(tag)}
                  onChange={(e: any) => {
                    setSelectedTags((prev) => (e.target.checked ? [...prev, tag] : prev.filter((cat) => cat !== tag)))
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
                <input
                  type="checkbox"
                  name={vendor}
                  checked={selectedVendors?.includes(vendor)}
                  onChange={(e: any) => {
                    setSelectedVendors((prev) => (e.target.checked ? [...prev, vendor] : prev.filter((cat) => cat !== vendor)))
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
                <input
                  type="checkbox"
                  name={size}
                  checked={selectedSizes?.includes(size)}
                  onChange={(e: any) => {
                    setSelectedSizes((prev) => (e.target.checked ? [...prev, size] : prev.filter((cat) => cat !== size)))
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
                <input
                  type="checkbox"
                  name={color}
                  checked={selectedColors?.includes(color)}
                  onChange={(e: any) => {
                    setSelectedColors((prev) => (e.target.checked ? [...prev, color] : prev.filter((cat) => cat !== color)))
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
              <input className="ml-2 inline-flex" type="number" value={minPrice || undefined} onChange={(e) => setMinPrice(+e.target.value)} />
            </Label>
            <Label>
              Max price
              <input className="ml-2 inline-flex" type="number" value={maxPrice || undefined} onChange={(e) => setMaxPrice(+e.target.value)} />
            </Label>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
