import isEqual from "lodash.isequal"
import omit from "lodash.omit"

import { HIERARCHICAL_SEPARATOR } from "../constants/index"
import { storefrontClient } from "../lib/shopify/client"
import type { PlatformProduct } from "../lib/shopify/types"
import { searchClient } from "../lib/algolia/client"
import { env } from "../env.mjs"
import { isOptIn } from "utils/opt-in"
import { reviewsClient } from "lib/reviews/client"
import { ProductEnrichmentBuilder } from "utils/enrich-product"
import type { Review } from "lib/reviews/types"

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
    const reviews = isOptIn("reviews")
      ? await (async () => {
          console.log("🔄 Fetching reviews from Judge...")
          const reviews = await reviewsClient.getAllProductReviews()
          console.log(`✓ Found ${reviews.length} reviews`)
          return reviews
        })()
      : []

    const enrichedProducts = allProducts.map((product) =>
      new ProductEnrichmentBuilder(product).withHierarchicalCategories(hierarchicalCategories.items, HIERARCHICAL_SEPARATOR).withReviews(reviews).build()
    )

    console.log("📥 Fetching current Algolia indices...")
    const { hits: allIndexProducts } = await searchClient.getAllResults({
      indexName: env.ALGOLIA_PRODUCTS_INDEX,
      browseParams: {},
    })

    console.log(`✓ Found ${allIndexProducts.length} products in Algolia`)

    const { hits: allIndexCategories } = await searchClient.getAllResults({
      indexName: env.ALGOLIA_CATEGORIES_INDEX,
    })

    console.log(`✓ Found ${allIndexCategories.length} categories in Algolia`)

    console.log("🔍 Calculating differences...")
    const deltaProducts = calculateProductDelta(enrichedProducts, allIndexProducts)
    const deltaCategories = calculateCategoryDelta(allCategories, allIndexCategories)

    await updateAlgoliaDocuments(env.ALGOLIA_PRODUCTS_INDEX, deltaProducts, "products")
    await updateAlgoliaDocuments(env.ALGOLIA_CATEGORIES_INDEX, deltaCategories, "categories")

    if (isOptIn("reviews") && env.ALGOLIA_REVIEWS_INDEX) {
      const { hits: allIndexReviews } = await searchClient.getAllResults({
        indexName: env.ALGOLIA_REVIEWS_INDEX,
        browseParams: {},
      })
      console.log(`✓ Found ${allIndexReviews.length} reviews in Algolia`)
      const deltaReviews = calculateReviewDelta(reviews, allIndexReviews)
      await updateAlgoliaDocuments(env.ALGOLIA_REVIEWS_INDEX, deltaReviews, "reviews")
      console.log(`✓ Updated ${deltaReviews.length} reviews in Algolia`)
    }

    if (deltaProducts.length === 0 && deltaCategories.length === 0) {
      console.log("✨ Nothing to sync, looks like you're all set!")
      return
    }

    console.log("🎉 Sync completed successfully!")
  } catch (error) {
    console.error("❌ Error during sync:", error instanceof Error ? error.message : error)
    throw error
  }
}

async function updateAlgoliaDocuments<T extends Record<string, any>>(indexName: string, documents: T[], entityName: string) {
  if (documents.length === 0) return

  console.log(`📤 Updating ${documents.length} ${entityName} in Algolia...`)
  await searchClient.batchUpdate({
    indexName,
    batchWriteParams: {
      requests: documents.map((doc) => ({
        action: doc.objectID ? "partialUpdateObjectNoCreate" : "addObject",
        body: doc,
      })),
    },
  })
}

function calculateProductDelta(enrichedProducts: PlatformProduct[], allIndexProducts: any[]) {
  const allIndexProductsMap = new Map(allIndexProducts.map((product) => [product.id, product]))

  return enrichedProducts.reduce<Array<any>>((acc, product) => {
    const existingProduct = allIndexProductsMap.get(product.id)
    if (!existingProduct || !isEqual(omit(product, ["objectID"]), omit(existingProduct, ["objectID"]))) {
      acc.push(existingProduct ? { ...product, objectID: existingProduct.objectID } : product)
    }
    return acc
  }, [])
}

function calculateCategoryDelta(categories: PlatformProduct["collections"], allIndexCategories: any[]) {
  const allIndexCategoriesMap = new Map(allIndexCategories.map((category) => [category.id, category]))

  return categories.reduce<Array<any>>((acc, category) => {
    const existingCategory = allIndexCategoriesMap.get(category.id)
    if (!existingCategory || !isEqual(omit(category, ["objectID"]), omit(existingCategory, ["objectID"]))) {
      acc.push(existingCategory ? { ...category, objectID: existingCategory.objectID } : category)
    }
    return acc
  }, [])
}

function calculateReviewDelta(reviews: Review[], allIndexReviews: any[]) {
  const allIndexReviewsMap = new Map(allIndexReviews.map((review) => [review.id, review]))

  return reviews.reduce<Array<any>>((acc, review) => {
    const existingReview = allIndexReviewsMap.get(review.id)
    if (!existingReview || !isEqual(omit(review, ["objectID"]), omit(existingReview, ["objectID"]))) {
      acc.push(existingReview ? { ...review, objectID: existingReview.objectID } : review)
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
