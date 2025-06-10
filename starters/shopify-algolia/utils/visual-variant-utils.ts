export const DEFAULT_VISUAL_OPTION = 'Color'

/**
 * Which option actually drives the gallery? You can override
 * via a product metafield or just hard-code "Size"/"Material" here.
 */
export function getVisualOptionName(override?: string): string {
  return override || DEFAULT_VISUAL_OPTION
}

/**
 * Strip the visual option from a handle/slug:
 *   "my-shirt-color_blue" → "my-shirt"
 */
export function removeVisualOptionFromSlug(
  slug: string,
  optionName = DEFAULT_VISUAL_OPTION
): string {
  const pattern = new RegExp(`-${optionName.toLowerCase()}_[^_]+`, 'i')
  return slug.replace(pattern, '')
}

/**
 * Extract the visual option value from a slug:
 *   "my-shirt-color_blue" → "blue"
 */
export function getVisualOptionFromSlug(
  slug: string,
  optionName = DEFAULT_VISUAL_OPTION
): string | null {
  const pattern = new RegExp(`-${optionName.toLowerCase()}_([^_]+)`, 'i')
  const m = slug.match(pattern)
  return m ? decodeURIComponent(m[1]).toLowerCase() : null
}

/**
 * Build a new slug with the visual option appended:
 *   ("my-shirt","green") → "my-shirt-color_green"
 */
export function createVisualOptionSlug(
  baseSlug: string,
  value?: string,
  optionName = DEFAULT_VISUAL_OPTION
): string {
  const clean = removeVisualOptionFromSlug(baseSlug, optionName)
  return value
    ? `${clean}-${optionName.toLowerCase()}_${encodeURIComponent(value)}`
    : clean
}

/**
 * Extract visual option value from a combination/variant object
 */
export function getVisualOptionValueFromCombination(
  combination: any,
  optionName = DEFAULT_VISUAL_OPTION
): string | undefined {
  // First try the direct property (legacy support for 'color')
  if (optionName.toLowerCase() === 'color' && combination?.color) {
    return combination.color
  }
  
  // Try the lowercase version of the option name
  const lowerOptionName = optionName.toLowerCase()
  if (combination?.[lowerOptionName]) {
    return combination[lowerOptionName]
  }
  
  // Try to find it in selectedOptions if it's a variant
  if (combination?.selectedOptions) {
    const option = combination.selectedOptions.find((opt: any) => 
      opt.name.toLowerCase() === lowerOptionName
    )
    return option?.value
  }
  
  return undefined
}

/**
 * Given a list of images, return only those whose URL contains
 *   `-Color-Red` (case-insensitive). Falls back to the full list
 *   if nothing matches.
 */
export function filterImagesByVisualOption<T extends { url: string }>(
  images: T[],
  value: string | null,
  optionName = DEFAULT_VISUAL_OPTION
): T[] {
  if (!value) return images
  const needle = `-${optionName}-`.toLowerCase() + value.toLowerCase()
  const matches = images.filter((img) =>
    img.url.toLowerCase().includes(needle)
  )
  return matches.length > 0 ? matches : images
}

/**
 * Get the combination based on visual option value instead of color
 */
export function getCombinationByVisualOption(
  variants: any[],
  visualValue: string | null,
  optionName = DEFAULT_VISUAL_OPTION
): any {
  if (!visualValue || variants.length <= 1) {
    return variants.find(Boolean)
  }
  
  return variants.find((variant) =>
    variant.selectedOptions.some((option: any) =>
      option.name.toLowerCase() === optionName.toLowerCase() &&
      option.value.toLowerCase() === visualValue.toLowerCase()
    )
  )
}

/**
 * Check if a visual option value is valid for the given variants
 */
export function hasValidVisualOption(
  variants: any[],
  visualValue: string | null,
  optionName = DEFAULT_VISUAL_OPTION
): boolean {
  if (!visualValue) return true
  
  return variants.some((variant) =>
    variant.selectedOptions.some((option: any) =>
      option.name.toLowerCase() === optionName.toLowerCase() &&
      option.value.toLowerCase() === visualValue.toLowerCase()
    )
  )
} 