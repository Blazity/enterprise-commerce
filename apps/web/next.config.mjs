import withBundleAnalyzer from "@next/bundle-analyzer"
import withPlugins from "next-compose-plugins"

/**
 * @type {import('next').NextConfig}
 */
// TODO: enable it back when it starts working
const config = withPlugins([[withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })]], {
  reactStrictMode: true,
  transpilePackages: ["@enterprise-commerce/design-system"],
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: { ppr: true },
  images: {
    deviceSizes: [320, 640, 750, 828, 1080, 1200],
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
      { source: "/healthz", destination: "/api/health" },
      { source: "/api/healthz", destination: "/api/health" },
      { source: "/health", destination: "/api/health" },
      { source: "/ping", destination: "/api/health" },
      {
        source: "/search/:second",
        destination: "/search?second=:second",
      },
    ]
  },
})

export default config
