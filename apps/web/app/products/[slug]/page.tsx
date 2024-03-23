import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { getProduct } from "app/actions/product.actions"
import { storefrontClient } from "clients/storefrontClient"
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import { getCombination, getOptionsFromUrl, hasValidOption, removeOptionsFromUrl } from "utils/productOptionsUtils"
import { BackButton } from "views/Product/BackButton"
import { DetailsSection } from "views/Product/DetailsSection"
import { FavoriteMarker } from "views/Product/FavoriteMarker"
import { GallerySection } from "views/Product/GallerySection"
import { InfoSection } from "views/Product/InfoSection"
import { PageSkeleton } from "views/Product/PageSkeleton"
import { SimilarProductsSection } from "views/Product/SimilarProductsSection"
import { SimilarProductsSectionSkeleton } from "views/Product/SimilarProductsSectionSkeleton"
import { generateJsonLd } from "./metadata"

export const revalidate = 3600

export const dynamicParams = true

interface ProductProps {
  params: { slug: string }
}

export { generateMetadata } from "./metadata"

export default async function Product({ params: { slug } }: ProductProps) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ProductView slug={slug} />
    </Suspense>
  )
}

async function ProductView({ slug }: { slug: string }) {
  const product = await getDraftAwareProduct(slug)

  const { color, size } = getOptionsFromUrl(slug)
  const hasInvalidOptions = !hasValidOption(product?.variants, "color", color) || !hasValidOption(product?.variants, "size", size)

  if (!product || hasInvalidOptions) {
    return notFound()
  }

  const combination = getCombination(product, color, size)
  const lastCollection = product?.collections?.findLast(Boolean)

  return (
    <div className="max-w-container-md relative mx-auto px-4 xl:px-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd(product, slug)) }}></script>
      <div className="mb:pb-8 relative w-fit py-4 md:pt-12">
        <BackButton className="mb-8 hidden md:block" />
      </div>
      <main className="max-w-container-sm mx-auto">
        <Breadcrumbs className="mb-8 hidden md:block" items={makeBreadcrumbs(product)} />
        <div className="grid grid-cols-1 justify-center gap-10 md:grid-cols-2 lg:gap-20">
          <GallerySection images={product.images}>
            <FavoriteMarker handle={product.handle} />
          </GallerySection>
          <div className="flex flex-col items-start pt-12">
            <InfoSection className="pb-10" title={product.title} description={product.descriptionHtml} combination={combination} />
            <DetailsSection slug={slug} product={product} />
          </div>
        </div>
      </main>
      <Suspense fallback={<SimilarProductsSectionSkeleton />}>
        <SimilarProductsSection collection={lastCollection?.title} slug={slug} />
      </Suspense>
    </div>
  )
}

async function getDraftAwareProduct(slug: string) {
  const draft = draftMode()

  let product = await getProduct(removeOptionsFromUrl(slug))
  if (draft.isEnabled && product) product = await storefrontClient.getAdminProduct(product?.id)

  return product
}

function makeBreadcrumbs(product: PlatformProduct) {
  const lastCollection = product.collections.findLast(Boolean)

  return {
    Home: "/",
    [lastCollection?.title || "Products"]: lastCollection?.handle ? `/category/${lastCollection.handle}` : "/search",
    [product.title]: "",
  }
}
