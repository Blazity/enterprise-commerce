"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import type { PlatformCollection } from "lib/shopify/types"
import type { CommerceProduct } from "types"
import { ProductCard } from "components/product-card"
import { Button } from "components/ui/button"

interface CategoryLandingPageProps {
  collection: PlatformCollection
  products: CommerceProduct[]
  basePath?: string
}

export function CategoryLandingPage({ collection, products, basePath }: CategoryLandingPageProps) {
  const [showAllProducts, setShowAllProducts] = useState(false)

  const initialProductCount = 12
  const displayedProducts = showAllProducts ? products : products.slice(0, initialProductCount)
  const hasMoreProducts = products.length > initialProductCount

  return (
    <div className="mx-auto w-full md:max-w-container-md">
      {}
      {collection.image && (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg md:aspect-[21/9]">
          <Image
            src={collection.image.url}
            quality={90}
            alt={collection.image.altText || collection.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white md:p-8">
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">{collection.title}</h1>
          </div>
        </div>
      )}

      {}
      {!collection.image && (
        <div className="py-8">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">{collection.title}</h1>
        </div>
      )}

      {}
      {collection.descriptionHtml && (
        <div className="py-8">
          <div
            className="prose prose-lg max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: collection.descriptionHtml }}
          />
        </div>
      )}

      {}
      {products.length > 0 && (
        <div className="py-8">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight md:text-3xl">Featured Products</h2>

          {}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} {...product} className="h-full" prefetch={false} />
            ))}
          </div>

          {}
          {!showAllProducts && hasMoreProducts && (
            <div className="mt-8 flex justify-center">
              <Button onClick={() => setShowAllProducts(true)} className="w-full md:w-auto">
                Show More Products ({products.length - initialProductCount} more)
              </Button>
            </div>
          )}

          {}
          {showAllProducts && (
            <div className="mt-8 flex justify-center">
              <Link
                href={`/${basePath ? `${basePath}/` : ""}category/plp/${collection.handle}`}
                className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Browse All {collection.title} Products
              </Link>
            </div>
          )}
        </div>
      )}

      {}
      {products.length === 0 && (
        <div className="py-16 text-center">
          <h3 className="text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-2 text-gray-500">
            We&apos;re working on adding products to this collection. Check back soon!
          </p>
        </div>
      )}
    </div>
  )
}
