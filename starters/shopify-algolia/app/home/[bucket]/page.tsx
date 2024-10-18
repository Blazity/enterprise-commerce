import { Suspense } from "react"
import { BUCKETS } from "constants/index"
import { BestOffersSection } from "views/homepage/best-offers-skeleton"
import { CarouselSectionSkeleton } from "views/homepage/carousel-section"
import { CategoriesSection, CategoriesSectionSkeleton } from "views/homepage/categories-section"
import { EverythingUnderSection } from "views/homepage/everything-under-section"
import { AnnouncementBar } from "components/announcement-bar"
import { HeroSection } from "views/homepage/hero-section"

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
      <HeroSection className="-order-1 md:-order-2" title={heroTitles[bucket as keyof typeof heroTitles]} />
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
