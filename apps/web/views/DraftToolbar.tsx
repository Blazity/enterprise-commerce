"use client"

import { VercelToolbar } from "@vercel/toolbar/next"
import { usePathname } from "next/navigation"

export function DraftToolbar() {
  const pathname = usePathname()
  return pathname.endsWith("/draft") ? <VercelToolbar /> : null
}
