"use client"

import { Alert, AlertDescription, AlertTitle } from "components/Alert/Alert"
import { Button } from "components/Button/Button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAddProductStore } from "stores/addProductStore"
import { useCartStore } from "stores/cartStore"
import { cn } from "utils/cn"
import { type CurrencyType, mapCurrencyToSign } from "utils/mapCurrencyToSign"

export function ProductAddedAlert({ className }: { className?: string }) {
  const router = useRouter()
  const { product, combination } = useAddProductStore()
  const { openCart, preloadSheet, cart } = useCartStore()

  if (!product || !combination) return null

  return (
    <Alert
      className={cn(
        "absolute right-0 top-20 z-50 w-full min-w-[220px] border border-black bg-gradient-to-b from-white to-gray-100 transition-all md:right-4 md:top-16 md:min-w-[350px]",
        className
      )}
    >
      <AlertTitle>Product has been added to the cart!</AlertTitle>
      <AlertDescription className="mt-6 flex flex-col">
        <div className="mb-6 flex items-center gap-2">
          <Image
            width={48}
            height={48}
            alt={product?.featuredImage?.altText || product.title}
            className="z-0 select-none rounded object-cover transition-transform group-hover:scale-105"
            src={product.featuredImage?.url || "/default-product-image.svg"}
            sizes="(max-width: 450px) 150px, 300px"
          />
          <span className="font-bold">{product.title}</span>
          <div className="flex gap-6">
            <div className="flex flex-col">
              <span className="text-xs font-semibold">Type</span>
              <span className="text-xs">{combination?.title}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold">Price</span>
              <span className="text-xs">
                {mapCurrencyToSign(combination!.price!.currencyCode as CurrencyType)}
                {parseInt(combination!.price!.amount!, 10).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <Button onMouseEnter={preloadSheet} onClick={openCart} className="items-center justify-center">
            View cart
          </Button>
          <Button onClick={() => router.push(cart?.checkoutUrl!)} className="items-center justify-center">
            Checkout
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}
