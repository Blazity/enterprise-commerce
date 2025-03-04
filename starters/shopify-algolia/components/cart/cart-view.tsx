"use client"

import { useEffect, useTransition } from "react"
import dynamic from "next/dynamic"
import { getOrCreateCart } from "app/actions/cart.actions"
import { useCartStore } from "stores/cart-store"
import { CartSheetProps } from "components/cart/cart-sheet"

const CartSheet = dynamic<CartSheetProps>(
  () =>
    new Promise((resolve) => {
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        window.requestIdleCallback(() => {
          import("components/cart/cart-sheet").then((mod) => resolve(mod.CartSheet))
        })
      }
    }),
  {
    ssr: false,
  }
)

export function CartView() {
  const [isPending, startTransition] = useTransition()

  const { isOpen, isSheetLoaded, openCart, closeCart, setCart, cart } = useCartStore()
  const { lastUpdatedAt } = useCartStore()

  useEffect(() => {
    startTransition(async () => {
      const { cart } = await getOrCreateCart()
      cart && setCart(cart)
    })
  }, [lastUpdatedAt, setCart])

  return isSheetLoaded && <CartSheet isPending={isPending} isOpen={isOpen} onCartOpen={openCart} cart={cart!} onCartClose={closeCart} />
}
