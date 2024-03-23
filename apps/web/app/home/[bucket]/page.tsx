import { Suspense } from "react"
import { BestOffersSection } from "views/Homepage/BestOffersSection"
import { CarouselSectionSkeleton } from "views/Homepage/CarouselSection"
import { CategoriesSection, CategoriesSectionSkeleton } from "views/Homepage/CategoriesSection"
import { EverythingUnderSection } from "views/Homepage/EverythingUnderSection"
import { HeroSection } from "views/Homepage/HeroSection"
import { ProductsWeekSection, ProductsWeekSectionSkeleton } from "views/Homepage/ProductsWeekSection"
import { BUCKETS } from "constants/index"

export const revalidate = 3600

export const dynamicParams = true

export default function Homepage({ params: { bucket } }: { params: { bucket: string } }) {
  const heroTitles = {
    a: "Your daily trendsetting deals",
    b: "Your daily top deals",
  }

  return (
    <>
      <HeroSection title={heroTitles[bucket]} />
      <Suspense fallback={<ProductsWeekSectionSkeleton />}>
        <ProductsWeekSection />
      </Suspense>

      <Suspense fallback={<CategoriesSectionSkeleton />}>
        <CategoriesSection />
      </Suspense>

      <Suspense fallback={<CarouselSectionSkeleton />}>
        <BestOffersSection />
      </Suspense>

      <Suspense fallback={<CarouselSectionSkeleton />}>
        <EverythingUnderSection />
      </Suspense>
    </>
  )
}

export async function generateStaticParams() {
  return BUCKETS.HOME.map((bucket) => ({ bucket }))
}
