"use client"

import { normalizeCategoriesContext, normalizeProductsContext } from "lib/ai/utils"
import { PlatformCollection } from "lib/shopify/types"
import { useEffect } from "react"

import { useAppContextStore } from "stores/app-context-store"

import type { CommerceProduct } from "types"

export function ContextReporter({
  products,
  categories,
  availableFilters,
  similarProducts,
}: {
  products?: CommerceProduct[]
  categories?: PlatformCollection[]
  availableFilters?: Record<string, unknown>
  similarProducts?: CommerceProduct[]
}) {
  const setProductsContext = useAppContextStore((s) => s.setProductsContext)
  const setSimilarProductsContext = useAppContextStore((s) => s.setSimilarProductsContext)
  const setCategoriesContext = useAppContextStore((s) => s.setCategoriesContext)
  const setAvailableFiltersContext = useAppContextStore((s) => s.setsAvailableFiltersContext)

  useEffect(() => {
    if (!!products?.length) {
      setProductsContext(JSON.stringify(normalizeProductsContext(products)))
    }
    if (!!similarProducts?.length) {
      setSimilarProductsContext(JSON.stringify(normalizeProductsContext(similarProducts)))
    }
    if (!!categories?.length) {
      setCategoriesContext(JSON.stringify(normalizeCategoriesContext(categories)))
    }
    if (!!availableFilters && !!Object.keys(availableFilters).length) {
      setAvailableFiltersContext(JSON.stringify(availableFilters))
    }
  }, [products, categories, availableFilters, setProductsContext, setCategoriesContext, setAvailableFiltersContext, similarProducts, setSimilarProductsContext])

  return null
}
