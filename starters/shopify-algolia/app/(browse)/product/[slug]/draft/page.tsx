import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import type { CommerceProduct } from "types"

import { Breadcrumbs } from "components/breadcrumbs"

import { getAdminProduct, getProductByHandle } from "lib/shopify"
import type { PlatformProduct } from "lib/shopify/types"

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

export default async function Product(props: ProductProps) {
  const params = await props.params

  const { slug } = params

  return <ProductView slug={slug} />
}

export async function generateStaticParams() {
  return []
}

async function ProductView({ slug }: { slug: string }) {
  const product = await getDraftAwareProduct(slug)

  const { color } = getOptionsFromUrl(slug)
  const hasInvalidOptions = !hasValidOption(product?.variants, "color", color)

  if (!product || hasInvalidOptions) {
    return notFound()
  }

  const combination = getCombination(product as CommerceProduct, color)
  const hasOnlyOneVariant = product.variants.length <= 1

  return (
    <div className="relative mx-auto max-w-container-md px-4 xl:px-0">
      <main className="mx-auto max-w-container-sm">
        <Breadcrumbs className="mb-8" items={makeBreadcrumbs(product)} />
        <div className="grid grid-cols-1 gap-4 md:mx-auto md:max-w-screen-xl md:grid-cols-12 md:gap-8">
          <ProductTitle
            className="md:hidden"
            title={product.title}
            price={parseFloat(combination!.price!.amount).toFixed(2)}
            currency={combination?.price ? mapCurrencyToSign(combination.price?.currencyCode as CurrencyType) : "$"}
          />
          <ProductImages images={product.images} />
          <RightSection className="md:col-span-6 md:col-start-8 md:mt-0">
            <ProductTitle
              className="hidden md:col-span-4 md:col-start-9 md:block"
              title={product.title}
              price={parseFloat(combination!.price!.amount).toFixed(2)}
              currency={combination?.price ? mapCurrencyToSign(combination.price?.currencyCode as CurrencyType) : "$"}
            />
            {!hasOnlyOneVariant && <VariantsSection variants={product.variants} handle={product.handle} combination={combination} />}
            <p>{product.description}</p>
            <AddToCartButton className="mt-4" product={product} combination={combination} />
            <FavoriteMarker handle={product.handle} />
            <FaqSection />
          </RightSection>
        </div>
      </main>
    </div>
  )
}

async function getDraftAwareProduct(slug: string) {
  const draft = await draftMode()

  let product = await getProductByHandle(removeOptionsFromUrl(slug))
  if (draft.isEnabled && product) product = await getAdminProduct(product?.id)

  return product
}

function makeBreadcrumbs(product: PlatformProduct) {
  const lastCollection = product.collections?.findLast(Boolean)

  return {
    Home: "/",
    [lastCollection?.handle ? slugToName(lastCollection.handle) : "Products"]: lastCollection?.handle ? `/category/${lastCollection.handle}` : "/search",
    [product.title]: "",
  }
}
