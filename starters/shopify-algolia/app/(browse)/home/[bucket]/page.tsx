import { BUCKETS } from "constants/index"
import { AnnouncementBar } from "app/(browse)/home/_components/announcement-bar"
import { HeroSection } from "app/(browse)/home/_components/hero-section"
import { EnterpriseCategoriesSection } from "app/(browse)/home/_components/enterprise-categories-section"
import { FeaturedProductsSection } from "app/(browse)/home/_components/featured-products-section"
import { getFeaturedProducts } from "lib/algolia"

export const revalidate = 86400

export const dynamic = "force-static"

export const dynamicParams = true

export default async function Homepage(props: { params: Promise<{ bucket: string }> }) {
  const params = await props.params

  const results = await getFeaturedProducts()

  return (
    <div className="flex w-full flex-col">
      <AnnouncementBar />
      <HeroSection />
      <FeaturedProductsSection products={results} />
      <EnterpriseCategoriesSection />
    </div>
  )
}

export async function generateStaticParams() {
  return BUCKETS.HOME.map((bucket) => ({ bucket }))
}
