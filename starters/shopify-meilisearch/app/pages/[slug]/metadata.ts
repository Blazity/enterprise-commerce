import { Metadata } from "next"
import { getPage } from "app/actions/page.actions"
import type { StaticPageProps } from "./page"

export async function generateMetadata(props: StaticPageProps): Promise<Metadata> {
  const params = await props.params
  const page = await getPage(params.slug)

  return {
    title: page?.seo?.title || page?.title,
    description: page?.seo?.description || page?.bodySummary,
    referrer: "origin-when-cross-origin",
    creator: "Blazity",
    publisher: "Blazity",
  }
}
