"use client"

import { useCartStore } from "stores/cart-store"

export function OpenCartButton() {
  const openCart = useCartStore((s) => s.openCart)

  return (
    <button className="absolute inset-0 size-full bg-transparent" onClick={() => openCart()}>
      <span className="sr-only">open cart</span>
    </button>
  )
}
