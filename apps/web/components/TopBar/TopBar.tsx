import Image from "next/image"
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
          <div className="size-8 rounded-full bg-gray-300">
            <Image src="/gb-flag.png" width={32} height={32} alt="GB flag" />
          </div>
          <Actions />
        </div>
      </div>
    </header>
  )
}
