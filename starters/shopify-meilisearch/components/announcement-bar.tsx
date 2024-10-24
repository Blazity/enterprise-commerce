import Link from "next/link"
import type { HTMLAttributes } from "react"
import { cn } from "utils/cn"

export function AnnouncementBar({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex h-[40px] w-full items-center justify-center text-nowrap bg-black text-center text-base/[18px] text-white", className)} {...rest}>
      Sale 50% OFF
      <Link prefetch={false} href="/search" className="ml-2 underline hover:no-underline">
        Shop Now
      </Link>
    </div>
  )
}
