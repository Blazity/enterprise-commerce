export function makeShopifyId(id: string, type: "Product" | "Collection" | "ProductVariant") {
  return id.startsWith("gid://shopify/") ? id : `gid://shopify/${type}/${id}`
}

export function cleanShopifyId(id: string, type: "Product" | "Collection" | "ProductVariant") {
  return id.replace(`gid://shopify/${type}/`, "")
}

export function normalizePresetChoice<T extends string>(value: string | null | undefined): T | null {
  if (!value) return null

  const match = value.match(/^\["(.+)"\]$/)
  if (match) {
    return match[1] as T
  }

  return value as T
}
