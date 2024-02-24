import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { Button } from "components/Button"
import Image from "next/image"
import Link from "next/link"

interface HitsSectionProps {
  hits: PlatformProduct[]
}

export async function HitsSection({ hits }: HitsSectionProps) {
  return (
    <div className="grid w-full grid-cols-[repeat(_auto-fit,minmax(300px,1fr)_)] items-center gap-4">
      {hits.map((singleResult, idx) => (
        <div className="group relative overflow-hidden rounded-lg" key={singleResult.id}>
          <Link className="absolute inset-0 z-10" href={`/products/${singleResult.handle}`}>
            <span className="sr-only">View</span>
          </Link>
          <Image
            alt="Product 1"
            className="h-60 w-full object-cover"
            height={300}
            src={singleResult.images[0].url}
            style={{
              aspectRatio: "400/300",
              objectFit: "contain",
            }}
            sizes="400px"
            width={400}
            priority={idx === 0}
          />
          <div className="bg-white p-4 dark:bg-gray-950">
            <h3 className="text-lg font-semibold md:text-xl">{singleResult.title}</h3>
            <h4 className="text-base font-semibold md:text-lg">${singleResult.minPrice || 1337}</h4>
            <Button className="mt-2">Add to Cart</Button>
          </div>
        </div>
      ))}
    </div>
  )
}
