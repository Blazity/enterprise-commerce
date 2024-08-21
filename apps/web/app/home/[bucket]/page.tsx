import { BUCKETS } from "constants/index"
import { AnnouncementBar } from "components/AnnouncementBar/AnnouncementBar"
import { HeroSection } from "views/Homepage/HeroSection"
import { meilisearch } from "clients/search"
import { CommerceProduct } from "types"
import { env } from "env.mjs"
import type { Hits } from "meilisearch"
import { PlatformCollection } from "@enterprise-commerce/core/platform/types"
import { CategoriesSection } from "views/Homepage/CategoriesSection"
import { FeaturedProductsSection } from "views/Homepage/FeaturedProductsSection"

export const revalidate = 86400

export const dynamic = "force-static"

export const dynamicParams = true

export default async function Homepage({ params: { bucket } }: { params: { bucket: string } }) {
  const heroTitles = {
    a: "Discover Your Next Favorite Thing",
    b: "Shop the best Deals on Top Brands & Unique Finds",
  }

  const { products, categories } = await fetchFeaturedData()

  return (
    <div className="flex w-full flex-col">
      <AnnouncementBar className="-order-2" />
      <HeroSection className="-order-1 self-center md:-order-2" title={heroTitles[bucket]} />
      <FeaturedProductsSection products={products} />
      <CategoriesSection categories={categories} />
    </div>
  )
}

export async function generateStaticParams() {
  return BUCKETS.HOME.map((bucket) => ({ bucket }))
}

const fetchFeaturedData = async () => {
  const results = await meilisearch?.multiSearch({
    queries: [
      {
        indexUid: env.MEILISEARCH_FEATURED_PRODUCTS_INDEX,
        q: "",
        limit: 6,
        attributesToRetrieve: ["id", "title", "featuredImage", "minPrice", "variants", "avgRating", "totalReviews", "vendor", "handle"],
      },
      { indexUid: env.MEILISEARCH_CATEGORIES_INDEX, q: "", limit: 4, attributesToRetrieve: ["id", "title", "handle"] },
    ],
  })

  return {
    products: results[0].hits as Hits<CommerceProduct>,
    categories: results[1].hits as Hits<PlatformCollection>,
  }
}
