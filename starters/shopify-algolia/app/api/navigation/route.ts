import { navigationItems } from "utils/nav-items"
import { NextResponse } from "next/server"

export const revalidate = 360 // every 5 minutes

export async function GET() {
  // Wrapped in async function to ensure bundler doesn't pack it as static
  const data = await Promise.resolve({ items: navigationItems })
  return NextResponse.json(data)
}