import { Suspense } from "react"
import { notFound } from "next/navigation"

import { isDemoMode } from "utils/demo-utils"
import { slugToName } from "utils/slug-name"
import { CurrencyType, mapCurrencyToSign } from "utils/map-currency-to-sign"
import { getCombination, getOptionsFromUrl, hasValidOption, removeOptionsFromUrl } from "utils/product-options-utils"

import { Breadcrumbs } from "components/breadcrumbs"

import { FavoriteMarker } from "components/product/favorite-marker"
import { SimilarProductsSection } from "components/product/similar-products-section"
import { SimilarProductsSectionSkeleton } from "components/product/similar-product-section-skeleton"
import { VariantsSection } from "components/product/variants-section"
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

  const product = await getProduct(removeOptionsFromUrl(slug))

  const { color } = getOptionsFromUrl(slug)
  const hasInvalidOptions = !hasValidOption(product?.variants, "color", color)

  if (!product || hasInvalidOptions) {
    return notFound()
  }

  const combination = getCombination(product, color)
  const hasOnlyOneVariant = product.variants.length <= 1
  const combinationPrice = combination?.price?.amount || null

  return (
    <div className="relative mx-auto max-w-container-md px-4 xl:px-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd(product, slug)) }}></script>
      <ContextReporter products={[product]} />
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
