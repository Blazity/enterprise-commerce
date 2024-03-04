import { PlatformVariant } from "@enterprise-commerce/core/platform/types"

export interface Combination {
  id: string
  availableForSale: boolean
  quantityAvailable?: number | null | undefined
  price: PlatformVariant["price"] | undefined
  title: string
  size?: string
  color?: string
}

type Option = keyof Pick<Combination, "color" | "size">

export function getAllCombinations(variants: PlatformVariant[]): Combination[] {
  return variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    price: variant.price,
    title: variant.title,
    quantityAvailable: variant.quantityAvailable,
    ...variant.selectedOptions.reduce((accumulator, option) => ({ ...accumulator, [option.name.toLowerCase()]: option.value }), {}),
  }))
}

export function hasValidOption(variants: PlatformVariant[] | null | undefined, optionName: Option, optionValue: string | null): boolean {
  const combinations = getAllCombinations(variants || [])
    .flatMap((combination) => combination?.[optionName])
    .filter(Boolean)

  return !optionValue || combinations.includes(optionValue)
}

export function createOptionfulUrl(originalUrl: string, size: string | null | undefined, color: string | null | undefined) {
  let urlWithoutParams = removeOptionsFromUrl(originalUrl)

  const newSizeParam = size ? `-size_${size}` : ""
  const newColorParam = color ? `-color_${color}` : ""

  return `${urlWithoutParams}${newSizeParam}${newColorParam}`
}

export function removeOptionsFromUrl(pathname: string) {
  const sizePattern = /-size_([0-9a-zA-Z]+)/
  const colorPattern = /-color_([0-9a-zA-Z]+)/

  return pathname.replace(sizePattern, "").replace(colorPattern, "").replace("-draft", "")
}

export function getOptionsFromUrl(pathname: string) {
  const result: Record<Option, null | string> = {
    size: null,
    color: null,
  }

  const sizePattern = /-size_([0-9a-zA-Z]+)/
  const colorPattern = /-color_([0-9a-zA-Z]+)/

  const sizeMatch = pathname.match(sizePattern)
  const colorMatch = pathname.match(colorPattern)

  if (sizeMatch) result.size = sizeMatch[1].toLowerCase()
  if (colorMatch) result.color = colorMatch[1].toLowerCase()

  return result
}
