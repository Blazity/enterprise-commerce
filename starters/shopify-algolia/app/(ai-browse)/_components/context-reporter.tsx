"use client"

import { PlatformCollection } from "lib/shopify/types"
import { useEffect } from "react"

import { useAppContextStore } from "stores/app-context-store"

import type { CommerceProduct } from "types"

export function ContextReporter({ products, categories, filters }: { products?: CommerceProduct[]; categories?: PlatformCollection[]; filters?: Record<string, unknown> }) {
  const setProductsContext = useAppContextStore((s) => s.setProductsContext)
  const setCategoriesContext = useAppContextStore((s) => s.setCategoriesContext)
  const setFiltersContext = useAppContextStore((s) => s.setFiltersContext)

  useEffect(() => {
    if (!!products?.length) {
      setProductsContext(JSON.stringify(products))
    }
    if (!!categories?.length) {
      setCategoriesContext(JSON.stringify(categories))
    }
    if (filters && !!Object.keys(filters).length) {
      setFiltersContext(JSON.stringify(filters))
    }
  }, [products, categories, filters, setProductsContext, setCategoriesContext, setFiltersContext])

  return null
}
