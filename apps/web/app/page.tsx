import { Suspense } from "react"
import { BestOffersSection } from "views/Homepage/BestOffersSection"
import { CarouselSectionSkeleton } from "views/Homepage/CarouselSection"
import { CategoriesSection, CategoriesSectionSkeleton } from "views/Homepage/CategoriesSection"
import { EverythingUnderSection } from "views/Homepage/EverythingUnderSection"
import { HeroSection } from "views/Homepage/HeroSection"
import { ProductsWeekSection, ProductsWeekSectionSkeleton } from "views/Homepage/ProductsWeekSection"

export default function Homepage() {
  return (
    <>
      <HeroSection />

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
