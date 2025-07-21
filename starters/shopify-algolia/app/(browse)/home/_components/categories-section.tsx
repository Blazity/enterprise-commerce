import { CategoryCard } from "components/category-card"
import { categoryItems } from "utils/category-items"

export async function CategoriesSection() {
  return (
    <div className="mt-20 px-4 py-20">
      <div className="mx-auto w-full max-w-container-sm">
        <h2 className="mb-8 text-left text-4xl font-semibold">Featured Categories</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categoryItems.map((category, index) => (
            <CategoryCard key={category.handle} {...category} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
