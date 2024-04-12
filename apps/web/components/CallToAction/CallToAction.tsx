import { Button } from "components/Button/Button"
import { Input } from "components/Input/Input"
import { Label } from "components/Label/Label"

export function CallToAction() {
  return (
    <div className="border-y border-black">
      <div className="max-w-container-md mx-auto my-0 w-full px-4 py-16 xl:px-0">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div>
            <p className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Become a member and receive our special discounts.</p>
          </div>
          <div>
            <form className="ml-0 flex max-w-md flex-col gap-4 md:ml-auto">
              <Label>
                <span className="sr-only">Name</span>
                <Input placeholder="Name" />
              </Label>
              <Label>
                <span className="sr-only">Email</span>
                <Input placeholder="Email" type="email" />
              </Label>
              <Button size="lg" className="w-fit bg-black text-center text-white">
                Become a Member
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
