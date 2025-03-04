export function makeShopifyId(id: string, type: "Product" | "Collection") {
  return id.startsWith("gid://shopify/") ? id : `gid://shopify/${type}/${id}`
}

export function cleanShopifyId(id: string, type: "Product" | "Collection") {
  return id.replace(`gid://shopify/${type}/`, "")
}
