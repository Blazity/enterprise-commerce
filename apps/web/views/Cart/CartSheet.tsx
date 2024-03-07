import { PlatformCart } from "@enterprise-commerce/core/platform/types"
import { Button } from "components/Button"
import { CloseIcon } from "components/Icons/CloseIcon"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "components/Sheets"
import { useRouter } from "next/navigation"
import { CartItem } from "./CartItem"

interface CartSheetProps {
  cart: PlatformCart
  onCartClose: () => void
  onCartOpen: () => void
  isOpen: boolean
}

export function CartSheet({ cart, isOpen, onCartOpen, onCartClose }: CartSheetProps) {
  const router = useRouter()

  if (!cart) return null

  const subtotalFormatted = cart?.cost?.subtotalAmount?.amount + " " + cart?.cost?.subtotalAmount?.currencyCode
  const totalFomatted = cart?.cost?.totalAmount?.amount + " " + cart?.cost?.totalAmount?.currencyCode

  return (
    <Sheet open={isOpen} onOpenChange={() => onCartClose()}>
      <SheetContent className="h-full min-h-[100vh] bg-white p-0 ">
        <SheetHeader className="mb-4 flex w-full flex-row items-center justify-between border-b border-black">
          <SheetTitle className="p-4 text-[20px] font-normal">Review your cart</SheetTitle>
          <SheetClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
            <CloseIcon className="size-4" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>

        <div className="mb-4 flex h-[63%] w-full flex-col gap-4 overflow-x-hidden p-4">
          {cart?.items.map((singleItem) => <CartItem {...singleItem} key={singleItem.id + "_" + singleItem.merchandise.id} onProductClick={() => onCartClose()} />)}
        </div>

        <SheetFooter className="border-t border-black p-4">
          <div className="w-full bg-white py-4 text-sm text-neutral-500">
            <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 ">
              <p>Subtotal</p>
              <p className="text-right text-base text-black ">{subtotalFormatted}</p>
            </div>
            <div className="mb-3 flex items-center justify-between border-b border-neutral-200 py-1 ">
              <p>Shipping</p>
              <p className="text-right">Calculated at checkout</p>
            </div>
            <div className="mb-3 flex items-center justify-between border-b border-neutral-200 py-1 ">
              <p>Total</p>
              <p className="text-right text-base text-black ">{totalFomatted}</p>
            </div>
            <Button variant="secondary" isAnimated={false} className="w-full justify-center text-center hover:text-white" size="lg" onClick={() => router.push(cart?.checkoutUrl)}>
              Proceed to Checkout
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
