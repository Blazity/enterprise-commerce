import { getPage } from "lib/shopify"
import { Metadata } from "next"

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await props.params).slug
  const page = await getPage(slug)

  return {
    title: page?.seo?.title || page?.title,
    description: page?.seo?.description || page?.bodySummary,
    referrer: "origin-when-cross-origin",
    creator: "Blazity",
    publisher: "Blazity",
  }
}
