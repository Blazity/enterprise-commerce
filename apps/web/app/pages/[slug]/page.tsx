import { storefrontClient } from "clients/storefrontClient"
import { format } from "date-fns/format"
import { Metadata } from "next"
import { unstable_cache } from "next/cache"

export const revalidate = 3600

export const dynamicParams = true

export const dynamic = "force-static"

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

export default async function StaticPage({ params: { slug } }: { params: { slug: string } }) {
  const page = await getPage(slug)

  if (!page) return null

  return (
    <div className="max-w-container-md relative mx-auto px-4 py-12 md:py-24 xl:px-0">
      <main className="max-w-container-sm mx-auto">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{page.title}</h1>
        <div className="mt-8 text-xl" dangerouslySetInnerHTML={{ __html: page.body }} />
        <p className="mt-8 md:mt-12">This document was last updated: {format(page.updatedAt, "MMMM do, yyyy")}</p>
      </main>
    </div>
  )
}

export async function generateStaticParams() {
  const pages = (await getAllPages()) || []

  return pages.map((page) => ({
    slug: page.handle,
  }))
}

const getPage = unstable_cache(async (handle: string) => await storefrontClient.getPage(handle), ["page"], { revalidate: 3600 })
const getAllPages = unstable_cache(async () => await storefrontClient.getAllPages(), ["page"], { revalidate: 3600 })
