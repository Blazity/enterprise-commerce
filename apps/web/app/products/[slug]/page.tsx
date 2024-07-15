import { notFound } from "next/navigation"
import { Suspense } from "react"
import { getProduct, getProductReviews } from "app/actions/product.actions"
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs"

import { getCombination, getOptionsFromUrl, hasValidOption, removeOptionsFromUrl } from "utils/productOptionsUtils"
import { BackButton } from "views/Product/BackButton"
import { DetailsSection } from "views/Product/DetailsSection"
import { FavoriteMarker } from "views/Product/FavoriteMarker"
import { GallerySection } from "views/Product/GallerySection"
import { InfoSection } from "views/Product/InfoSection"
import { PageSkeleton } from "views/Product/PageSkeleton"
import { SimilarProductsSection } from "views/Product/SimilarProductsSection"
import { SimilarProductsSectionSkeleton } from "views/Product/SimilarProductsSectionSkeleton"
import { VariantsSection } from "views/Product/VariantsSection"
import { slugToName } from "utils/slug-name"

import { generateJsonLd } from "./metadata"
import { ReviewsSection } from "views/Product/ReviewsSection"

import type { CommerceProduct } from "types"
import { isDemoMode } from "utils/demoUtils"
import { meilisearch } from "clients/meilisearch"
import { env } from "env.mjs"

export const revalidate = 3600
export const dynamic = "force-static"
export const dynamicParams = true

interface ProductProps {
  params: { slug: string }
}

export { generateMetadata } from "./metadata"

export async function generateStaticParams() {
  if (isDemoMode()) return []

  const index = await meilisearch?.getIndex<CommerceProduct>(env.MEILISEARCH_PRODUCTS_INDEX)

  const { results } = await index?.getDocuments({
    limit: 1000,
    fields: ["handle"],
  })

  return results.map(({ handle }) => ({ slug: handle }))
}

export default async function Product({ params: { slug } }: ProductProps) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ProductView slug={slug} />
    </Suspense>
  )
}

async function ProductView({ slug }: { slug: string }) {
  const [product, { reviews, total: totalReviews }] = await Promise.all([
    await getProduct(removeOptionsFromUrl(slug)),
    await getProductReviews(removeOptionsFromUrl(slug), { limit: 16 }),
  ])

  const { color } = getOptionsFromUrl(slug)
  const hasInvalidOptions = !hasValidOption(product?.variants, "color", color)

  if (!product || hasInvalidOptions) {
    return notFound()
  }

  const combination = getCombination(product, color)
  const lastCollection = product?.collections?.findLast(Boolean)
  const hasOnlyOneVariant = product.variants.length <= 1

  return (
    <div className="max-w-container-md relative mx-auto px-4 xl:px-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd(product, slug)) }}></script>
      <div className="mb:pb-8 relative w-fit py-4 md:pt-12">
        <BackButton className="mb-8 hidden md:block" />
      </div>
      <main className="max-w-container-sm mx-auto">
        <Breadcrumbs className="mb-8" items={makeBreadcrumbs(product)} />

        <div className="grid grid-cols-1 justify-center gap-10 md:grid-cols-2 lg:gap-20">
          <GallerySection images={product.images}>
            <FavoriteMarker handle={product.handle} />
          </GallerySection>
          <div className="flex flex-col items-start pt-12">
            <InfoSection
              className="pb-6"
              title={product.title}
              description={product.descriptionHtml}
              combination={combination}
              avgRating={product.avgRating}
              totalReviews={product.totalReviews}
            />
            {hasOnlyOneVariant ? null : <VariantsSection combination={combination} handle={product.handle} className="pb-4" variants={product.variants} />}

            <DetailsSection slug={slug} product={product} />
          </div>
        </div>
        <Suspense>
          <ReviewsSection
            avgRating={product.avgRating}
            productHandle={product.handle}
            productId={product.id}
            reviews={reviews?.map((review) => ({ ...review, author: review.reviewer.name })) || []}
            total={totalReviews}
            summary={product.reviewsSummary}
          />
        </Suspense>
      </main>
      <Suspense fallback={<SimilarProductsSectionSkeleton />}>
        <SimilarProductsSection collectionHandle={lastCollection?.handle} slug={slug} />
      </Suspense>
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
