"use client"

import { useTransition } from "react"
import { addCartItem } from "app/actions/cart.actions"
import { Spinner } from "components/Spinner/Spinner"
import { useCartStore } from "stores/cartStore"
import { cn } from "utils/cn"
import { Combination } from "utils/productOptionsUtils"
import { toast } from "sonner"

interface QuickAddButtonProps {
  combination: Combination | undefined
  label?: string
  className?: string
}

export default function QuickAddButton({ combination, label, className }: QuickAddButtonProps) {
  const [isPending, startTransition] = useTransition()
  const openCart = useCartStore((s) => s.openCart)

  const handleClick = () => {
    if (!combination?.id) return

    startTransition(async () => {
      const { ok, message } = await addCartItem(null, combination.id)

      if (!ok && message) {
        toast.warning(message)
      }

      if (ok) {
        openCart()
      }
    })
  }

  if (!combination) return null

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className={cn(
        "relative flex min-h-[30px] w-[70px] cursor-pointer justify-center truncate text-nowrap border border-black bg-white p-1.5 text-[11px] uppercase transition-colors hover:bg-neutral-800 hover:text-white disabled:cursor-not-allowed disabled:hover:text-black",
        className
      )}
    >
      {isPending ? <Spinner className="size-4" /> : label || combination.title}
    </button>
  )
}
