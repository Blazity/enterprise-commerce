import Link from "next/link"
import Actions from "./Actions"

export function TopBar() {
  return (
    <header className="hidden bg-white py-4 sm:block">
      <div className="max-w-container-lg mx-auto flex items-center justify-between px-4">
        <Link prefetch={false} href="/" className="text-3xl font-bold">
          Blazity
        </Link>

        <div className="flex items-center space-x-6">
          <Actions />
        </div>
      </div>
    </header>
  )
}
