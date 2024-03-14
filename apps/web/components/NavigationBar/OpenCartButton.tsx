"use client"

import { useCartStore } from "stores/cartStore"

export function OpenCartButton() {
  const openCart = useCartStore((s) => s.openCart)

  return <div className="absolute inset-0 size-full" onClick={() => openCart()} />
}
