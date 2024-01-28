import { ProductView } from "views/Product/ProductView"

export const revalidate = 3600

export const dynamicParams = true

export const dynamic = "force-static"

interface ProductProps {
  params: { slug: string }
}

export default async function Product({ params: { slug } }: ProductProps) {
  return <ProductView slug={slug} />
}

export async function generateStaticParams() {
  // const posts = await fetch("https://.../posts").then((res) => res.json())

  // return posts.map((post) => ({
  //   slug: post.slug,
  // }))
  return []
}
