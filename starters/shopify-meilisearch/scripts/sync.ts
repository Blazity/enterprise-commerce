import isEqual from "lodash.isequal"

import { HIERARCHICAL_SEPARATOR } from "../constants/index"
import { storefrontClient } from "../lib/shopify/client"
import type { PlatformMenu, PlatformProduct } from "../lib/shopify/types"
import { searchClient } from "../lib/meilisearch/client"
import { env } from "../env.mjs"

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
    const enrichedProducts = await enrichProducts(allProducts, hierarchicalCategories.items, HIERARCHICAL_SEPARATOR)

    console.log("📥 Fetching current Meilisearch indices...")
    const { results: allIndexProducts } = await searchClient.getDocuments({
      indexName: env.MEILISEARCH_PRODUCTS_INDEX,
      options: {
        limit: 10000,
      },
    })
    const { results: allIndexCategories } = await searchClient.getDocuments({
      indexName: env.MEILISEARCH_CATEGORIES_INDEX,
      options: {
        limit: 10000,
      },
    })

    console.log("🔍 Calculating differences...")
    const deltaProducts = enrichedProducts.filter((product) => {
      return !isEqual(allIndexProducts.find((p) => p.id === product.id))
    })

    const deltaCategories = allCategories.filter((category) => !isEqual(allIndexCategories.find((c) => c.id === category.id)))

    if (deltaProducts.length === 0 && deltaCategories.length === 0) {
      console.log("✨ Nothing to sync, looks like you're all set!")
      return
    }

    if (deltaProducts.length > 0) {
      console.log(`📤 Updating ${deltaProducts.length} products in Meilisearch...`)
      await searchClient.updateDocuments({
        indexName: env.MEILISEARCH_PRODUCTS_INDEX,
        documents: deltaProducts,
      })
      console.log("✓ Products updated successfully")
    }

    if (deltaCategories.length > 0) {
      console.log(`📤 Updating ${deltaCategories.length} categories in Meilisearch...`)
      await searchClient.updateDocuments({
        indexName: env.MEILISEARCH_CATEGORIES_INDEX,
        documents: deltaCategories,
      })
      console.log("✓ Categories updated successfully")
    }

    console.log("🎉 Sync completed successfully!")
  } catch (error) {
    console.error("❌ Error during sync:", error instanceof Error ? error.message : error)
    throw error // Re-throw to ensure the process exits with an error code
  }
}

async function enrichProducts(products: PlatformProduct[], categories: PlatformMenu["items"], separator: string) {
  if (!categories.length) {
    return products
  }
  const categoryMap = await buildCategoryMap(categories)

  return products.map((product) => ({
    ...product,
    hierarchicalCategories: generateHierarchicalCategories(product.collections, categoryMap, separator),
  }))
}

async function buildCategoryMap(categories: PlatformMenu["items"]) {
  const categoryMap = new Map<string, string[]>()

  function traverse(items: PlatformMenu["items"], path: string[]) {
    for (const item of items) {
      const newPath = [...path, item.resource?.handle || ""]
      categoryMap.set(item.resource?.handle || "", newPath)
      if (item.items && item.items.length > 0) {
        traverse(item.items, newPath)
      }
    }
  }

  traverse(categories, [])

  return categoryMap
}

function generateHierarchicalCategories(collections: PlatformProduct["collections"], categoryMap: Map<string, string[]>, separator: string = " > ") {
  const hierarchicalCategories: { lvl0: string[]; lvl1: string[]; lvl2: string[] } = { lvl0: [], lvl1: [], lvl2: [] }

  collections.forEach(({ handle }) => {
    const path = categoryMap.get(handle)
    if (path) {
      if (path.length > 0 && !hierarchicalCategories.lvl0.includes(path[0])) {
        hierarchicalCategories.lvl0.push(path[0])
      }
      if (path.length > 1) {
        const lvl1Path = path.slice(0, 2).join(separator)
        if (!hierarchicalCategories.lvl1.includes(lvl1Path)) {
          hierarchicalCategories.lvl1.push(lvl1Path)
        }
      }
      if (path.length > 2) {
        const lvl2Path = path.slice(0, 3).join(separator)
        if (!hierarchicalCategories.lvl2.includes(lvl2Path)) {
          hierarchicalCategories.lvl2.push(lvl2Path)
        }
      }
    }
  })

  return hierarchicalCategories
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
