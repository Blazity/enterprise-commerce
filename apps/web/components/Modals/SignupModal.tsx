import { Button } from "components/Button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "components/Dialog"
import { Input } from "components/Input"
import { Label } from "components/Label"
import { useModalStore } from "stores/modalStore"

export function SignupModal() {
  const modals = useModalStore((s) => s.modals)
  const closeModal = useModalStore((s) => s.closeModal)

  return (
    <Dialog open={!!modals["signup"]} onOpenChange={() => closeModal("signup")}>
      <DialogContent className="max-w-[90%] bg-white sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Signup</DialogTitle>
        </DialogHeader>
        <div className="flex w-full flex-col items-center gap-6 px-0 py-4 md:px-2 md:pt-8">
          <div className="flex w-full flex-col justify-center gap-4">
            <Label htmlFor="name" className="text-md">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="flex w-full flex-col justify-center gap-4">
            <Label htmlFor="username" className="text-md">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button size="lg" className="hover:text-white" variant="secondary" isAnimated={false} type="submit">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
