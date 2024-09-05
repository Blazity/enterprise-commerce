import withBundleAnalyzer from "@next/bundle-analyzer"
import withVercelToolbar from "@vercel/toolbar/plugins/next"
import withPlugins from "next-compose-plugins"

/**
 * @type {import('next').NextConfig}
 */
const config = withPlugins([[withVercelToolbar(), withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })]], {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    imageSizes: [256, 384],
    deviceSizes: [320, 500, 750, 1080, 1200],
    minimumCacheTTL: 31_556_926,
    // formats: ["image/avif", "image/webp"],
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        port: "",
      },
    ],
  },
  rewrites() {
    return [
      { source: "/", destination: "/home" },
      { source: "/health", destination: "/api/health" },
      {
        source: "/search/:second",
        destination: "/search?second=:second",
      },
    ]
  },
})

export default config
