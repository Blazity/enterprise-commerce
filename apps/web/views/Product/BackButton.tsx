import { ArrowIcon } from "components/Icons/ArrowIcon"
import Link from "next/link"

export function BackButton({ className }: { className?: string }) {
  return (
    <Link href="/search" className={className}>
      <ArrowIcon className="size-8 cursor-pointer fill-black transition-transform hover:scale-110" />
    </Link>
  )
}
