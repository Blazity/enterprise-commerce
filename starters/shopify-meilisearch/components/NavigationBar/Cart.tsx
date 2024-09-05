"use client"

import { cn } from "utils/cn"
import { OpenCartButton } from "./OpenCartButton"
import { useCartStore } from "stores/cartStore"

interface CartProps {
  className?: string
}

export function Cart({ className }: CartProps) {
  const cart = useCartStore((s) => s.cart)
  const preloadSheet = useCartStore((s) => s.preloadSheet)

  return (
    <div className={cn("relative size-8 cursor-pointer items-center justify-center fill-none transition-transform hover:scale-105", className)} onMouseOver={preloadSheet}>
      <svg width="21" height="26" viewBox="0 0 21 26" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.75 7.48649C5.75 7.48649 5.22222 1 10.5 1C15.7778 1 15.25 7.48649 15.25 7.48649M1 23.7027L2.00081 6.48252C2.03155 5.95366 2.46938 5.54054 2.99912 5.54054H18.0051C18.5331 5.54054 18.97 5.94786 19.0028 6.47487C19.3684 12.3442 20 22.7195 20 23.7027C20 24.7405 19.2963 25 18.9444 25C13.6667 25 2.9 25 2.05556 25C1.21111 25 1 24.1351 1 23.7027Z"
          stroke="black"
          strokeLinecap="round"
        />
      </svg>
      {!!cart?.totalQuantity && (
        <div className="absolute bottom-0 right-0 flex size-4 items-center justify-center rounded-full bg-black text-[11px] text-white">{cart?.totalQuantity}</div>
      )}
      <OpenCartButton />
    </div>
  )
}
