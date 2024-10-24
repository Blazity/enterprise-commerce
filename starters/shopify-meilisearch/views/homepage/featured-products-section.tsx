import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache"

import { CompactProductCard } from "components/compact-product-card"
import { FeaturedProductCard } from "components/featured-product-card"
import type { CommerceProduct } from "types"
import { cn } from "utils/cn"

import { meilisearch } from "clients/search"
import { env } from "env.mjs"

export const FeaturedProductsSection = async () => {
  const { products } = await getFeaturedProducts()
  return (
    <div className="mx-auto my-4 w-full max-w-container-sm space-y-4 px-4">
      <h2 className="mb-8 text-4xl font-semibold">New Arrivals</h2>
      <div className="grid gap-1 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-3 md:gap-4">
        {products.map((product, index) => {
          if (index === 0) {
            return <FeaturedProductCard prefetch className="col-span-2 md:row-span-2" key={product.id} {...product} />
          }
          return (
            <CompactProductCard
              prefetch={index < 2}
              key={product.id}
              {...product}
              className={cn({
                "col-span-2 md:col-auto": index === 5,
              })}
            />
          )
        })}
      </div>
    </div>
  )
}

const getFeaturedProducts = async () => {
  "use cache"
  cacheTag("featured-products")
  cacheLife("days")

  const { results } = await meilisearch.getDocuments<CommerceProduct>({
    indexName: env.MEILISEARCH_FEATURED_PRODUCTS_INDEX,
    options: {
      limit: 6,
      fields: ["id", "title", "featuredImage", "minPrice", "variants", "avgRating", "totalReviews", "vendor", "handle"],
    },
  })

  return {
    products: results,
  }
}
