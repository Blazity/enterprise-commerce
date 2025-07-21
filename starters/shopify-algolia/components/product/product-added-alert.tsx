"use client"

import { Alert, AlertDescription, AlertTitle } from "components/ui/alert"
import { Button } from "components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAddProductStore } from "stores/add-product-store"
import { useCartStore } from "stores/cart-store"
import { cn } from "utils/cn"
import { type CurrencyType, mapCurrencyToSign } from "utils/map-currency-to-sign"
import { filterImagesByVisualOption, getVisualOptionValueFromCombination } from "utils/visual-variant-utils"

export function ProductAddedAlert({ className }: { className?: string }) {
  const router = useRouter()
  const product = useAddProductStore((s) => s.product)
  const combination = useAddProductStore((s) => s.combination)
  const openCart = useCartStore((s) => s.openCart)
  const preloadSheet = useCartStore((s) => s.preloadSheet)
  const checkoutReady = useCartStore((s) => s.checkoutReady)
  const cart = useCartStore((s) => s.cart)

  if (!product || !combination || !cart?.checkoutUrl) return null

  const visualOptionValue = getVisualOptionValueFromCombination(combination)

  const variantImages = filterImagesByVisualOption(product.images, visualOptionValue || null)
  const variantImage = variantImages[0] || product.featuredImage

  return (
    <Alert
      className={cn(
        "absolute right-0 top-[5.5rem] z-50 w-full min-w-[220px] border border-input bg-white transition-all md:top-[4.5rem] md:min-w-[350px]",
        className
      )}
    >
      <AlertTitle>Product has been added to the cart!</AlertTitle>
      <AlertDescription className="mt-6 flex flex-col">
        <div className="mb-6 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Image
              width={48}
              height={48}
              alt={variantImage?.altText || product.title}
              className="z-0 select-none rounded object-cover transition-transform group-hover:scale-105"
              src={variantImage?.url || "/default-product-image.svg"}
              sizes="(max-width: 450px) 150px, 300px"
            />
            <div className="flex flex-col">
              <span className="font-bold">{product.title}</span>
              <span className="text-xs text-gray-400">{combination?.title}</span>
            </div>
          </div>
          <span className="text-xs">
            {mapCurrencyToSign(combination!.price!.currencyCode as CurrencyType)}
            {parseInt(combination!.price!.amount!, 10).toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <Button
            onMouseEnter={preloadSheet}
            onClick={openCart}
            variant="outline"
            className="bg-white transition-all hover:scale-105"
          >
            View cart
          </Button>
          <Button
            variant="default"
            onClick={() => router.push(cart.checkoutUrl)}
            className="rounded-md px-10 py-4 transition-all hover:scale-105"
            disabled={!checkoutReady}
          >
            Checkout
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}
