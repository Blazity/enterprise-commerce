"use client"

import { useEffect, useTransition } from "react"
import dynamic from "next/dynamic"
import { getOrCreateCart } from "app/actions/cart.actions"
import { useCartStore } from "stores/cart-store"

const CartSheet = dynamic(() => import("components/cart/cart-sheet").then((mod) => mod.CartSheet))

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
