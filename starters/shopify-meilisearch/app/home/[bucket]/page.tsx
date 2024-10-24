import { BUCKETS } from "constants/index"
import { AnnouncementBar } from "components/announcement-bar"
import { HeroSection } from "views/homepage/hero-section"
import { CategoriesSection } from "views/homepage/categories-section"
import { FeaturedProductsSection } from "views/homepage/featured-products-section"
import { Suspense } from "react"

type HomepageProps = {
  params: Promise<{ bucket: string }>
}

export default async function Homepage({ params: paramsPromise }: HomepageProps) {
  const params = await paramsPromise
  const heroTitles = {
    a: "Discover Your Next Favorite Thing",
    b: "Shop the best Deals on Top Brands & Unique Finds",
  }

  return (
    <div className="flex w-full flex-col">
      <AnnouncementBar className="-order-2" />
      <HeroSection className="-order-1 self-center md:-order-2" title={heroTitles[params.bucket]} />
      <Suspense>
        <FeaturedProductsSection />
      </Suspense>
      <Suspense>
        <CategoriesSection />
      </Suspense>
    </div>
  )
}

export async function generateStaticParams() {
  return BUCKETS.HOME.map((bucket) => ({ bucket }))
}
