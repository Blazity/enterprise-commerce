import { env } from "env.mjs"

export const sharedMetadata = {
  metadataBase: new URL(env.LIVE_URL || "https://commerce.blazity.com"),
  openGraph: {
    title: "Next.js Enterprise Commerce | Blazity",
    description: "Enterprise-grade Shopify storefront with Algolia middle layer, built on Next.js",
    images: ["/opengraph-image.jpg"],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Next.js Enterprise Commerce | Blazity",
    description: "Enterprise-grade Shopify storefront with Algolia middle layer, built on Next.js",
    creator: "@blazity",
    images: ["/opengraph-image.jpg"],
  },
}
