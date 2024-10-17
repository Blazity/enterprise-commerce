import { PlatformVariant } from "lib/shopify/types"
import type { CommerceProduct } from "types"

export interface Combination {
  id: string
  availableForSale: boolean
  quantityAvailable?: number | null | undefined
  price: PlatformVariant["price"] | undefined
  title: string
  color?: string
}

type Option = keyof Pick<Combination, "color">

export function getAllCombinations(variants: PlatformVariant[]): Combination[] {
  return variants?.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    price: variant.price,
    title: variant.title,
    quantityAvailable: variant.quantityAvailable,
    ...variant.selectedOptions.reduce((accumulator, option) => ({ ...accumulator, [option.name.toLowerCase()]: decodeURIComponent(option.value.toLowerCase()) }), {}),
  }))
}

export function getCombination(product: CommerceProduct, color: string | null) {
  const hasOnlyOneVariant = product.variants.length <= 1

  const defaultColor = product.flatOptions?.["Color"]?.find(Boolean)?.toLowerCase() ?? undefined

  return hasOnlyOneVariant ? product.variants.find(Boolean) : getAllCombinations(product.variants).find((combination) => combination.color === (color ?? defaultColor))
}

export function hasValidOption(variants: PlatformVariant[] | null | undefined, optionName: Option, optionValue: string | null): boolean {
  const combinations = getAllCombinations(variants || [])
    .flatMap((combination) => combination?.[optionName])
    .filter(Boolean)

  return !optionValue || combinations.includes(optionValue)
}

export function createOptionfulUrl(originalUrl: string, color: string | null | undefined) {
  let urlWithoutParams = removeOptionsFromUrl(originalUrl)

  const newColorParam = color ? `-color_${color}` : ""

  return `${urlWithoutParams}${newColorParam}`
}

export function removeOptionsFromUrl(pathname: string) {
  const colorPattern = /-color_([0-9a-zA-Z\s]+)/

  return decodeURIComponent(pathname).replace(colorPattern, "")
}

export function getOptionsFromUrl(pathname: string) {
  const result: Record<Option, null | string> = {
    color: null,
  }

  const colorPattern = /-color_([0-9a-zA-Z\s]+)/

  const decodedPathname = decodeURIComponent(pathname)

  const colorMatch = decodedPathname.match(colorPattern)

  if (colorMatch) result.color = colorMatch[1].toLowerCase()

  return result
}
