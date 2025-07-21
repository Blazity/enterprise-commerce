import { navigationItems } from "utils/nav-items"
import { NextResponse } from "next/server"

export const revalidate = 360

export async function GET() {
  const data = await Promise.resolve({ items: navigationItems })
  return NextResponse.json(data)
}
