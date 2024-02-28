"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { getCurrentUrl, setCurrentUrl, setPreviousUrl } from "utils/routerHistory"

export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    const currentUrl = getCurrentUrl()

    if (currentUrl) {
      setPreviousUrl(currentUrl)
    }

    setCurrentUrl(url)
  }, [pathname, searchParams])

  return null
}
