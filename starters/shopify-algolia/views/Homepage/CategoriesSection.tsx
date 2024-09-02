import { meilisearch } from "clients/search"
import { Skeleton } from "components/Skeleton/Skeleton"
import { env } from "env.mjs"
import { unstable_cache } from "next/cache"
import Image from "next/image"
import Link from "next/link"
import { getDemoCategories, isDemoMode } from "utils/demoUtils"

export async function CategoriesSection() {
  const categories = await getCategories()

  if (!categories.length) return null

  return (
    <div className="max-w-container-md mx-auto flex w-full flex-col gap-16 px-4 py-20 md:py-32 xl:px-0">
      <div className="basis-1/3 text-center text-5xl font-normal tracking-tighter sm:min-w-[280px] md:text-left md:text-6xl">
        <h2>Shop by Category</h2>
      </div>
      <div className="group mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((singleCategory, index) => (
          <Link className="group/bcl relative h-[260px] w-full overflow-hidden rounded-2xl" key={singleCategory.handle + index} href={`/category/${singleCategory.handle}`}>
            <div className="absolute inset-0 -z-10 size-full bg-neutral-100 transition-all group-hover/bcl:bg-neutral-50 group-hover/bcl:blur">
              <Image fill alt="" src={`/category-placeholder-${index + 1}.svg`} className="absolute -top-8 right-0 h-full" />
            </div>
            <h3 className="absolute bottom-8 left-8 text-[29px]/[18px] tracking-tight text-black">{singleCategory.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}

const getCategories = unstable_cache(
  async () => {
    if (isDemoMode()) return getDemoCategories().slice(0, 6)

    const results = await meilisearch.searchDocuments({
      indexName: env.MEILISEARCH_CATEGORIES_INDEX,
      options: {
        limit: 6,
      },
    })

    return results.hits || []
  },
  ["categories-section"],
  { revalidate: 3600 }
)

export function CategoriesSectionSkeleton() {
  return (
    <div className="max-w-container-md mx-auto flex flex-col gap-16 px-4 py-20 md:py-32 xl:px-0">
      <div className="basis-1/3 text-center text-5xl font-normal tracking-tighter sm:min-w-[280px] md:text-left md:text-6xl">
        <h2>Shop by Category</h2>
      </div>
      <div className="group mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="relative h-[260px] w-full overflow-hidden rounded-2xl" />
        ))}
      </div>
    </div>
  )
}
