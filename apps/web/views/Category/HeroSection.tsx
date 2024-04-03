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
        <div className="text-3xl font-normal tracking-tight" dangerouslySetInnerHTML={{ __html: `` }} />
      </div>
    </div>
  )
}

export function HeroSectionSkeleton() {
  return null
}
