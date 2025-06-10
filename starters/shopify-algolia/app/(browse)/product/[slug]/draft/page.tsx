import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import type { CommerceProduct } from "types"

import { Breadcrumbs } from "components/breadcrumbs"

import { getAdminProduct, getProductByHandle } from "lib/shopify"

import { getCombination, getOptionsFromUrl, hasValidOption, removeOptionsFromUrl } from "utils/product-options-utils"
import { VariantsSection } from "components/product/variants-section"
import { ProductTitle } from "components/product/product-title"
import { CurrencyType, mapCurrencyToSign } from "utils/map-currency-to-sign"
import { ProductImages } from "components/product/product-images"
import { RightSection } from "components/product/right-section"
import { AddToCartButton } from "components/product/add-to-cart-button"
import { FavoriteMarker } from "components/product/favorite-marker"
import { FaqSection } from "components/product/faq-section"

import { slugToName } from "utils/slug-name"

export const dynamic = "force-static"

export const revalidate = 86400

export const dynamicParams = true

interface ProductProps {
  params: Promise<{ slug: string }>
}

export default async function DraftProduct(props: ProductProps) {
  const params = await props.params
  const { slug } = params

  if (!(await draftMode()).isEnabled) {
    return notFound()
  }

  const { color } = getOptionsFromUrl(slug)
  const productHandle = removeOptionsFromUrl(slug)

  const product = await getProductByHandle(productHandle)
  const adminProduct = product?.id ? await getAdminProduct(product.id) : null

  if (!adminProduct || !hasValidOption(adminProduct.variants, "color", color)) {
    return notFound()
  }

  const combination = getCombination(adminProduct as CommerceProduct, color)
  const hasOnlyOneVariant = adminProduct.variants.length <= 1
  const combinationPrice = combination?.price?.amount || null

  return (
    <div className="relative mx-auto max-w-container-md px-4 xl:px-0">
      <div className="mb:pb-8 relative flex w-full items-center justify-center gap-10 py-4 md:pt-12">
        <div className="mx-auto w-full max-w-container-sm">
          <Breadcrumbs className="mb-8" items={makeBreadcrumbs(adminProduct as CommerceProduct)} />
        </div>
      </div>
      <main className="mx-auto max-w-container-sm">
        <div className="grid grid-cols-1 gap-4 md:mx-auto md:max-w-screen-xl md:grid-cols-12 md:gap-8">
          <ProductTitle
            className="md:hidden"
            title={adminProduct.title}
            price={combinationPrice}
            currency={combination?.price ? mapCurrencyToSign(combination.price?.currencyCode as CurrencyType) : "$"}
          />
          <ProductImages images={adminProduct.images} />
          <RightSection className="md:col-span-6 md:col-start-8 md:mt-0">
            <ProductTitle
              className="hidden md:col-span-4 md:col-start-9 md:block"
              title={adminProduct.title}
              price={combinationPrice}
              currency={combination?.price ? mapCurrencyToSign(combination.price?.currencyCode as CurrencyType) : "$"}
            />
            {!hasOnlyOneVariant && <VariantsSection variants={adminProduct.variants} handle={adminProduct.handle} combination={combination} />}
            <p>{adminProduct.description}</p>
            <AddToCartButton className="mt-4" product={adminProduct as CommerceProduct} combination={combination} />
            <FavoriteMarker handle={slug} />
            <FaqSection />
          </RightSection>
        </div>
      </main>
    </div>
  )
}

export async function generateStaticParams() {
  return []
}

function makeBreadcrumbs(product: CommerceProduct) {
  const lastCollection = product.collections?.findLast(Boolean)

  return {
    Home: "/",
    [lastCollection?.handle ? slugToName(lastCollection?.handle) : "Products"]: lastCollection?.handle ? `/category/${lastCollection.handle}` : "/search",
    [product.title]: "",
  }
}
