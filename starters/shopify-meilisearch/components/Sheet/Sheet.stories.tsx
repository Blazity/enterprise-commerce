import type { Meta, StoryObj } from "@storybook/react"
import { CloseIcon } from "components/Icons/CloseIcon"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "./Sheet"

const meta: Meta<typeof Sheet> = {
  title: "Sheet",
  component: Sheet,
  args: {},
  argTypes: {},
}

type Story = StoryObj<typeof Sheet>

export const Default: Story = {
  render: () => (
    <Sheet open>
      <SheetContent className="size-full min-h-screen bg-white p-0 ">
        <SheetHeader className="mb-4 flex w-full flex-row items-center justify-between border-b border-black">
          <SheetTitle className="p-4 text-[20px] font-normal">Review your cart</SheetTitle>
          <SheetClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute right-4 top-4 rounded-sm bg-white opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
            <CloseIcon className="size-4" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>
        <div className="flex flex-col items-center justify-center gap-2 py-28 text-[21px] font-normal text-black">Content</div>
        <SheetFooter className="border-t border-black p-4">
          <div className="w-full bg-white py-4 text-sm text-neutral-500">
            <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 ">
              <p>Subtotal</p>
              <p className="text-right text-base text-black ">0$</p>
            </div>
            <div className="mb-3 flex items-center justify-between border-b border-neutral-200 py-1 ">
              <p>Shipping</p>
              <p className="text-right">Calculated at checkout</p>
            </div>
            <div className="mb-3 flex items-center justify-between border-b border-neutral-200 py-1 ">
              <p>Total</p>
              <p className="text-right text-base text-black ">0$</p>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

export default meta
