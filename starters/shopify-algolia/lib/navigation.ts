import { navigationItems } from "utils/nav-items"
import type { NavItem } from "components/navigation-bar/types"

interface NavigationData {
  items: NavItem[]
}

export async function getNavigationData(): Promise<NavigationData> {
  try {
    if (process.env.NODE_ENV === "production" && process.env.VERCEL_URL) {
      const response = await fetch(`https://${process.env.VERCEL_URL}/api/navigation`, {
        next: { revalidate: 360 },
      })

      if (response.ok) {
        return (await response.json()) as NavigationData
      }
    }

    return { items: navigationItems }
  } catch (error) {
    return { items: navigationItems }
  }
}

export const navigationFetcher = async (url: string): Promise<NavigationData> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch navigation")
  }
  return response.json() as Promise<NavigationData>
}
