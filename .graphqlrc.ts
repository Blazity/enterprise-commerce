import { ApiType, shopifyApiProject } from "@shopify/api-codegen-preset"

export default {
  schema: ["https://shopify.dev/storefront-graphql-direct-proxy/2024-01", "https://shopify.dev/admin-graphql-direct-proxy/2024-01"],
  documents: ["./packages/core/**/*.{js,ts,jsx,tsx}"],
  projects: {
    default: shopifyApiProject({
      apiType: ApiType.Storefront,
      apiVersion: "2024-01",
      documents: ["./packages/core/**/*.storefront.{js,ts,jsx,tsx}", "./packages/core/**/fragments/*.{js,ts,jsx,tsx}"],
      outputDir: "./packages/core/platform/shopify/types",
    }),
    admin: shopifyApiProject({
      apiType: ApiType.Admin,
      apiVersion: "2024-01",
      documents: ["./packages/core/**/*.admin.{js,ts,jsx,tsx}"],
      outputDir: "./packages/core/platform/shopify/types/admin",
    }),
  },
}
