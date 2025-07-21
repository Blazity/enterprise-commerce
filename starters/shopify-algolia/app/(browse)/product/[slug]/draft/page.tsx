import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import type { CommerceProduct } from "types"

import { Breadcrumbs } from "components/breadcrumbs"

import { getAdminProduct, getProductByHandle } from "lib/shopify"

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
import { VariantDropdowns } from "components/product/variant-dropdowns"
import { ProductTitle } from "components/product/product-title"
import { CurrencyType, mapCurrencyToSign } from "utils/map-currency-to-sign"
import { ProductImages } from "components/product/product-images"
import { RightSection } from "components/product/right-section"
import { AddToCartButton } from "components/product/add-to-cart-button"
import { FavoriteMarker } from "components/product/favorite-marker"
import { FaqAccordionItem, FaqSectionClient } from "components/product/faq-section/faq-section-client"
import { ShopifyRichText } from "components/product/faq-section/shopify-rich-text"

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

  const multiOptions = getMultiOptionFromSlug(slug)
  const baseHandle =
    Object.keys(multiOptions).length > 0 ? removeMultiOptionFromSlug(slug) : removeVisualOptionFromSlug(slug)

  const productHandle = baseHandle || removeOptionsFromUrl(slug)
  const product = await getProductByHandle(productHandle)
  const adminProduct = product?.id ? await getAdminProduct(product.id) : null

  if (!adminProduct) {
    return notFound()
  }

  let combination
  let hasInvalidOptions = false

  if (Object.keys(multiOptions).length > 0) {
    hasInvalidOptions = !hasValidMultiOption(adminProduct.variants || [], multiOptions)
    combination = getCombinationByMultiOption(adminProduct.variants, multiOptions)
  } else {
    const visualValue = getVisualOptionFromSlug(slug)
    hasInvalidOptions = !hasValidVisualOption(adminProduct?.variants || [], visualValue)
    combination = getCombinationByVisualOption(adminProduct.variants, visualValue)
  }

  if (hasInvalidOptions) {
    return notFound()
  }

  const hasOnlyOneVariant = adminProduct.variants.length <= 1
  const combinationPrice = combination?.price?.amount || null

  let visualValue: string | null = null
  if (Object.keys(multiOptions).length > 0) {
    if (multiOptions.color) {
      visualValue = getOriginalOptionValue(adminProduct.variants, "color", multiOptions.color)
    }
    if (!visualValue && Object.keys(multiOptions).length > 0) {
      const firstOption = Object.entries(multiOptions)[0]
      visualValue = getOriginalOptionValue(adminProduct.variants, firstOption[0], firstOption[1])
    }
  } else {
    visualValue = getVisualOptionFromSlug(slug)
  }

  const { images: imagesToShow, activeIndex } = getImagesForCarousel(adminProduct.images, visualValue)

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
          <ProductImages key={slug} images={imagesToShow} initialActiveIndex={activeIndex} />
          <RightSection className="md:col-span-6 md:col-start-8 md:mt-0">
            <ProductTitle
              className="hidden md:col-span-4 md:col-start-9 md:block"
              title={adminProduct.title}
              price={combinationPrice}
              currency={combination?.price ? mapCurrencyToSign(combination.price?.currencyCode as CurrencyType) : "$"}
            />
            {!hasOnlyOneVariant && (
              <VariantDropdowns
                variants={adminProduct.variants}
                handle={adminProduct.handle}
                combination={combination}
                currentSlug={slug}
              />
            )}
            <p>{adminProduct.description}</p>
            <AddToCartButton className="mt-4" product={adminProduct as CommerceProduct} combination={combination} />
            <FavoriteMarker handle={slug} />

            <FaqSectionClient
              defaultOpenSections={adminProduct.productDetailsMetafield?.value ?? getDefaultFaqAccordionItemValue()}
            >
              <FaqAccordionItem title={getDefaultFaqAccordionItemValue()[0]}>
                <ShopifyRichText
                  data={adminProduct.productDetailsMetafield?.value || getDefaultFaqAccordionItemRichText()}
                  className="prose prose-sm max-w-none"
                />
              </FaqAccordionItem>
              <FaqAccordionItem title="Size and Fit">
                <p>
                  Est veniam qui aute nisi occaecat ad non velit anim commodo sit proident. Labore sint officia nostrud
                  eu est fugiat nulla velit sint commodo. Excepteur sit ut anim pariatur minim adipisicing dolore sit
                  dolore cupidatat. Amet reprehenderit ipsum aute minim incididunt adipisicing est.
                </p>
              </FaqAccordionItem>
              <FaqAccordionItem title="Free Delivery and Returns">
                <p>
                  Aliqua Lorem ullamco officia cupidatat cupidatat. Nostrud occaecat ex in Lorem. Et occaecat
                  adipisicing do aliquip duis aliquip enim culpa nulla. Nulla quis aute ex eu est ullamco enim
                  incididunt fugiat proident laboris. Laboris sint ad et nostrud velit fugiat fugiat proident enim sit
                  irure elit. Ut amet elit labore cupidatat id consectetur sint fugiat esse excepteur pariatur. Tempor
                  pariatur dolor eiusmod proident ad incididunt officia labore fugiat consectetur. Sunt veniam officia
                  officia eiusmod minim incididunt est sit esse excepteur non cupidatat voluptate ea. Do excepteur sunt
                  nostrud eu do id nisi dolore laboris ea ullamco magna eu. Eiusmod irure dolore amet velit laboris
                  excepteur cupidatat est cupidatat minim ut anim id. Deserunt velit ex exercitation consequat quis
                  magna pariatur laboris elit minim eiusmod anim.
                </p>
              </FaqAccordionItem>
              <FaqAccordionItem title="Supplier Information">
                <p>
                  Aliqua ut ex irure eu officia dolore velit et occaecat pariatur excepteur nostrud ad. Ea reprehenderit
                  sint culpa excepteur adipisicing ipsum esse excepteur officia culpa adipisicing nostrud. Nulla Lorem
                  voluptate tempor officia id mollit do est amet dolor nulla. Sint sunt consequat non in reprehenderit
                  Lorem velit enim cillum enim. Consequat occaecat exercitation consequat nisi veniam. Ipsum est
                  reprehenderit cupidatat nulla minim anim deserunt consequat ipsum anim ea tempor.
                </p>
              </FaqAccordionItem>
            </FaqSectionClient>
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
    [lastCollection?.handle ? slugToName(lastCollection?.handle) : "Products"]: lastCollection?.handle
      ? `/category/${lastCollection.handle}`
      : "/search",
    [product.title]: "",
  }
}

function getDefaultFaqAccordionItemRichText() {
  return '{"type":"root","children":[{"listType":"unordered","type":"list","children":[{"type":"list-item","children":[{"type":"text","value":"Super for the muscles"}]},{"type":"list-item","children":[{"type":"text","value":"Various types and color variants"}]},{"type":"list-item","children":[{"type":"text","value":"Outdoor, or indoor - you define the place where you want to exercise"}]},{"type":"list-item","children":[{"type":"text","value":"100% Plastic from "},{"type":"text","value":"recycling the materials","bold":true}]}]}]}'
}

function getDefaultFaqAccordionItemValue() {
  return ["Product Details"]
}
