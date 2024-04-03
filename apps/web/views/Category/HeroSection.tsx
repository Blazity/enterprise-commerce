"use client"

import { PlatformImage } from "@enterprise-commerce/core/platform/types"
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs"
import { Skeleton } from "components/Skeleton/Skeleton"
import { useReadMore } from "utils/useReadMore"

interface HeroSectionProps {
  image: PlatformImage | null | undefined
  title: string
  handle: string
  description: string | undefined
}

export function HeroSection({ title, handle, description }: HeroSectionProps) {
  const { currentText, isReadMore, isTruncated, toggleReadMore } = useReadMore(description || "", 400)

  const readMoreMarkup = (
    <button className="mt-3 inline-block bg-transparent font-bold" onClick={toggleReadMore}>
      {isReadMore ? "Read More" : "Read Less"}
    </button>
  )

  return (
    <>
      <Breadcrumbs items={{ Home: "/", [title]: `/category/${handle}` }} />
      <header className="mt-2">
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{title}</h1>
        <div className="mt-2 text-lg text-gray-500 transition-all" dangerouslySetInnerHTML={{ __html: currentText }} />
        {isTruncated ? readMoreMarkup : null}
      </header>
      <hr className="my-8" />
    </>
  )
}

export function HeroSectionSkeleton() {
  return (
    <>
      <Skeleton className="h-[18px] w-[200px]" />
      <header className="mt-2">
        <Skeleton className="mt-4 h-[36px] w-[170px] md:h-[40px]" />
        <Skeleton className="mt-2 h-[360px] w-full md:h-[84px]" />
        <Skeleton className="mt-3 h-[24px] w-[50px]" />
      </header>
      <hr className="my-8" />
    </>
  )
}
