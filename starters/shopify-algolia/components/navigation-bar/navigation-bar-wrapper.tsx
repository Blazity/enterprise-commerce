"use client"

import useSWR from "swr"
import { navigationFetcher } from "lib/navigation"
import { NavigationBar } from "./navigation-bar"
import type { NavItem } from "./types"

interface NavigationData {
  items: NavItem[]
}

interface NavigationBarWrapperProps {
  fallbackData: NavigationData
}

export function NavigationBarWrapper({ fallbackData }: NavigationBarWrapperProps) {
  const { data: navigationData } = useSWR<NavigationData>("/api/navigation", navigationFetcher, {
    fallbackData,
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: true,
    refreshInterval: 10000,
  })

  const items = navigationData?.items || fallbackData.items

  return <NavigationBar items={items} />
}
