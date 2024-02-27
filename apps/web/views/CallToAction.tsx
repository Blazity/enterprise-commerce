import { Button } from "components/Button"
import { Input } from "components/Input"

export function CallToAction() {
  return (
    <div className="border-y border-black">
      <div className="max-w-container-md mx-auto my-0 w-full px-4 py-16 xl:px-0">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div>
            <h4 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Become a member and receive our special discounts.</h4>
          </div>
          <div>
            <form className="ml-0 flex max-w-md flex-col gap-4 md:ml-auto">
              <Input placeholder="Name" />
              <Input placeholder="Email" type="email" />
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
