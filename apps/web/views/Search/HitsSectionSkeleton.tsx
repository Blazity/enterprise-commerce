import { Skeleton } from "components/Skeleton"

export function HitsSectionSkeleton() {
  return (
    <section className="grid w-full max-w-[950px] grid-cols-[repeat(_auto-fit,minmax(300px,1fr)_)] items-center gap-4">
      {Array.from({ length: 6 }).map((_) => (
        <Skeleton className="h-[380px] w-[300px]" />
      ))}
    </section>
  )
}
