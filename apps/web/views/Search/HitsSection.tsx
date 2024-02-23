import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { Button } from "components/Button"
import Link from "next/link"

interface HitsSectionProps {
  hits: PlatformProduct[]
}

export function HitsSection({ hits }: HitsSectionProps) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {hits.map((singleResult) => (
        <div className="group relative overflow-hidden rounded-lg" key={singleResult.id}>
          <Link className="absolute inset-0 z-10" href={`/products/${singleResult.handle}`}>
            <span className="sr-only">View</span>
          </Link>
          <img
            alt="Product 1"
            className="h-60 w-full object-cover"
            height={singleResult.images[0].height || 300}
            src={singleResult.images[0].url}
            style={{
              aspectRatio: "400/300",
              objectFit: "cover",
            }}
            width={singleResult.images[0].width || 400}
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
