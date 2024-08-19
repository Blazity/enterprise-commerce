import { Suspense } from "react"
import { BUCKETS } from "constants/index"
import { BestOffersSection } from "views/Homepage/BestOffersSection"
import { CarouselSectionSkeleton } from "views/Homepage/CarouselSection"
import { CategoriesSection, CategoriesSectionSkeleton } from "views/Homepage/CategoriesSection"
import { EverythingUnderSection } from "views/Homepage/EverythingUnderSection"
import { AnnouncementBar } from "components/AnnouncementBar/AnnouncementBar"
import { HeroSection } from "views/Homepage/HeroSection"

export const revalidate = 86400

export const dynamic = "force-static"

export const dynamicParams = true

export default function Homepage({ params: { bucket } }: { params: { bucket: string } }) {
  const heroTitles = {
    a: "Your daily trendsetting deals",
    b: "Spring into Savings! Up to 60% Off",
  }

  return (
    <div className="flex w-full flex-col">
      <HeroSection className="-order-1 md:-order-2" title={heroTitles[bucket]} />
      <AnnouncementBar className="-order-2 md:-order-1" />

      <Suspense fallback={<CategoriesSectionSkeleton />}>
        <CategoriesSection />
      </Suspense>

      <Suspense fallback={<CarouselSectionSkeleton />}>
        <BestOffersSection />
      </Suspense>

      <Suspense fallback={<CarouselSectionSkeleton />}>
        <EverythingUnderSection />
      </Suspense>
    </div>
  )
}

export async function generateStaticParams() {
  return BUCKETS.HOME.map((bucket) => ({ bucket }))
}
