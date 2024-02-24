"use client"

import { useWindowSize } from "@uidotdev/usehooks"
import { Skeleton } from "components/Skeleton"
import type { CategoriesDistribution } from "meilisearch"
import dynamic from "next/dynamic"
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryState } from "nuqs"

interface FacetsDesktopProps {
  facetDistribution: Record<string, CategoriesDistribution> | undefined
  className?: string
}

const FacetsContent = dynamic(() => import("views/Search/FacetsContent").then((m) => m.FacetsContent), { loading: FacetsContentSkeleton })

export function FacetsDesktop({ facetDistribution, className }: FacetsDesktopProps) {
  const { width = 0 } = useWindowSize()
  const isMobile = width! <= 768 && !!width

  return isMobile ? null : <FacetsContent facetDistribution={facetDistribution} className={className} />
}

function FacetsContentSkeleton() {
  return <Skeleton className="flex h-[600px] min-w-[250px] md:mt-32 md:block" />
}
