import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { meilisearch } from "clients/meilisearch"
import { Breadcrumbs } from "components/Breadcrumbs"
import { unstable_cache } from "next/cache"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { ComparisonOperators, FilterBuilder } from "utils/filterBuilder"

import { getOptionsFromUrl, getProductPrice, hasValidOption, removeOptionsFromUrl } from "utils/productOptionsUtils"
import { AddToCartButton } from "views/Product/AddToCartButton"
import { BackButton } from "views/Product/BackButton"
import { FaqSection } from "views/Product/FaqSection"
import { GallerySection } from "views/Product/GallerySection"
import { InfoSection } from "views/Product/InfoSection"
import { SimilarProductsSection } from "views/Product/SimilarProductsSection"
import VariantsSection from "views/Product/VariantsSection"

export const revalidate = 3600

export const dynamicParams = true

export const dynamic = "force-static"

interface ProductProps {
  params: { slug: string }
}

export default async function Product({ params: { slug } }: ProductProps) {
  return (
    <Suspense fallback={null}>
      <ProductView slug={slug} />
    </Suspense>
  )
}

async function ProductView({ slug }: { slug: string }) {
  const product = await getProduct(removeOptionsFromUrl(slug))

  const { color, size } = getOptionsFromUrl(slug)
  const hasInvalidOptions = !hasValidOption(product?.variants, "color", color) || !hasValidOption(product?.variants, "size", size)

  if (!product || hasInvalidOptions) {
    return notFound()
  }

  const defaultColor = product.flatOptions?.["Color"]?.find(Boolean) ?? null
  const defaultSize = product.flatOptions?.["Size"]?.find(Boolean) ?? null
  const price = getProductPrice(product.variants, size ?? defaultSize, color ?? defaultColor)

  return (
    <div className="max-w-container-md relative mx-auto px-4 xl:px-0">
      <div className="mb:pb-8 relative w-fit py-4 md:pt-12">
        <BackButton className="mb-8 hidden md:block" />
      </div>
      <main className="max-w-container-sm mx-auto">
        {/* TODO: xd */}
        <Breadcrumbs className="mb-8 hidden md:block" items={{ Home: "/", [product.collections[0].title]: "/", [product.title]: "" }} />
        <div className="grid grid-cols-1 justify-center gap-10 md:grid-cols-2 lg:gap-20">
          <GallerySection images={product.images} />
          <div className="flex flex-col items-start pt-12">
            <InfoSection className="pb-10" title={product.title} description={product.descriptionHtml} price={price} />
            <VariantsSection flatOptions={product.flatOptions} variants={product.variants} />
            <AddToCartButton className="my-8" />
            <FaqSection />
          </div>
        </div>
      </main>
      <SimilarProductsSection />
    </div>
  )
}

export async function generateStaticParams() {
  return []
}

const getProduct = unstable_cache(
  async (handle: string) => {
    const index = await meilisearch?.getIndex<PlatformProduct>("products")
    const documents = await index?.getDocuments({ filter: new FilterBuilder().where("handle", ComparisonOperators.Equal, handle).build(), limit: 1 })

    return documents.results.find(Boolean) || null
  },
  ["product-by-handle"],
  { revalidate: 3600 }
)
