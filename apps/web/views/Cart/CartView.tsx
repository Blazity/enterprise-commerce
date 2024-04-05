"use client"

import { PlatformCart } from "@enterprise-commerce/core/platform/types"
import { getCart } from "app/actions/cart.actions"
import { COOKIE_CART_ID } from "constants/index"
import dynamic from "next/dynamic"
import { useEffect, useState, useTransition } from "react"
import { useCartStore } from "stores/cartStore"
import { getCookie } from "utils/getCookie"

const CartSheet = dynamic(() => import("views/Cart/CartSheet").then((mod) => mod.CartSheet), { loading: Placeholder })

export function CartView() {
  const [cart, setCart] = useState<PlatformCart | null>(null)
  const [isPending, startTransition] = useTransition()

  const closeCart = useCartStore((s) => s.closeCart)
  const openCart = useCartStore((s) => s.openCart)
  const isOpen = useCartStore((s) => s.isOpen)
  const { lastUpdatedAt } = useCartStore()

  useEffect(() => {
    startTransition(async () => {
      const cartId = getCookie(COOKIE_CART_ID)

      if (!cartId) return

      const newCart = await getCart(cartId)
      newCart && setCart(newCart)
    })
  }, [lastUpdatedAt])

  if (!cart) return null

  return isOpen ? <CartSheet isPending={isPending} isOpen={isOpen} onCartOpen={openCart} cart={cart} onCartClose={closeCart} /> : null
}

function Placeholder() {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"></div>
}
