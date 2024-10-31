import { getPage } from "lib/shopify"
import { Metadata } from "next"

export async function generateMetadata({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> {
  const page = await getPage(slug)

  return {
    title: page?.seo?.title || page?.title,
    description: page?.seo?.description || page?.bodySummary,
    referrer: "origin-when-cross-origin",
    creator: "Blazity",
    publisher: "Blazity",
  }
}
