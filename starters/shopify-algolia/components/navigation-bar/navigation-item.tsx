"use client"

import type { MouseEvent } from "react"
import { ChevronIcon } from "components/icons/chevron-icon"
import { NavItem } from "./types"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavigationItem({ singleMenuItem }: { singleMenuItem: NavItem }) {
  const pathname = usePathname()
  const isAi = pathname.startsWith("/ai")

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (singleMenuItem.submenu && window.innerWidth < 768) {
      e.preventDefault()
    }
  }

  return (
    <Link
      prefetch={false}
      onClick={handleClick}
      href={`${isAi ? "/ai" : ""}${singleMenuItem.href}`}
      className="menu__link h-full text-[22px] md:text-sm/[18px]"
    >
      {singleMenuItem.text}
      {!!singleMenuItem.submenu && (
        <i>
          <ChevronIcon />
        </i>
      )}
    </Link>
  )
}
