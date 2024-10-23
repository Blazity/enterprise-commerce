import { meilisearch } from "clients/search"
import { CategoryCard } from "components/category-card"
import { unstable_cache } from "next/cache"
import { env } from "env.mjs"
import { cn } from "utils/cn"
import { getDemoCategories, isDemoMode } from "utils/demo-utils"

export async function CategoriesSection() {
  const categories = await getCategories()

  if (!categories?.length) return null

  return (
    <div className="mt-20 bg-gray-50 px-4 py-20">
      <div className="mx-auto w-full max-w-container-sm space-y-4">
        <h2 className="mb-8 text-left text-4xl font-semibold">Featured Categories</h2>
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2">
          {categories.map((category, index) => {
            return (
              <CategoryCard
                className={cn("bg-white shadow-md md:shadow-none", {
                  "md:border-r": index === 0 || index === 2,
                  "md:border-l": index === 1 || index === 3,
                  "md:border-b": index === 0 || index === 1,
                  "md:border-t": index === 2 || index === 3,
                })}
                index={index + 3}
                key={category.id}
                {...category}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

const getCategories = unstable_cache(
  async () => {
    if (isDemoMode()) return getDemoCategories().slice(0, 4)

    const results = await meilisearch.searchDocuments({
      indexName: env.MEILISEARCH_CATEGORIES_INDEX,
      options: {
        limit: 4,
      },
    })

    return results.hits || []
  },
  ["categories-section"],
  { revalidate: 3600 }
)
