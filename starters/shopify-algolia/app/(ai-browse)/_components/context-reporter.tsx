"use client"

import { useEffect } from "react"

import { useAppContextStore } from "stores/app-context-store"

import type { CommerceProduct } from "types"

export function ContextReporter({ products }: { products: CommerceProduct[] }) {
  const setContext = useAppContextStore((s) => s.setContext)

  useEffect(() => {
    setContext(JSON.stringify(products))
  }, [products, setContext])

  return null
}
