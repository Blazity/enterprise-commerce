"use client"

import { usePathname } from "next/navigation"
import { VercelToolbar } from "@vercel/toolbar/next"

export function DraftToolbar() {
  const pathname = usePathname()
  return pathname.endsWith("-draft") ? <VercelToolbar /> : null
}
