import { BUCKETS } from "constants/index"
import { AnnouncementBar } from "app/home/_components/announcement-bar"
import { HeroSection } from "app/home/_components/hero-section"
import { CategoriesSection } from "app/home/_components/categories-section"
import { FeaturedProductsSection } from "app/home/_components/featured-products-section"
import { getFeaturedProducts } from "lib/meilisearch"

export const revalidate = 86400

export const dynamic = "force-static"

export const dynamicParams = true

export default async function Homepage({ params: { bucket } }: { params: { bucket: string } }) {
  const heroTitles = {
    a: "Discover Your Next Favorite Thing",
    b: "Shop the best Deals on Top Brands & Unique Finds",
  }

  const results = await getFeaturedProducts()

  return (
    <div className="flex w-full flex-col">
      <AnnouncementBar className="-order-2" />
      <HeroSection className="-order-1 self-center md:-order-2" title={heroTitles[bucket]} />
      <FeaturedProductsSection products={results} />
      <CategoriesSection />
    </div>
  )
}

export async function generateStaticParams() {
  return BUCKETS.HOME.map((bucket) => ({ bucket }))
}
