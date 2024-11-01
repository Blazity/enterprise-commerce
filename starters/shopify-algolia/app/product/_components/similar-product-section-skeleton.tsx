import { Skeleton } from "components/ui/skeleton"

export function SimilarProductsSectionSkeleton() {
  return (
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
  )
}
