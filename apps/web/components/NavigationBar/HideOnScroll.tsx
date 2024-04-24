"use client"

import { useEffect, useState } from "react"
import { cn } from "utils/cn"

export function HideOnScroll({ children }) {
  const [lastScrollTop, setLastScrollTop] = useState(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    function handleScroll() {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop
      if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollTop])

  return <div className={cn("sticky top-0 z-50 transition-all duration-300", hidden ? "-translate-y-full" : "translate-y-0")}>{children}</div>
}
