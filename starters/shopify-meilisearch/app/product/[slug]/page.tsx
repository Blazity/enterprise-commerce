import { Suspense } from "react"
import { notFound } from "next/navigation"

import { isDemoMode } from "utils/demo-utils"
import { slugToName } from "utils/slug-name"
import { CurrencyType, mapCurrencyToSign } from "utils/map-currency-to-sign"
import { getCombination, getOptionsFromUrl, hasValidOption, removeOptionsFromUrl } from "utils/product-options-utils"

import { Breadcrumbs } from "components/breadcrumbs"

import { BackButton } from "views/product/back-button"
import { FavoriteMarker } from "views/product/favorite-marker"
import { SimilarProductsSection } from "views/product/similar-products-section"
import { SimilarProductsSectionSkeleton } from "views/product/similar-product-section-skeleton"
import { VariantsSection } from "views/product/variants-section"
import { ProductTitle } from "views/product/product-title"
import { ProductImages } from "views/product/product-images"
import { RightSection } from "views/product/right-section"
import { FaqSection } from "views/product/faq-section"
import { AddToCartButton } from "views/product/add-to-cart-button"
import { ReviewsSection } from "views/product/reviews-section"

import type { CommerceProduct } from "types"

import { generateJsonLd } from "./metadata"
import { getProduct, getProducts } from "lib/meilisearch"

export const revalidate = 86400
export const dynamic = "force-static"
export const dynamicParams = true

interface ProductProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  if (isDemoMode()) return []

  const { results } = await getProducts({
    limit: 50,
    fields: ["handle"],
  })

  return results.map(({ handle }) => ({ slug: handle }))
}

export default async function Product({ params: { slug } }: ProductProps) {
  const product = await getProduct(removeOptionsFromUrl(slug))

  const { color } = getOptionsFromUrl(slug)
  const hasInvalidOptions = !hasValidOption(product?.variants, "color", color)

  if (!product || hasInvalidOptions) {
    return notFound()
  }

  const combination = getCombination(product, color)
  const lastCollection = product?.collections?.findLast(Boolean)
  const hasOnlyOneVariant = product.variants.length <= 1
  const combinationPrice = combination?.price?.amount || null

  return (
    <div className="relative mx-auto max-w-container-md px-4 xl:px-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd(product, slug)) }}></script>
      <div className="mb:pb-8 relative flex w-full items-center justify-center gap-10 py-4 md:pt-12">
        <BackButton className="left-2 mb-8 hidden md:block xl:absolute" />
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
          <ProductImages images={product.images} />
          <RightSection className="md:col-span-6 md:col-start-8 md:mt-0">
            <ProductTitle
              className="hidden md:col-span-4 md:col-start-9 md:block"
              title={product.title}
              price={combinationPrice}
              currency={combination?.price ? mapCurrencyToSign(combination.price?.currencyCode as CurrencyType) : "$"}
            />
            {!hasOnlyOneVariant && <VariantsSection variants={product.variants} handle={product.handle} combination={combination} />}
            <p>{product.description}</p>
            <AddToCartButton className="mt-4" product={product} combination={combination} />
            <FavoriteMarker handle={product.handle} />
            <FaqSection />
          </RightSection>
        </div>
        <Suspense>
          <ReviewsSection avgRating={product.avgRating} productHandle={product.handle} productId={product.id} slug={slug} summary={product.reviewsSummary} />
        </Suspense>
        <Suspense fallback={<SimilarProductsSectionSkeleton />}>
          <SimilarProductsSection collectionHandle={lastCollection?.handle} slug={slug} />
        </Suspense>
      </main>
    </div>
  )
}

function makeBreadcrumbs(product: CommerceProduct) {
  const lastCollection = product.collections?.findLast(Boolean)

  return {
    Home: "/",
    [lastCollection?.handle ? slugToName(lastCollection?.handle) : "Products"]: lastCollection?.handle ? `/category/${lastCollection.handle}` : "/search",
    [product.title]: "",
  }
}
