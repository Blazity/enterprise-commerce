import type { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { unstable_cache } from "next/cache"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { storefrontClient } from "clients/storefrontClient"
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs"

import { getCombination, getOptionsFromUrl, hasValidOption, removeOptionsFromUrl } from "utils/productOptionsUtils"
import { BackButton } from "views/Product/BackButton"
import { DetailsSection } from "views/Product/DetailsSection"
import { GallerySection } from "views/Product/GallerySection"
import { InfoSection } from "views/Product/InfoSection"
import { PageSkeleton } from "views/Product/PageSkeleton"
import { SimilarProductsSection } from "views/Product/SimilarProductsSection"
import { SimilarProductsSectionSkeleton } from "views/Product/SimilarProductsSectionSkeleton"
import { VariantsSection } from "views/Product/VariantsSection"
import type { CommerceProduct } from "types"
import { slugToName } from "utils/slug-name"

export const dynamic = "force-static"

export const revalidate = 1

export const dynamicParams = true

interface ProductProps {
  params: { slug: string }
}

export default async function Product({ params: { slug } }: ProductProps) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ProductView slug={slug} />
    </Suspense>
  )
}

export async function generateStaticParams() {
  return []
}

async function ProductView({ slug }: { slug: string }) {
  const product = await getDraftAwareProduct(slug)

  const { color, size } = getOptionsFromUrl(slug)
  const hasInvalidOptions = !hasValidOption(product?.variants, "color", color) || !hasValidOption(product?.variants, "size", size)

  if (!product || hasInvalidOptions) {
    return notFound()
  }

  const combination = getCombination(product as CommerceProduct, color, size)
  const lastCollection = product?.collections?.findLast(Boolean)
  const hasOnlyOneVariant = product.variants.length <= 1

  return (
    <div className="max-w-container-md relative mx-auto px-4 xl:px-0">
      <div className="mb:pb-8 relative w-fit py-4 md:pt-12">
        <BackButton className="mb-8 hidden md:block" />
      </div>
      <main className="max-w-container-sm mx-auto">
        <Breadcrumbs className="mb-8 hidden md:block" items={makeBreadcrumbs(product)} />
        <div className="grid grid-cols-1 justify-center gap-10 md:grid-cols-2 lg:gap-20">
          <GallerySection images={product.images} />
          <div className="flex flex-col items-start pt-12">
            <InfoSection className="pb-10" title={product.title} description={product.descriptionHtml} combination={combination} />
            {hasOnlyOneVariant ? null : <VariantsSection combination={combination} handle={product.handle} variants={product.variants} />}
            <DetailsSection slug={slug} product={product as CommerceProduct} />
          </div>
        </div>
      </main>
      <Suspense fallback={<SimilarProductsSectionSkeleton />}>
        <SimilarProductsSection collectionHandle={lastCollection?.handle} slug={slug} />
      </Suspense>
    </div>
  )
}

async function getDraftAwareProduct(slug: string) {
  const draft = draftMode()

  let product = await storefrontClient.getProductByHandle(removeOptionsFromUrl(slug))
  if (draft.isEnabled && product) product = await getAdminProduct(product?.id)

  return product
}

const getAdminProduct = unstable_cache(async (id: string) => storefrontClient.getAdminProduct(id), ["admin-product-by-handle"], { revalidate: 1 })

function makeBreadcrumbs(product: PlatformProduct) {
  const lastCollection = product.collections?.findLast(Boolean)

  return {
    Home: "/",
    [lastCollection?.handle ? slugToName(lastCollection.handle) : "Products"]: lastCollection?.handle ? `/category/${lastCollection.handle}` : "/search",
    [product.title]: "",
  }
}
