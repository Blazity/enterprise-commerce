import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { getProduct } from "app/actions"
import { storefrontClient } from "clients/storefrontClient"
import { Breadcrumbs } from "components/Breadcrumbs"
import { env } from "env.mjs"
import { Metadata } from "next"
import nextDynamic from "next/dynamic"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { makeKeywords } from "utils/makeKeywords"

import { getOptionsFromUrl, getProductPrice, hasValidOption, removeOptionsFromUrl } from "utils/productOptionsUtils"
import { AddToCartButton } from "views/Product/AddToCartButton"
import { BackButton } from "views/Product/BackButton"
import { FaqSection } from "views/Product/FaqSection"
import { GallerySection } from "views/Product/GallerySection"
import { InfoSection } from "views/Product/InfoSection"
import { PageSkeleton, VariantsSectionSkeleton } from "views/Product/PageSkeleton"
import { SimilarProductsSection } from "views/Product/SimilarProductsSection"
import { SimilarProductsSectionSkeleton } from "views/Product/SimilarProductsSectionSkeleton"

const VariantsSection = nextDynamic(() => import("views/Product/VariantsSection").then((mod) => mod.VariantsSection), { loading: VariantsSectionSkeleton })
const VercelToolbar = nextDynamic(() => import("@vercel/toolbar/next").then((mod) => mod.VercelToolbar))

export const revalidate = 3600

export const dynamicParams = true

export const dynamic = "force-static"

interface ProductProps {
  params: { slug: string }
}

export async function generateMetadata({ params: { slug } }: ProductProps): Promise<Metadata> {
  const product = await getProduct(removeOptionsFromUrl(slug))

  const originalDescription = product?.seo.description
  const originalTitle = product?.seo.title
  const keywords = makeKeywords(product?.title)
  const lastCollection = product?.collections.findLast(Boolean)

  return {
    metadataBase: new URL(env.LIVE_URL),
    title: `${originalTitle || product?.title} | Blazity`,
    description: originalDescription || product?.description,
    generator: "Next.js",
    applicationName: "Next.js",
    referrer: "origin-when-cross-origin",
    keywords: keywords,
    category: lastCollection?.title,
    creator: "Blazity",
    alternates: {
      canonical: "/products/vans-old-skool-butterfly-true-white-black-size_9-color_white",
    },
    publisher: "Blazity",
  }
}

export default async function Product({ params: { slug } }: ProductProps) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ProductView slug={slug} />
    </Suspense>
  )
}

async function ProductView({ slug }: { slug: string }) {
  const draft = draftMode()

  let product = await getProduct(removeOptionsFromUrl(slug))

  if (draft.isEnabled && product) product = await storefrontClient.getAdminProduct(product?.id)

  const { color, size } = getOptionsFromUrl(slug)
  const hasInvalidOptions = !hasValidOption(product?.variants, "color", color) || !hasValidOption(product?.variants, "size", size)

  if (!product || hasInvalidOptions) {
    return notFound()
  }

  const hasOnlyOneVariant = product.variants.length <= 1
  const defaultColor = product.flatOptions?.["Color"]?.find(Boolean) ?? null
  const defaultSize = product.flatOptions?.["Size"]?.find(Boolean) ?? null
  const price = getProductPrice(product.variants, size ?? defaultSize, color ?? defaultColor)
  const lastCollection = product.collections.findLast(Boolean)

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
            <InfoSection className="pb-10" title={product.title} description={product.descriptionHtml} price={price} />
            {hasOnlyOneVariant ? null : <VariantsSection flatOptions={product.flatOptions} variants={product.variants} />}
            <AddToCartButton className="my-8" />
            <FaqSection className="mt-12" />
          </div>
        </div>
      </main>
      <Suspense fallback={<SimilarProductsSectionSkeleton />}>
        <SimilarProductsSection collection={lastCollection?.title} slug={slug} />
      </Suspense>
      <VercelToolbar />
    </div>
  )
}

function makeBreadcrumbs(product: PlatformProduct) {
  const lastCollection = product.collections.findLast(Boolean)

  return {
    Home: "/",
    [lastCollection?.title || "Products"]: lastCollection?.handle ? `/categories/${lastCollection.handle}` : "/search",
    [product.title]: "",
  }
}

export async function generateStaticParams() {
  return []
}
