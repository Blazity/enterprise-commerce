"use client"

import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"

const VercelToolbar = dynamic(() => import("@vercel/toolbar/next").then((mod) => mod.VercelToolbar))

export function DraftToolbar() {
  const pathname = usePathname()
  return pathname.endsWith("-draft") ? <VercelToolbar /> : null
}
