"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AccordionContent, AccordionItem, AccordionTrigger } from "components/ui/accordion"
import { Checkbox } from "components/ui/checkbox"
import { Label } from "components/ui/label"
import { Input } from "components/ui/input"
import { SearchIcon } from "lucide-react"
import type Fuse from "fuse.js"

interface VendorsFacetProps {
  id: string
  title: string
  distribution: Record<string, number> | undefined
  isChecked: (value: string) => boolean
  onCheckedChange: (checked: boolean, value: string) => void
}

export function VendorsFacet({ id, title, distribution, isChecked, onCheckedChange }: VendorsFacetProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const fuseRef = useRef<Fuse<string> | null>(null)
  const fusePromiseRef = useRef<Promise<typeof Fuse> | null>(null)

  const distributionsEntries = Object.entries(distribution || {})
  const hasNoResults = distributionsEntries.length === 0

  // Start loading Fuse.js when accordion opens
  useEffect(() => {
    if (isOpen && !fusePromiseRef.current) {
      fusePromiseRef.current = import("fuse.js").then((module) => module.default)
    }
  }, [isOpen])

  // Filtered vendors based on search
  const filteredVendors = useMemo(() => {
    if (!searchQuery) return distributionsEntries

    // If we have a search query and Fuse is loaded, use it
    if (fuseRef.current) {
      const results = fuseRef.current.search(searchQuery)
      return results.map(result => {
        const vendor = result.item
        return [vendor, distribution?.[vendor] || 0] as [string, number]
      })
    }

    // Fallback to simple filter while Fuse is loading
    return distributionsEntries.filter(([vendor]) => 
      vendor.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, distributionsEntries, distribution])

  // Initialize Fuse when user starts typing
  useEffect(() => {
    if (searchQuery && fusePromiseRef.current && !fuseRef.current) {
      fusePromiseRef.current.then((FuseModule) => {
        const vendors = distributionsEntries.map(([vendor]) => vendor)
        fuseRef.current = new FuseModule(vendors, {
          threshold: 0.3,
          includeScore: true,
        })
      })
    }
  }, [searchQuery, distributionsEntries])

  return (
    <AccordionItem value={id}>
      <AccordionTrigger className="py-2 text-base" onClick={() => setIsOpen(!isOpen)}>{title}</AccordionTrigger>
      <AccordionContent>
        {!hasNoResults && (
          <div className="mb-3 relative">
            <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-sm"
            />
          </div>
        )}
        
        <div className="h-[250px] overflow-y-auto">
          {hasNoResults ? (
            <p className="text-sm text-neutral-500">No {title.toLowerCase()} found</p>
          ) : filteredVendors.length === 0 ? (
            <p className="text-sm text-neutral-500">No matching vendors found</p>
          ) : (
            <div className="grid gap-2 pr-2">
              {filteredVendors.map(([value], index) => (
                <Label key={value + index} className="flex items-center gap-2">
                  <Checkbox 
                    name={value} 
                    checked={isChecked(value)} 
                    onCheckedChange={(checked) => onCheckedChange(!!checked, value)} 
                  />
                  {value}
                </Label>
              ))}
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}