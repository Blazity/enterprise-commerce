import { PlatformImage } from "@enterprise-commerce/core/platform/types"
import { Skeleton } from "components/Skeleton/Skeleton"
import Image from "next/image"

interface HeroSectionProps {
  image: PlatformImage | null | undefined
  title: string
  description: string | undefined
}

export function HeroSection({ image, title, description }: HeroSectionProps) {
  return (
    <div className="border-b border-black">
      <div className="max-w-container-lg mx-auto flex w-full flex-col-reverse justify-between lg:flex-row">
        <div className="shrink-1 flex basis-1/2 items-center justify-center bg-neutral-100 p-10 md:p-40">
          <Image
            width={400}
            height={400}
            className="size-[280px] object-contain"
            sizes="400px"
            alt={image?.altText || ""}
            priority
            src={image?.url || "/default-product-image.svg"}
          />
        </div>
        <div className="flex basis-1/2 flex-col items-center justify-start gap-16 px-4 py-20 md:items-start md:p-40">
          <h1 className="text-center text-5xl font-bold tracking-tighter sm:text-7xl md:text-left md:text-8xl">{title}</h1>
          {description ? <div className="text-3xl font-normal tracking-tight" dangerouslySetInnerHTML={{ __html: description }} /> : null}
        </div>
      </div>
    </div>
  )
}

export function HeroSectionSkeleton() {
  return (
    <div className="border-b border-black">
      <div className="max-w-container-lg mx-auto flex w-full flex-col-reverse justify-between lg:flex-row">
        <div className="shrink-1 flex basis-1/2 items-center justify-center bg-neutral-100 p-10 md:p-40">
          <Image width={400} height={400} className="size-[280px] object-contain" sizes="400px" alt={""} priority src={"/default-product-image.svg"} />
        </div>
        <div className="flex basis-1/2 flex-col items-center justify-start gap-16 px-4 py-20 md:items-start md:p-40">
          <Skeleton className="h-[96px] w-[280px] text-center text-5xl font-bold tracking-tighter sm:text-7xl md:text-left md:text-8xl" />
          <Skeleton className="h-[36px] w-[180px] text-3xl font-normal tracking-tight" />
        </div>
      </div>
    </div>
  )
}
