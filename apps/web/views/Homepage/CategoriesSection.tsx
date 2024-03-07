import { Skeleton } from "components/Skeleton"
import Link from "next/link"

export function CategoriesSection() {
  return (
    <div className="max-w-container-md mx-auto flex flex-col gap-16 px-4 py-20 md:py-32 xl:px-0">
      <div className="basis-1/3 text-center text-5xl font-normal tracking-tighter sm:min-w-[280px] md:text-left md:text-6xl">
        <h2>Shop by Category</h2>
      </div>
      <div className="group mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <Link key={index} href={`/category/abc`}>
            <div className="relative h-[260px] w-full overflow-hidden rounded-2xl ">
              <div className="absolute inset-0 size-full bg-neutral-100 transition-all hover:bg-neutral-50 hover:blur">
                <img alt="" src={`/category-placeholder-${index + 1}.svg`} className="absolute right-0 top-0 h-full" />
              </div>
              <h3 className="absolute bottom-8 left-8 text-2xl leading-none tracking-tight text-black">Fashion</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

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
