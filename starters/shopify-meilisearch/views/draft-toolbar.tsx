"use client"

import { VercelToolbar } from "@vercel/toolbar/next"
import { usePathname } from "next/navigation"

export default function DraftToolbar() {
  const pathname = usePathname()
  const hasToolbarHash = window.location.hash === "#toolbar"

  return pathname.endsWith("/draft") || hasToolbarHash ? <VercelToolbar /> : null
}
