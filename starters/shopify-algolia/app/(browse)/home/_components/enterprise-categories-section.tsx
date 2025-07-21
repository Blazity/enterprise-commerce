import { getCollection } from "lib/algolia/rate-limited"
import { EnterpriseCategoryCard } from "components/enterprise-category-card"
import { PlatformCollection } from "lib/shopify/types"

const FEATURED_CATEGORY_HANDLES = ["fashion", "electronics", "sports-and-outdoors", "furniture"]

export async function EnterpriseCategoriesSection() {
  const categoryPromises = FEATURED_CATEGORY_HANDLES.map((handle) => getCollection(handle))
  const categoriesData = await Promise.all(categoryPromises)

  const featuredCategories = categoriesData.filter((cat) => cat !== null) as PlatformCollection[]

  if (featuredCategories.length === 0) {
    return null
  }

  return (
    <section className="relative w-full py-24">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Featured Categories</h2>
          <p className="mt-4 text-lg text-muted-foreground">Explore our curated collections</p>
        </div>

        {}
        <div className="relative -mx-4 sm:-mx-8 lg:-mx-12">
          <div className="px-4 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
              {featuredCategories.map((category, index) => (
                <div key={category.handle} className="aspect-[4/3] w-full">
                  <EnterpriseCategoryCard category={category} priority={index < 2} className="h-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
