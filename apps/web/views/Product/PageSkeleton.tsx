import { Skeleton } from "components/Skeleton"

export function PageSkeleton() {
  return (
    <div className="max-w-container-md relative mx-auto px-4 xl:px-0">
      <div className="mb:pb-8 relative w-fit py-4 md:pt-12">
        <Skeleton className="mb-8 hidden size-8 md:block" />
      </div>
      <main className="max-w-container-sm mx-auto">
        <Skeleton className="mb-8 hidden h-6 w-[350px] md:block" />
        <div className="grid grid-cols-1 justify-center gap-10 md:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-10">
            <Skeleton className="h-[600px] w-[472px]" />
            <Skeleton className="h-[100px] w-[472px]" />
          </div>
          <div className="flex flex-col items-start pt-12">
            <div className="w-full pb-10">
              <Skeleton className="mb-6 h-[45px] w-[85%] text-[36px] leading-tight tracking-[-1.44px]" />
              <Skeleton className="h-[148px] w-[95%] text-[17px] leading-tight tracking-normal text-slate-600" />
              <Skeleton className="mt-4 h-[54px] w-[200px] text-[36px] font-bold tracking-[-1.44px]" />
            </div>
            <div className="flex w-full flex-wrap gap-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-[14px] w-[50px]" />
                <Skeleton className="h-[36px] w-[180px]" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-[14px] w-[50px]" />
                <Skeleton className="h-[36px] w-[180px]" />
              </div>
            </div>
            <Skeleton className="my-8 h-[61px] w-[250px]" />
            <div className="mt-12  w-full">
              <Skeleton className="my-2 h-[50px] w-full" />
              <Skeleton className="my-2 h-[50px] w-full" />
              <Skeleton className="my-2 h-[50px] w-full" />
              <Skeleton className="my-2 h-[50px] w-full" />
            </div>
          </div>
        </div>
      </main>
      <section className="overflow-hidden py-40">
        <h2 className="mb-10 text-[26px] font-normal tracking-[-0.78px]">You might also like</h2>
        <div className="flex gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex w-[280px] shrink-0 flex-col gap-4 md:h-[430px]">
              <Skeleton className="h-[320px]" key={index} />
              <div>
                <Skeleton className="h-[25px] w-3/4" />
                <Skeleton className="mt-1 h-[32px] w-12" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
