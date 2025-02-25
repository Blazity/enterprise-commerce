import isEqual from "lodash.isequal"

import { HIERARCHICAL_SEPARATOR } from "../constants/index"
import { storefrontClient } from "../lib/shopify/client"
import type { PlatformProduct } from "../lib/shopify/types"
import { searchClient } from "../lib/meilisearch/client"
import { env } from "../env.mjs"
import { isOptIn } from "utils/opt-in"
import { reviewsClient } from "lib/reviews/client"
import { CommerceProduct } from "types"
import { ProductEnrichmentBuilder } from "utils/enrich-product"

async function sync() {
  console.log("🚀 Starting sync process...")

  try {
    console.log("📦 Fetching products from Shopify...")
    const allProducts = await storefrontClient.getAllProducts()
    console.log(`✓ Found ${allProducts.length} products`)

    console.log("📑 Fetching categories from Shopify...")
    const allCategories = await storefrontClient.getAllCollections()
    console.log(`✓ Found ${allCategories.length} categories`)

    if (!allProducts.length || !allCategories.length) {
      console.warn("⚠️ No products or categories found, aborting sync")
      return
    }

    console.log("🌳 Fetching hierarchical collections...")
    const hierarchicalCategories = await storefrontClient.getHierarchicalCollections(env.SHOPIFY_HIERARCHICAL_NAV_HANDLE!)
    console.log(`✓ Found ${hierarchicalCategories.items.length} hierarchical categories`)

    console.log("🔄 Enriching products with hierarchical data...")
    const reviews = isOptIn("reviews") ? await reviewsClient.getAllProductReviews() : []

    const enrichedProducts = allProducts.map((product) =>
      new ProductEnrichmentBuilder(product).withHierarchicalCategories(hierarchicalCategories.items, HIERARCHICAL_SEPARATOR).withReviews(reviews).build()
    )

    console.log("📥 Fetching current Meilisearch indices...")
    const { results: allIndexProducts } = await searchClient.getDocuments({
      indexName: env.MEILISEARCH_PRODUCTS_INDEX,
      options: {
        limit: 10000,
      },
    })

    console.log(`✓ Found ${allIndexProducts.length} products in Meilisearch`)

    const { results: allIndexCategories } = await searchClient.getDocuments({
      indexName: env.MEILISEARCH_CATEGORIES_INDEX,
      options: {
        limit: 10000,
      },
    })
    console.log(`✓ Found ${allIndexCategories.length} categories in Meilisearch`)

    console.log("🔍 Calculating differences...")
    const deltaProducts = calculateProductDelta(enrichedProducts, allIndexProducts)
    const deltaCategories = calculateCategoryDelta(allCategories, allIndexCategories)

    await updateMeilisearchDocuments(env.MEILISEARCH_PRODUCTS_INDEX, deltaProducts, "products")
    await updateMeilisearchDocuments(env.MEILISEARCH_CATEGORIES_INDEX, deltaCategories, "categories")

    if (deltaProducts.length === 0 && deltaCategories.length === 0) {
      console.log("✨ Nothing to sync, looks like you're all set!")
      return
    }

    console.log("🎉 Sync completed successfully!")
  } catch (error) {
    console.error("❌ Error during sync:", error instanceof Error ? error.message : error)
    throw error // Re-throw to ensure the process exits with an error code
  }
}

async function updateMeilisearchDocuments<T extends Record<string, any>>(indexName: string, documents: T[], entityName: string) {
  if (documents.length === 0) return

  console.log(`📤 Updating ${documents.length} ${entityName} in Meilisearch...`)
  await searchClient.updateDocuments<T>({
    indexName,
    options: { primaryKey: "id" },
    documents,
  })
}

function calculateProductDelta(enrichedProducts: CommerceProduct[], allIndexProducts: any[]) {
  const allIndexProductsMap = new Map(allIndexProducts.map((product) => [product.id, product]))

  return enrichedProducts.reduce<Array<any>>((acc, product) => {
    const existingProduct = allIndexProductsMap.get(product.id)
    if (!existingProduct || !isEqual(product, existingProduct)) {
      acc.push(product)
    }
    return acc
  }, [])
}

function calculateCategoryDelta(categories: PlatformProduct["collections"], allIndexCategories: any[]) {
  const allIndexCategoriesMap = new Map(allIndexCategories.map((category) => [category.id, category]))

  return categories.reduce<Array<any>>((acc, category) => {
    const existingCategory = allIndexCategoriesMap.get(category.id)
    if (!existingCategory || !isEqual(category, existingCategory)) {
      acc.push(category)
    }
    return acc
  }, [])
}

sync()
  .then(() => {
    console.log("👋 Sync process finished")
    process.exit(0)
  })
  .catch((error) => {
    console.error("💥 Sync process failed:", error)
    process.exit(1)
  })
