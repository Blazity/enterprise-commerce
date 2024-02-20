import { Button } from "./Button"

export function Navbar() {
  return (
    <header className="hidden bg-white py-4 sm:block">
      <div className="max-w-container-lg mx-auto flex items-center justify-between px-4 ">
        <h1 className="text-3xl font-bold">Blazity</h1>

        <div className="flex items-center space-x-6">
          <div className="size-8 rounded-full bg-gray-300">&nbsp;</div>
          <div className="flex items-center space-x-4">
            <Button>Log In</Button>
            <Button className="hover:text-white" variant="secondary" isAnimated={false}>
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
