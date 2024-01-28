import { ApiType, shopifyApiProject } from "@shopify/api-codegen-preset"

export default {
  schema: "https://shopify.dev/storefront-graphql-direct-proxy/2024-01",
  documents: ["./packages/core/**/*.{js,ts,jsx,tsx}"],
  projects: {
    default: shopifyApiProject({
      apiType: ApiType.Storefront,
      apiVersion: "2024-01",
      documents: ["./packages/core/**/*.{js,ts,jsx,tsx}"],
      outputDir: "./types",
    }),
  },
}
