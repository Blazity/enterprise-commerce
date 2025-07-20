import { env } from "env.mjs"
import { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL(env.LIVE_URL || "https://commerce.blazity.com"),
  title: {
    template: "%s | Enterprise Commerce",
    default: "Enterprise Commerce",
  },
  description: "AI-FIRST NEXT.JS STOREFRONT FOR COMPOSABLE COMMERCE",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}