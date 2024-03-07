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

export function VariantsSection({ variants, flatOptions }: VariantsSectionProps) {
  const router = useRouter()
  const pathname = usePathname()

  const urlOptions = getOptionsFromUrl(pathname)
  const combinations = getAllCombinations(variants)

  const defaultColor = flatOptions?.["Color"]?.find(Boolean) ?? null
  const defaultSize = flatOptions?.["Size"]?.find(Boolean) ?? null
  const selectedColor = urlOptions.color ?? defaultColor
  const selectedSize = urlOptions.size ?? defaultSize

  return (
    <div
      className="flex w-full flex-wrap gap-6"
      onMouseOver={() => {
        combinations.map((combination) => router.prefetch(createOptionfulUrl(pathname, combination.size, combination.color)))
      }}
    >
      <VariantOption
        title="Size"
        initialValue={selectedSize}
        values={flatOptions["Size"]}
        onClick={(option) => router.replace(createOptionfulUrl(pathname, option, selectedColor), { scroll: false })}
        isDisabledHandler={(option) => !combinations?.find((combination) => combination["size"] === option && combination["color"] === selectedColor)?.availableForSale}
      />
      <VariantOption
        title="Color"
        initialValue={selectedColor}
        values={flatOptions["Color"]}
        onClick={(option) => router.replace(createOptionfulUrl(pathname, selectedSize, option), { scroll: false })}
        isDisabledHandler={(option) => !combinations?.find((combination) => combination["size"] === selectedSize && combination["color"] === option)?.availableForSale}
      />
    </div>
  )
}

interface VariantOptionProps {
  title: string
  initialValue: string | null
  values: string[]
  onClick: (option: string) => void
  isDisabledHandler: (option: string) => boolean
}

function VariantOption({ title, initialValue, values, onClick, isDisabledHandler }: VariantOptionProps) {
  return (
    <div key={title} className="flex flex-col gap-2">
      <Label>{title}</Label>
      <Select value={initialValue ?? undefined} onValueChange={(option) => onClick(option)}>
        <SelectTrigger className="w-[180px]" aria-label={`Select a ${title}`}>
          <SelectValue placeholder={`Select a ${title.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {values.map((option) => {
            const isDisabled = isDisabledHandler(option)

            return (
              <SelectItem disabled={isDisabled} className={cn("hover:bg-neutral-50 focus:bg-neutral-50 active:bg-neutral-50")} key={option} value={option}>
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
