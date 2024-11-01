import { Skeleton } from "components/ui/skeleton"
import { SimilarProductsSectionSkeleton } from "./similar-product-section-skeleton"

export function PageSkeleton() {
  return (
    <div className="relative mx-auto max-w-container-md px-4 xl:px-0">
      <div className="mb:pb-8 relative w-fit py-4 md:pt-12">
        <Skeleton className="mb-8 hidden size-8 md:block" />
      </div>
      <main className="mx-auto max-w-container-sm">
        <Skeleton className="mb-2 h-6 w-3/5 md:mb-8 md:block md:w-[350px]" />
        <div className="grid grid-cols-1 justify-center gap-10 md:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-16">
            <Skeleton className="h-[600px] w-full md:w-[472px]" />
            <Skeleton className="h-[100px] w-full md:w-[472px]" />
          </div>
          <div className="flex flex-col items-start pt-12">
            <div className="w-full pb-10">
              <Skeleton className="mb-6 h-[45px] w-[85%] text-[36px] leading-tight tracking-[-1.44px]" />
              <Skeleton className="h-[148px] w-[95%] text-[17px] leading-tight tracking-normal text-neutral-500" />
              <Skeleton className="mt-4 h-[54px] w-[200px] text-[36px] font-bold tracking-[-1.44px]" />
            </div>
            <VariantsSectionSkeleton />
            <AddToCartButtonSkeleton />
            <FaqSectionSkeleton />
          </div>
        </div>
      </main>
      <SimilarProductsSectionSkeleton />
    </div>
  )
}

export function VariantsSectionSkeleton() {
  return (
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
  )
}

export function FaqSectionSkeleton() {
  return (
    <div className="mt-12  w-full">
      <Skeleton className="my-2 h-[50px] w-full" />
      <Skeleton className="my-2 h-[50px] w-full" />
      <Skeleton className="my-2 h-[50px] w-full" />
      <Skeleton className="my-2 h-[50px] w-full" />
    </div>
  )
}

export function AddToCartButtonSkeleton() {
  return <Skeleton className="my-8 h-[61px] w-[250px]" />
}
