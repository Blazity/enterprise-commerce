"use client"

import { VercelToolbar } from "@vercel/toolbar/next"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function DraftToolbar() {
  const pathname = usePathname()
  const [hasToolbarHash, setHasToolbarHash] = useState(false)
  useEffect(() => {
    setHasToolbarHash(window.location.hash === "#toolbar")
  }, [pathname])

  return pathname.endsWith("/draft") || hasToolbarHash ? <VercelToolbar /> : null
}
