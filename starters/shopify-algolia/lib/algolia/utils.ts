import type { ReadonlyURLSearchParams } from "next/navigation"

export function mapQueryParamsToAlgoliaFacets(queryParams: URLSearchParams | ReadonlyURLSearchParams) {
  const facets: Record<string, string[]> = {}

  Object.entries(queryParams).forEach(([key, value]) => {
    const facetName = mapQueryParamKeyToFacet(key)
    if (!facets[facetName]) {
      facets[facetName] = []
    }

    facets[facetName].push(...value.split(","))
  })

  return facets
}

function mapQueryParamKeyToFacet(key: string) {
  switch (key) {
    case "vendors":
      return "vendor"
    case "colors":
      return "flatOptions.Color"
    case "maxPrice":
      return "minPrice"
    default:
      return key
  }
}
