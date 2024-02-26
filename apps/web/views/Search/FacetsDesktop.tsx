"use client"

import { useWindowSize } from "@uidotdev/usehooks"
import { Skeleton } from "components/Skeleton"
import type { CategoriesDistribution } from "meilisearch"
import dynamic from "next/dynamic"
import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryState } from "nuqs"
import { cn } from "utils/cn"

interface FacetsDesktopProps {
  facetDistribution: Record<string, CategoriesDistribution> | undefined
  className?: string
}

const FacetsContent = dynamic(() => import("views/Search/FacetsContent").then((m) => m.FacetsContent), { loading: FacetsContentSkeleton, ssr: true })

export function FacetsDesktop({ facetDistribution, className }: FacetsDesktopProps) {
  const { width = 0 } = useWindowSize()
  const isMobile = width! <= 768 && !!width

  return isMobile ? null : <FacetsContent facetDistribution={facetDistribution} className={cn(className, "sticky top-20 h-full")} />
}

function FacetsContentSkeleton() {
  return (
    <div className="flex flex-col gap-0 md:mt-16">
      <Skeleton className="mb-6 flex h-[35px] min-w-[250px] md:block" />
      <Skeleton className="flex h-[350px] min-w-[250px]" />
    </div>
  )
}
