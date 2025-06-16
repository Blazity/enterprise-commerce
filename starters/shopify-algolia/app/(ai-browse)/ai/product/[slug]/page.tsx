import { Suspense } from "react"
import { notFound } from "next/navigation"

import { isDemoMode } from "utils/demo-utils"
import { slugToName } from "utils/slug-name"
import { CurrencyType, mapCurrencyToSign } from "utils/map-currency-to-sign"
import { removeOptionsFromUrl } from "utils/product-options-utils"
import {
  getCombinationByMultiOption,
  getCombinationByVisualOption,
  getImagesForCarousel,
  getMultiOptionFromSlug,
  getOriginalOptionValue,
  getVisualOptionFromSlug,
  hasValidMultiOption,
  hasValidVisualOption,
  removeMultiOptionFromSlug,
  removeVisualOptionFromSlug,
} from "utils/visual-variant-utils"

import { Breadcrumbs } from "components/breadcrumbs"

import { FavoriteMarker } from "components/product/favorite-marker"
import { SimilarProductsSection } from "components/product/similar-products-section"
import { SimilarProductsSectionSkeleton } from "components/product/similar-product-section-skeleton"
import { VariantDropdowns } from "components/product/variant-dropdowns"
import { ProductTitle } from "components/product/product-title"
import { ProductImages } from "components/product/product-images"
import { RightSection } from "components/product/right-section"
import { FaqSection } from "components/product/faq-section"
import { AddToCartButton } from "components/product/add-to-cart-button"
import { ReviewsSection } from "components/product/reviews-section"

import type { CommerceProduct } from "types"

import { generateJsonLd } from "./metadata"
import { getProduct, getProducts } from "lib/algolia"
import { ContextReporter } from "app/(ai-browse)/_components/context-reporter"

export const revalidate = 86400
export const dynamic = "force-static"
export const dynamicParams = true

interface ProductProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  if (isDemoMode()) return []

  const { hits } = await getProducts({
    hitsPerPage: 50,
    attributesToRetrieve: ["handle"],
  })

  return hits.map(({ handle }) => ({ slug: handle }))
}

export default async function Product(props: ProductProps) {
  const params = await props.params

  const { slug } = params
  console.log(slug)

  const multiOptions = getMultiOptionFromSlug(slug)
  const baseHandle = Object.keys(multiOptions).length > 0 
    ? removeMultiOptionFromSlug(slug) 
    : removeVisualOptionFromSlug(slug)
  
  const product = await getProduct(baseHandle || removeOptionsFromUrl(slug))

  if (!product) {
    return notFound()
  }

  let combination
  let hasInvalidOptions = false

  if (Object.keys(multiOptions).length > 0) {
    hasInvalidOptions = !hasValidMultiOption(product.variants || [], multiOptions)
    combination = getCombinationByMultiOption(product.variants, multiOptions)
  } else {
    const visualValue = getVisualOptionFromSlug(slug)
    hasInvalidOptions = !hasValidVisualOption(product?.variants || [], visualValue)
    combination = getCombinationByVisualOption(product.variants, visualValue)
  }

  if (hasInvalidOptions) {
    return notFound()
  }

  const hasOnlyOneVariant = product.variants.length <= 1
  const combinationPrice = combination?.price?.amount || null

  let visualValue: string | null = null
  if (Object.keys(multiOptions).length > 0) {
    if (multiOptions.color) {
      visualValue = getOriginalOptionValue(product.variants, 'color', multiOptions.color)
    }
    if (!visualValue && Object.keys(multiOptions).length > 0) {
      const firstOption = Object.entries(multiOptions)[0]
      visualValue = getOriginalOptionValue(product.variants, firstOption[0], firstOption[1])
    }
  } else {
    visualValue = getVisualOptionFromSlug(slug)
  }
  
  const { images: imagesToShow, activeIndex } = getImagesForCarousel(product.images, visualValue)

  return (
    <div className="relative px-4 md:mx-auto md:max-w-container-md">
      <ContextReporter products={[product]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd(product, slug)) }}></script>
      <div className="mb:pb-8 relative flex w-full items-center justify-center gap-10 py-4 md:pt-12">
        <div className="mx-auto w-full max-w-container-sm">
          <Breadcrumbs className="mb-8" items={makeBreadcrumbs(product)} />
        </div>
      </div>
      <main className="mx-auto max-w-container-sm">
        <div className="grid grid-cols-1 gap-4 md:mx-auto md:max-w-screen-xl md:grid-cols-12 md:gap-8">
          <ProductTitle
            className="md:hidden"
            title={product.title}
            price={combinationPrice}
            currency={combination?.price ? mapCurrencyToSign(combination.price?.currencyCode as CurrencyType) : "$"}
          />
          <ProductImages 
            key={slug}
            images={imagesToShow}
            initialActiveIndex={activeIndex}
          />
          <RightSection className="md:col-span-6 md:col-start-8 md:mt-0">
            <ProductTitle
              className="hidden md:col-span-4 md:col-start-9 md:block"
              title={product.title}
              price={combinationPrice}
              currency={combination?.price ? mapCurrencyToSign(combination.price?.currencyCode as CurrencyType) : "$"}
            />
            {!hasOnlyOneVariant && <VariantDropdowns variants={product.variants} handle={product.handle} combination={combination} currentSlug={slug} />}
            <p>{product.description}</p>
            <div className="flex flex-col gap-2">
              <AddToCartButton className="mt-4" product={product} combination={combination} />
              <FavoriteMarker handle={slug} />
            </div>
            <FaqSection />
          </RightSection>
        </div>
        <Suspense>
          <ReviewsSection avgRating={product.avgRating} productHandle={product.handle} productId={product.id} slug={slug} summary={product.reviewsSummary} />
        </Suspense>
        <Suspense fallback={<SimilarProductsSectionSkeleton />}>
          <SimilarProductsSection basePath="ai" objectID={product.objectID} slug={slug} />
        </Suspense>
      </main>
    </div>
  )
}

function makeBreadcrumbs(product: CommerceProduct) {
  const lastCollection = product.collections?.findLast(Boolean)

  return {
    Home: "/",
    [lastCollection?.handle ? slugToName(lastCollection?.handle) : "Products"]: lastCollection?.handle ? `/ai/category/${lastCollection.handle}` : "/ai/search",
    [product.title]: "",
  }
}
