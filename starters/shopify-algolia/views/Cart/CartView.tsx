"use client"

import { getCart } from "app/actions/cart.actions"
import { COOKIE_CART_ID } from "constants/index"
import dynamic from "next/dynamic"
import { useEffect, useTransition } from "react"
import { useCartStore } from "stores/cartStore"
import { getCookie } from "utils/getCookie"

const CartSheet = dynamic(() => import("views/Cart/CartSheet").then((mod) => mod.CartSheet))

export function CartView() {
  const [isPending, startTransition] = useTransition()

  const { isOpen, isSheetLoaded, openCart, closeCart, setCart, cart } = useCartStore()
  const { lastUpdatedAt } = useCartStore()

  useEffect(() => {
    startTransition(async () => {
      const cartId = getCookie(COOKIE_CART_ID)

      if (!cartId) return

      const newCart = await getCart(cartId)
      newCart && setCart(newCart)
    })
  }, [lastUpdatedAt, setCart])

  return isSheetLoaded && <CartSheet isPending={isPending} isOpen={isOpen} onCartOpen={openCart} cart={cart!} onCartClose={closeCart} />
}
