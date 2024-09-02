"use client"

import { useState } from "react"
import { addCartItem } from "app/actions/cart.actions"
import { Spinner } from "components/Spinner/Spinner"
import { useAddProductStore } from "stores/addProductStore"
import { cn } from "utils/cn"
import { Combination } from "utils/productOptionsUtils"
import { toast } from "sonner"
import { type CurrencyType, mapCurrencyToSign } from "utils/mapCurrencyToSign"
import type { CommerceProduct } from "types"

interface QuickAddButtonProps {
  product: CommerceProduct
  combination: Combination | undefined
  label?: string
  className?: string
  withPrice?: boolean
}

export default function QuickAddButton({ combination, label, className, product, withPrice = false }: QuickAddButtonProps) {
  const [isPending, setIsPending] = useState(false)
  const { setProduct, clean } = useAddProductStore()

  // Mimic delay and display optimistic UI due to shopify API being slow
  const handleClick = async () => {
    if (!combination?.id) return

    setIsPending(true)

    setTimeout(() => {
      setProduct({ product, combination })
      setIsPending(false)
    }, 300)

    setTimeout(() => clean(), 4500)
    const res = await addCartItem(null, combination.id)

    if (!res.ok) toast.error("Out of stock")
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
