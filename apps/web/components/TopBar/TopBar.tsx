import Link from "next/link"
import { Suspense } from "react"
import { Menu } from "./Menu"

export async function TopBar() {
  return (
    <header className="hidden bg-white py-4 sm:block">
      <div className="max-w-container-lg mx-auto flex items-center justify-between px-4">
        <Link prefetch={false} href="/" className="text-3xl font-bold">
          Blazity
        </Link>

        <Suspense fallback={null}>
          <Menu />
        </Suspense>
      </div>
    </header>
  )
}
