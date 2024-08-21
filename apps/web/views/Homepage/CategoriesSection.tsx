import { PlatformCollection } from "@enterprise-commerce/core/platform/types"
import { CategoryCard } from "components/CategoryCard/CategoryCard"
import { cn } from "utils/cn"

export async function CategoriesSection({ categories }: { categories: Pick<PlatformCollection, "handle" | "title" | "id" | "image">[] }) {
  if (!categories?.length) return null

  return (
    <div className="max-w-container-md mx-auto my-20 w-full gap-10 space-y-4 px-4">
      <h2 className="mb-12 text-2xl font-semibold">Featured Categories</h2>
      <div className="grid auto-rows-fr gap-4 sm:grid-cols-2">
        {categories.map((category, index) => {
          return (
            <CategoryCard
              className={cn("shadow-md md:shadow-none", {
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
  )
}
