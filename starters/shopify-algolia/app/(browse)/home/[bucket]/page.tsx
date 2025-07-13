import { BUCKETS } from "constants/index"
import { AnnouncementBar } from "app/(browse)/home/_components/announcement-bar"
import { HeroSection } from "app/(browse)/home/_components/hero-section"
import { EnterpriseCategoriesSection } from "app/(browse)/home/_components/enterprise-categories-section"
import { ModernNewArrivalsSection } from "app/(browse)/home/_components/modern-new-arrivals-section"
import { getFeaturedProducts } from "lib/algolia"

export const revalidate = 86400

export const dynamic = "force-static"

export const dynamicParams = true

export default async function Homepage(_props: { params: Promise<{ bucket: string }> }) {
  const results = await getFeaturedProducts()

  return (
    <div className="flex w-full flex-col">
      <AnnouncementBar />
      <HeroSection />
      <ModernNewArrivalsSection products={results} />
      <EnterpriseCategoriesSection />
    </div>
  )
}

export async function generateStaticParams() {
  return BUCKETS.HOME.map((bucket) => ({ bucket }))
}
