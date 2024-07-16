import { Metadata } from "next"
import { Product, WithContext } from "schema-dts"
import { getProduct } from "app/actions/product.actions"
import { env } from "env.mjs"
import { makeKeywords } from "utils/makeKeywords"
import { removeOptionsFromUrl } from "utils/productOptionsUtils"
import type { CommerceProduct } from "types"
import { slugToName } from "utils/slug-name"

interface ProductProps {
  params: { slug: string }
}

export async function generateMetadata({ params: { slug } }: ProductProps): Promise<Metadata> {
  const product = await getProduct(removeOptionsFromUrl(slug))

  const originalDescription = product?.seo?.description
  const originalTitle = product?.seo?.title
  const keywords = makeKeywords(product?.title)
  const lastCollection = product?.collections?.findLast(Boolean)

  return {
    metadataBase: new URL(env.LIVE_URL!),
    title: `${originalTitle || product?.title} | Blazity`,
    description: originalDescription || product?.description,
    generator: "Next.js",
    applicationName: "Next.js",
    referrer: "origin-when-cross-origin",
    keywords: keywords,
    category: lastCollection ? slugToName(lastCollection.handle) : "Search",
    creator: "Blazity",
    alternates: {
      canonical: `/product/${slug}`,
    },
    publisher: "Blazity",
  }
}

export function generateJsonLd(product: CommerceProduct, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.map((image) => image.url),
    ...(product.vendor && {
      brand: {
        "@type": "Brand",
        name: product.vendor,
      },
    }),
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "US",
      returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 30,
      returnMethod: "https://schema.org/ReturnByMail",
      returnFees: "https://schema.org/FreeReturn",
    },
    offers: {
      "@type": "Offer",
      url: `${env.LIVE_URL}/product/${slug}`,
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      price: product.priceRange.minVariantPrice.amount,
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
    },
  } satisfies WithContext<Product>
}
