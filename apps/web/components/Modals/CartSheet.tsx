"use client"

import { PlatformCart } from "@enterprise-commerce/core/platform/types"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "components/Sheets"
import { useEffect, useRef, useState, useTransition } from "react"
import { useModalStore } from "stores/modalStore"
import { getCart } from "app/actions"
import Image from "next/image"
import Link from "next/link"
import { Skeleton } from "components/Skeleton"

export function CartSheet() {
  const [cart, setCart] = useState<PlatformCart | null>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      const cart = await getCart()

      if (cart) setCart(cart)
    })
  }, [])

  return <CartView cart={cart} isPending={isPending} />
}

function CartView({ cart, isPending }: { cart: PlatformCart | null; isPending: boolean }) {
  const modals = useModalStore((s) => s.modals)
  const closeModal = useModalStore((s) => s.closeModal)
  const openModal = useModalStore((s) => s.openModal)

  const quantityRef = useRef(cart?.totalQuantity)

  useEffect(() => {
    if (cart?.totalQuantity !== quantityRef.current) {
      if (!modals["cart"]) {
        openModal("cart")
      }

      quantityRef.current = cart?.totalQuantity
    }
  }, [modals["cart"], cart?.totalQuantity, quantityRef])

  return (
    <Sheet open={modals["cart"]} onOpenChange={() => closeModal("cart")}>
      <SheetContent className="bg-white">
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
        </SheetHeader>
        {isPending ? <Skeleton className="h-40 w-full" /> : null}

        {!isPending && cart ? (
          <>
            {cart?.items.map((singleItem) => (
              <li key={singleItem.merchandise.product.id} className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700">
                <div className="relative flex w-full flex-row justify-between px-1 py-4">
                  <div className="absolute z-40 -mt-2 ml-[55px]">{/* <DeleteItemButton item={item} /> */}</div>
                  <Link href={`products/${singleItem.merchandise.product.handle}`} onClick={() => closeModal("cart")} className="z-30 flex flex-row space-x-4">
                    <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                      <Image
                        className="h-full w-full object-cover"
                        width={64}
                        height={64}
                        alt=""
                        // alt={item.merchandise.product.featuredImage.altText || item.merchandise.product.title}
                        src={singleItem.merchandise.product.featuredImage?.url || ""}
                      />
                    </div>

                    <div className="flex flex-1 flex-col text-base">
                      <span className="leading-tight">{singleItem.merchandise.product.title}</span>
                    </div>
                  </Link>
                  <div className="flex h-16 flex-col justify-between">
                    {/* <Price className="flex justify-end space-y-2 text-right text-sm" amount={item.cost.totalAmount.amount} currencyCode={item.cost.totalAmount.currencyCode} /> */}
                    <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                      {/* <EditItemQuantityButton item={item} type="minus" /> */}
                      <p className="w-6 text-center">
                        <span className="w-full text-sm">{singleItem.quantity}</span>
                      </p>
                      {/* <EditItemQuantityButton item={item} type="plus" /> */}
                    </div>
                  </div>
                </div>
              </li>
            ))}

            <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                <p>Taxes</p>
                <p className="text-right text-base text-black dark:text-white">{cart?.cost?.totalTaxAmount?.amount + " " + cart?.cost?.totalTaxAmount?.currencyCode}</p>
              </div>
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                <p>Shipping</p>
                <p className="text-right">Calculated at checkout</p>
              </div>
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                <p>Total</p>
                <p className="text-right text-base text-black dark:text-white">{cart?.cost?.totalAmount?.amount + " " + cart?.cost?.totalAmount?.currencyCode}</p>
              </div>
            </div>
            <a href={cart?.checkoutUrl} className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100">
              Proceed to Checkout
            </a>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
