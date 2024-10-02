"use client"

import type { MouseEvent } from "react"
import { ChevronIcon } from "components/Icons/ChevronIcon"
import { NavItem } from "./types"

export function NavigationItem({ singleMenuItem }: { singleMenuItem: NavItem }) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (singleMenuItem.submenu && window.innerWidth < 768) {
      e.preventDefault()
    }
  }

  return (
    <a onClick={handleClick} href={singleMenuItem.href || "#"} className="menu__link text-[22px] hover:underline md:text-sm/[18px]">
      {singleMenuItem.text}
      {!!singleMenuItem.submenu && (
        <i>
          <ChevronIcon />
        </i>
      )}
    </a>
  )
}
