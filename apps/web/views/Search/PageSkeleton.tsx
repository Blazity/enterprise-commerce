import { Skeleton } from "components/Skeleton"

export function PageSkeleton() {
  return (
    <div className="max-w-container-md mx-auto flex min-h-screen w-full flex-col gap-12 px-4 py-12 md:flex-row md:gap-24 md:py-24 xl:px-0 ">
      <div className="hidden flex-col gap-0 md:mt-16 md:flex">
        <Skeleton className="mb-6 flex h-[35px] min-w-[250px] md:block" />
        <Skeleton className="flex h-[400px] min-w-[250px] md:block" />
      </div>

      <div className="flex w-full flex-col">
        <div className="mb-6 flex w-full flex-wrap items-center justify-between">
          <div className="flex h-[144px] w-full flex-col gap-2 pb-8 md:h-[112px]">
            <h1 className="text-[32px] font-semibold text-black">Products</h1>
            <div className="block h-[24px] md:hidden" />
          </div>

          <section className="grid w-full grid-cols-[repeat(_auto-fill,minmax(280px,1fr)_)] items-center gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton className="h-[430px] w-full md:h-[401px] md:w-[280px]" key={index} />
            ))}
          </section>
        </div>
      </div>
    </div>
  )
}
