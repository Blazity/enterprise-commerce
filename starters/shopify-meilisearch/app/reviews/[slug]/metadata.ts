import { makeKeywords } from "utils/make-keywords"
import { removeOptionsFromUrl } from "utils/product-options-utils"
import type { ProductReviewsPageProps } from "./page"
import { Metadata } from "next"
import { getProduct } from "lib/meilisearch"
import { env } from "env.mjs"

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
