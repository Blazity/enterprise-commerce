"use client"

import { useEffect, useTransition } from "react"
import dynamic from "next/dynamic"
import { getOrCreateCart } from "app/actions/cart.actions"
import { useCartStore } from "stores/cart-store"

const CartSheet = dynamic(() => import("components/cart/cart-sheet").then((mod) => mod.CartSheet))

export function CartView() {
  const [isPending, startTransition] = useTransition()

  const isOpen = useCartStore((s) => s.isOpen)
  const isSheetLoaded = useCartStore((s) => s.isSheetLoaded)
  const openCart = useCartStore((s) => s.openCart)
  const closeCart = useCartStore((s) => s.closeCart)
  const setCart = useCartStore((s) => s.setCart)
  const cart = useCartStore((s) => s.cart)
  const lastUpdatedAt = useCartStore((s) => s.lastUpdatedAt)

  useEffect(() => {
    startTransition(async () => {
      const { cart } = await getOrCreateCart()
      cart && setCart(cart)
    })
  }, [lastUpdatedAt, setCart])

  return (
    isSheetLoaded && (
      <CartSheet isPending={isPending} isOpen={isOpen} onCartOpen={openCart} cart={cart!} onCartClose={closeCart} />
    )
  )
}
