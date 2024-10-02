import { ApiType, shopifyApiProject } from "@shopify/api-codegen-preset"

export default {
  schema: ["https://shopify.dev/storefront-graphql-direct-proxy/2024-01", "https://shopify.dev/admin-graphql-direct-proxy/2024-01"],
  documents: ["./**/*.{js,ts,jsx,tsx}"],
  projects: {
    default: shopifyApiProject({
      apiType: ApiType.Storefront,
      apiVersion: "2024-01",
      documents: ["./lib/shopify/**/*.storefront.{js,ts,jsx,tsx}", "./lib/shopify/**/fragments/*.{js,ts,jsx,tsx}"],
      outputDir: "./lib/shopify/types",
    }),
    admin: shopifyApiProject({
      apiType: ApiType.Admin,
      apiVersion: "2024-01",
      documents: ["./lib/shopify/**/*.admin.{js,ts,jsx,tsx}"],
      outputDir: "./lib/shopify/types/admin",
    }),
  },
}
