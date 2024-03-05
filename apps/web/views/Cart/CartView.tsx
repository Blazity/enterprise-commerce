"use client"

import { PlatformCart } from "@enterprise-commerce/core/platform/types"
import dynamic from "next/dynamic"
import { useCartStore } from "stores/cartStore"

const CartSheet = dynamic(() => import("views/Cart/CartSheet").then((mod) => mod.CartSheet), { loading: Placeholder })

export function CartView({ cart }: { cart: PlatformCart }) {
  const closeCart = useCartStore((s) => s.closeCart)
  const openCart = useCartStore((s) => s.openCart)
  const isOpen = useCartStore((s) => s.isOpen)

  return isOpen ? <CartSheet isOpen={isOpen} onCartOpen={openCart} cart={cart} onCartClose={closeCart} /> : null
}

function Placeholder() {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"></div>
}
