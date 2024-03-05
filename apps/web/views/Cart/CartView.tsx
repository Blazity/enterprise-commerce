"use client"

import { PlatformCart } from "@enterprise-commerce/core/platform/types"
import { removeCartItem } from "app/actions"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "components/Sheets"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"

export function CartView({ cart }: { cart: PlatformCart | null }) {
  const [isOpen, setIsOpen] = useState(false)
  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  const quantityRef = useRef(cart?.totalQuantity)

  useEffect(() => {
    if (cart?.totalQuantity !== quantityRef.current) {
      if (!isOpen) {
        openCart()
      }

      quantityRef.current = cart?.totalQuantity
    }
  }, [cart?.totalQuantity, isOpen, quantityRef])

  return (
    <Sheet open={isOpen} onOpenChange={() => closeCart()}>
      <SheetContent className="overflow-auto bg-white">
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
        </SheetHeader>

        {cart ? (
          <>
            {cart?.items.map((singleItem) => (
              <li key={singleItem.merchandise.product.id} className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700">
                <div className="relative flex w-full flex-row justify-between px-1 py-8">
                  <div className="absolute z-40 -mt-2 ml-[55px]">{/* <DeleteItemButton item={item} /> */}</div>
                  <Link href={`/products/${singleItem.merchandise.product.handle}`} onClick={() => closeCart()} className="z-30 flex flex-row space-x-4">
                    <div className="relative size-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                      <Image
                        className="size-full object-cover"
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
                    <p className="flex justify-end space-y-2 text-right text-sm">{singleItem?.cost?.totalAmount?.amount + " " + singleItem?.cost?.totalAmount?.currencyCode}</p>

                    <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                      <button
                        type="button"
                        onClick={() => {
                          // await editItem
                        }}
                      >
                        ➖
                      </button>
                      <p className="w-6 text-center">
                        <span className="w-full text-sm">{singleItem.quantity}</span>
                      </p>
                      <button type="button">➕</button>
                    </div>
                    <DeleteButton id={singleItem.id} />
                  </div>
                </div>
              </li>
            ))}
            <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                <p>Subtotal</p>
                <p className="text-right text-base text-black dark:text-white">{cart?.cost?.subtotalAmount?.amount + " " + cart?.cost?.subtotalAmount?.currencyCode}</p>
              </div>
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 py-1 dark:border-neutral-700">
                <p>Shipping</p>
                <p className="text-right">Calculated at checkout</p>
              </div>
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 py-1 dark:border-neutral-700">
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

function DeleteButton({ id }) {
  const [state, formAction] = useFormState(removeCartItem, { ok: false })

  const actionWithParams = formAction.bind(null, id)

  return (
    <form onClick={actionWithParams}>
      <Submit />
    </form>
  )
}

function Submit() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" onClick={(e) => e.preventDefault()}>
      ❌{pending && " loading..."}
    </button>
  )
}
