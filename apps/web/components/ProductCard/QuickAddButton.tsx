"use client"

import { useTransition } from "react"
import { addCartItem } from "app/actions/cart.actions"
import { Spinner } from "components/Spinner/Spinner"
import { useCartStore } from "stores/cartStore"
import { cn } from "utils/cn"
import { Combination } from "utils/productOptionsUtils"
import { toast } from "sonner"
import { type CurrencyType, mapCurrencyToSign } from "utils/mapCurrencyToSign"

interface QuickAddButtonProps {
  combination: Combination | undefined
  label?: string
  className?: string
  withPrice?: boolean
}

export default function QuickAddButton({ combination, label, className, withPrice = false }: QuickAddButtonProps) {
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
        "relative flex min-h-[30px] cursor-pointer justify-center border border-black bg-white p-1.5 text-[11px] uppercase transition-colors hover:bg-neutral-800 hover:text-white disabled:cursor-not-allowed disabled:hover:text-black",
        className
      )}
    >
      {isPending ? <Spinner className="size-4" /> : <QuickAddButtonLabel label={label || combination.title} price={withPrice ? combination.price : undefined} />}
    </button>
  )
}

type QuickAddButtonLabelProps = {
  label: string
  price?: Combination["price"]
}

function QuickAddButtonLabel({ label, price }: QuickAddButtonLabelProps) {
  return (
    <div className="flex h-full flex-col">
      <p className="whitespace-nowrap px-1">{label}</p>
      {!!price && (
        <span className="mt-auto">
          {(+price.amount).toFixed(2)}
          {mapCurrencyToSign(price?.currencyCode as CurrencyType)}
        </span>
      )}
    </div>
  )
}
