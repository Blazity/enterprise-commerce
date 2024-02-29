"use client"

import { PlatformVariant } from "@enterprise-commerce/core/platform/types"
import { Label } from "components/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/Select"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "utils/cn"
import { createOptionfulUrl, getAllCombinations, getOptionsFromUrl } from "utils/productOptionsUtils"

interface VariantsSectionProps {
  variants: PlatformVariant[]
  flatOptions: Record<string, string[]>
  className?: string
}

export default function VariantsSection({ variants, flatOptions }: VariantsSectionProps) {
  const router = useRouter()
  const pathname = usePathname()

  const urlOptions = getOptionsFromUrl(pathname)
  const combinations = getAllCombinations(variants)
  const hasOneVariant = variants.length <= 1

  const defaultColor = flatOptions?.["Color"]?.find(Boolean) ?? null
  const defaultSize = flatOptions?.["Size"]?.find(Boolean) ?? null
  const selectedColor = urlOptions.color ?? defaultColor
  const selectedSize = urlOptions.size ?? defaultSize

  if (hasOneVariant) return null

  return (
    <div className="flex w-full flex-wrap gap-6">
      <VariantOption
        title="Size"
        initialValue={selectedSize}
        values={flatOptions["Size"]}
        onPrefetch={(option) => router.prefetch(createOptionfulUrl(pathname, option, selectedColor))}
        onClick={(option) => router.replace(createOptionfulUrl(pathname, option, selectedColor))}
        isDisabledHandler={(option) => !combinations?.find((combination) => combination["size"] === option && combination["color"] === selectedColor)?.availableForSale}
        isActiveHandler={(option) => selectedSize === option}
      />
      <VariantOption
        title="Color"
        initialValue={selectedColor}
        values={flatOptions["Color"]}
        onPrefetch={(option) => router.prefetch(createOptionfulUrl(pathname, selectedSize, option))}
        onClick={(option) => router.replace(createOptionfulUrl(pathname, selectedSize, option))}
        isDisabledHandler={(option) => !combinations?.find((combination) => combination["size"] === selectedSize && combination["color"] === option)?.availableForSale}
        isActiveHandler={(option) => selectedColor === option}
      />
    </div>
  )
}

interface VariantOptionProps {
  title: string
  initialValue: string | null
  values: string[]
  onClick: (option: string) => void
  onPrefetch: (option: string) => void
  isActiveHandler: (option: string) => boolean
  isDisabledHandler: (option: string) => boolean
}

function VariantOption({ title, initialValue, values, onClick, onPrefetch, isActiveHandler, isDisabledHandler }: VariantOptionProps) {
  return (
    <div key={title} className="flex flex-col gap-2">
      <Label>{title}</Label>
      <Select value={initialValue ?? undefined} onValueChange={(option) => onClick(option)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={`Select a ${title.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {values.map((option) => {
            const isActive = isActiveHandler(option)
            const isDisabled = isDisabledHandler(option)

            return (
              <SelectItem disabled={isDisabled} className={cn("hover:bg-gray-50 focus:bg-gray-50 active:bg-gray-50")} key={option} value={option}>
                <span className={cn({ "cursor-not-allowed line-through": isDisabled })}>{option}</span>
                {isDisabled ? " (Not available)" : null}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </div>
  )
}
