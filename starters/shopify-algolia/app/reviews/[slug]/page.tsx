import { notFound, redirect } from "next/navigation"
import { getProduct, getProductReviews } from "app/actions/product.actions"
import { Breadcrumbs } from "components/Breadcrumbs/Breadcrumbs"

import { BackButton } from "views/Product/BackButton"
import { StarRating } from "views/Product/StarRating"
import { PaginationSection } from "views/Listing/PaginationSection"

import { removeOptionsFromUrl } from "utils/productOptionsUtils"
import type { CommerceProduct } from "types"

export { generateMetadata } from "./metadata"

export const revalidate = 86400

export interface ProductReviewsPageProps {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function ProductReviews({ params: { slug }, searchParams }: ProductReviewsPageProps) {
  return <ProductReviewsView searchParams={searchParams} slug={slug} />
}

async function ProductReviewsView({ slug, searchParams }: { slug: string; searchParams: ProductReviewsPageProps["searchParams"] }) {
  const limit = 20
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1

  const product = await getProduct(removeOptionsFromUrl(slug))
  const { reviews, total: totalReviews } = await getProductReviews(removeOptionsFromUrl(slug), { limit, page })

  const totalPages = Math.ceil(totalReviews / limit)

  if (!product) {
    return notFound()
  }

  if (totalReviews <= 0) {
    return (
      <div className="max-w-container-md relative mx-auto mb-20 px-4 xl:px-0">
        <div className="relative w-fit py-4 md:pt-12">
          <BackButton href={`/product/${product.handle}`} className="mb-8 hidden md:block" />
        </div>

        <main className="container mx-auto max-w-5xl px-4 md:px-6">
          <Breadcrumbs className="mb-8" items={makeBreadcrumbs(product)} />
          <div className="my-20 text-center">
            <h1 className="text-xl font-semibold sm:text-2xl">No reviews yet</h1>
            <span className="text-lg">Be the First to Review</span>
          </div>
        </main>
      </div>
    )
  }

  if (page > Math.ceil(totalReviews / limit)) {
    redirect(`/reviews/${slug}`)
  }

  return (
    <div className="max-w-container-md relative mx-auto mb-20 px-4 xl:px-0">
      <div className="relative w-fit py-4 md:pt-12">
        <BackButton href={`/product/${product.handle}`} className="mb-8 hidden md:block" />
      </div>

      <main className="container mx-auto max-w-5xl px-4 md:px-6">
        <Breadcrumbs className="mb-8" items={makeBreadcrumbs(product)} />
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-xl font-semibold sm:text-2xl">
              Customer Reviews
              <span className="ml-1 text-xl text-gray-500">({totalReviews})</span>
            </h1>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {reviews.map(({ created_at, body, rating, reviewer }) => (
              <div key={created_at} className="rounded-lg bg-gray-200 p-4">
                <div className="flex flex-col justify-between space-y-2">
                  <div className="mb-1 flex w-full items-center justify-between gap-2">
                    <h3 className="font-semibold">{reviewer.name}</h3>
                    <span className="text-sm text-gray-500">
                      {new Date(created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <StarRating rating={rating} />
                </div>
                {body}
              </div>
            ))}
          </div>
        </div>
        <PaginationSection queryParams={searchParams} totalPages={totalPages} />
      </main>
    </div>
  )
}

function makeBreadcrumbs(product: CommerceProduct) {
  const lastCollection = product.collections?.findLast(Boolean)

  return {
    Home: "/",
    [lastCollection?.title || "Products"]: lastCollection?.handle ? `/category/${lastCollection.handle}` : "/search",
    [product.title]: `/product/${product.handle}`,
    Reviews: "",
  }
}
