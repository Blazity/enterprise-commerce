import { ArrowIcon } from "components/Icons/ArrowIcon"
import Link from "next/link"

export function BackButton({ href = "/search", className }: { href?: string; className?: string }) {
  return (
    <Link href={href} className={className} aria-label="Go back" prefetch={false}>
      <ArrowIcon className="size-8 cursor-pointer fill-black transition-transform hover:scale-110" />
    </Link>
  )
}
