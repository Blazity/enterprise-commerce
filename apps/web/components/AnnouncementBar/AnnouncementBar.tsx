import Link from "next/link"

export function AnnouncementBar() {
  return (
    <div className="flex h-[40px] w-full items-center justify-center text-nowrap bg-black text-center text-base/[18px] text-white">
      Sale 50% OFF
      <Link prefetch={false} href="/search" className="ml-2 underline hover:no-underline">
        Shop Now
      </Link>
    </div>
  )
}
