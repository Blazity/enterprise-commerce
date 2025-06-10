"use client"

import { PlatformVariant } from "lib/shopify/types"
import { cn } from "utils/cn"
import { Combination } from "utils/product-options-utils"
import { createMultiOptionSlug, getMultiOptionFromSlug } from "utils/visual-variant-utils"
import { useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "components/ui/dropdown-menu"
import { Button } from "components/ui/button"
import { ChevronDown } from "lucide-react"
import { useRef } from "react"

interface VariantDropdownsProps {
  variants: PlatformVariant[]
  className?: string
  combination: Combination | undefined
  handle: string
  currentSlug: string
}

interface OptionData {
  name: string
  values: string[]
  currentValue?: string
}

/**
 * Slugify a string to make it URL-safe (matching visual-variant-utils logic)
 */
function slugifyOptionName(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, "") // Remove spaces entirely
    .replace(/[^a-z0-9]/g, "") // Remove all non-alphanumeric characters
}

function slugifyOptionValue(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, "") // Remove spaces entirely
    .replace(/[^a-z0-9]/g, "") // Remove all non-alphanumeric characters
}

export function VariantDropdowns({ variants, className, handle, combination, currentSlug }: VariantDropdownsProps) {
  const router = useRouter()
  const dropdownContainerRef = useRef<HTMLDivElement>(null)
  // Extract all unique options from variants
  const optionsData: OptionData[] = []
  const optionNames = new Set<string>()

  // Get current selected options from slug
  const currentOptions = getMultiOptionFromSlug(currentSlug)

  // Collect all option names
  variants.forEach((variant) => {
    variant.selectedOptions.forEach((option) => {
      optionNames.add(option.name)
    })
  })

  // Build options data structure
  optionNames.forEach((optionName) => {
    const values = new Set<string>()

    variants.forEach((variant) => {
      const option = variant.selectedOptions.find((opt) => opt.name === optionName)
      if (option) {
        values.add(option.value)
      }
    })

    // Find current value for this option
    let currentValue: string | undefined
    if (combination) {
      const selectedOption = variants.find((v) => v.id === combination.id)?.selectedOptions.find((opt) => opt.name === optionName)
      currentValue = selectedOption?.value
    }

    optionsData.push({
      name: optionName,
      values: Array.from(values).sort(),
      currentValue,
    })
  })

  const handleOptionChange = (optionName: string, optionValue: string) => {
    // Get current options and update the changed one
    const newOptions = { ...currentOptions }

    // Update the changed option using proper slugification
    newOptions[slugifyOptionName(optionName)] = slugifyOptionValue(optionValue)

    // Find if this combination exists
    const targetVariant = variants.find((variant) => {
      return Object.entries(newOptions).every(([slugOptionName, slugOptionValue]) => {
        return variant.selectedOptions.some((option) => {
          const optionNameSlug = slugifyOptionName(option.name)
          const optionValueSlug = slugifyOptionValue(option.value)
          return optionNameSlug === slugOptionName && optionValueSlug === slugOptionValue
        })
      })
    })

    if (targetVariant) {
      // Create options object with original case for URL generation
      const optionsForUrl: Record<string, string> = {}
      targetVariant.selectedOptions.forEach((option) => {
        optionsForUrl[option.name] = option.value
      })

      const newSlug = createMultiOptionSlug(handle, optionsForUrl)
      router.push(`/product/${newSlug}`, { scroll: false })
    }
  }

  // Don't render if only one variant or no options
  if (variants.length <= 1 || optionsData.length === 0) {
    return null
  }

  return (
    <div ref={dropdownContainerRef} className={cn("flex flex-col gap-4", className)}>
      <p className="text-center text-sm text-neutral-500 md:text-left">Select options</p>
      <div className="flex flex-col gap-3">
        {optionsData.map((option) => (
          <div key={option.name} className="flex flex-col gap-2">
            <label className="text-sm font-medium text-neutral-700">{option.name}</label>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between" size="sm">
                  {option.currentValue || `Select ${option.name}`}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-full min-w-[200px]" align="start">
                {option.values.map((value) => (
                  <DropdownMenuItem
                    key={value}
                    onClick={() => handleOptionChange(option.name, value)}
                    className={cn("cursor-pointer", option.currentValue === value && "bg-accent font-medium")}
                  >
                    {value}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </div>
    </div>
  )
}
