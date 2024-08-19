import { Skeleton } from "components/Skeleton/Skeleton"

export function PageSkeleton() {
  return (
    <div className="max-w-container-md mx-auto w-full px-4 py-12 md:py-24 xl:px-0">
      <div className="flex min-h-screen w-full flex-col gap-12 md:flex-row md:gap-24">
        <div className="hidden flex-col gap-0 md:mt-16 lg:flex">
          <Skeleton className="mb-6 flex h-[35px] min-w-[250px] md:block" />
          <Skeleton className="flex h-[400px] min-w-[250px] md:block" />
        </div>

        <div className="flex w-full flex-col">
          <div className="mb-6 flex w-full flex-wrap items-center justify-between">
            <div className="flex h-[112px] w-full flex-col gap-2 pb-8 ">
              <div className="flex items-center justify-between">
                <Skeleton className="size-5 lg:hidden" />
              </div>
              <div className="block h-[24px] lg:hidden" />
            </div>

            <section className="grid w-full grid-cols-[repeat(_auto-fill,minmax(140px,1fr)_)] items-start gap-4 gap-y-8 md:grid-cols-[repeat(_auto-fill,minmax(200px,1fr)_)] xl:grid-cols-[repeat(_auto-fill,minmax(280px,1fr)_)]">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex h-[258px] w-full flex-col gap-4 md:h-[430px]">
                  <Skeleton className="h-[320px]" />
                  <div>
                    <Skeleton className="h-[25px] w-3/4" />
                    <Skeleton className="mt-1 h-[32px] w-12" />
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
