import { getProduct } from "app/actions/product.actions"
import { env } from "process"
import { makeKeywords } from "utils/makeKeywords"
import { removeOptionsFromUrl } from "utils/productOptionsUtils"
import type { ProductReviewsPageProps } from "./page"
import { Metadata } from "next"

export async function generateMetadata({ params: { slug } }: ProductReviewsPageProps): Promise<Metadata> {
  const product = await getProduct(removeOptionsFromUrl(slug))

  const originalTitle = product?.seo?.title
  const title = originalTitle || product?.title
  const keywords = makeKeywords(`${product?.title} reviews rating feedback`)
  const lastCollection = product?.collections?.findLast(Boolean)

  return {
    metadataBase: new URL(env.LIVE_URL!),
    title: `${title} Reviews & Feedback | Blazity`,
    description: `Discover What People Are Saying About ${title} `,
    generator: "Next.js",
    applicationName: "Next.js",
    referrer: "origin-when-cross-origin",
    keywords: keywords,
    category: lastCollection?.title || "",
    creator: "Blazity",
    alternates: {
      canonical: `/reviews/${slug}`,
    },
    publisher: "Blazity",
  }
}
