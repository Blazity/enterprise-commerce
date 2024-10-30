"use client"

import { VercelToolbar } from "@vercel/toolbar/next"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function DraftToolbar() {
  const [hasToolbarHash, setHasToolbarHash] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === "undefined") return
    setHasToolbarHash(window.location.hash === "#toolbar")
  }, [pathname])

  return pathname.endsWith("/draft") || hasToolbarHash ? <VercelToolbar /> : null
}
