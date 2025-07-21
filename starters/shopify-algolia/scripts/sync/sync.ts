import { isDeepEqual, omit } from "remeda"

import { HIERARCHICAL_SEPARATOR } from "../../constants/index"
import { storefrontClient } from "../../lib/shopify/client"
import type { PlatformProduct } from "../../lib/shopify/types"
import { searchClient } from "../../lib/algolia/client"
import { env } from "../../env.mjs"
import { isOptIn } from "utils/opt-in"
import { reviewsClient } from "lib/reviews/client"
import { ProductEnrichmentBuilder } from "utils/enrich-product"
import type { Review } from "lib/reviews/types"

async function sync() {
  console.log("🚀 Starting sync process...")

  try {
    if (!env.ALGOLIA_PRODUCTS_INDEX || !env.ALGOLIA_CATEGORIES_INDEX || !env.SHOPIFY_HIERARCHICAL_NAV_HANDLE) {
      throw new Error("Missing required environment variables")
    }
    const allProducts = await storefrontClient.getAllProducts()
    console.log(`📦 Fetched ${allProducts.length} products`)
    const allCategories = await storefrontClient.getAllCollections()
    console.log(`📑 Fetched ${allCategories.length} categories`)
    if (!allProducts.length || !allCategories.length) {
      console.warn("⚠️ No products or categories found, aborting sync")
      return
    }
    const hierarchicalCategories = await storefrontClient.getHierarchicalCollections(
      env.SHOPIFY_HIERARCHICAL_NAV_HANDLE
    )
    console.log(`🌳 Fetched ${hierarchicalCategories.items.length} hierarchical categories`)
    const reviewsEnabled = isOptIn("reviews") && !!env.ALGOLIA_REVIEWS_INDEX
    const reviews: Review[] = reviewsEnabled ? await reviewsClient.getAllProductReviews() : []
    if (reviewsEnabled) console.log(`💬 Fetched ${reviews.length} reviews`)
    const enrichedProducts = allProducts.map((product) =>
      new ProductEnrichmentBuilder(product)
        .withHierarchicalCategories(hierarchicalCategories.items, HIERARCHICAL_SEPARATOR)
        .withReviews(reviews)
        .build()
    )
    const { hits: algoliaProducts } = await searchClient.getAllResults({
      indexName: env.ALGOLIA_PRODUCTS_INDEX,
      browseParams: {},
    })
    const { hits: algoliaCategories } = await searchClient.getAllResults({
      indexName: env.ALGOLIA_CATEGORIES_INDEX,
    })
    const deltaProducts = calculateDelta(enrichedProducts, algoliaProducts, (item) => item.id.toString())
    const deltaCategories = calculateDelta(allCategories, algoliaCategories, (item: any) => item.id.toString())
    console.log(`🔍 Delta - products: ${deltaProducts.length}, categories: ${deltaCategories.length}`)
    await updateAlgolia(env.ALGOLIA_PRODUCTS_INDEX, deltaProducts)
    await updateAlgolia(env.ALGOLIA_CATEGORIES_INDEX, deltaCategories)
    await deleteObsolete(
      env.ALGOLIA_PRODUCTS_INDEX,
      allProducts.map((p) => p.id)
    )
    await deleteObsolete(
      env.ALGOLIA_CATEGORIES_INDEX,
      allCategories.map((c) => c.id)
    )
    if (reviewsEnabled) {
      const { hits: algoliaReviews } = await searchClient.getAllResults({
        indexName: env.ALGOLIA_REVIEWS_INDEX!,
        browseParams: {},
      })
      const deltaReviews = calculateDelta(reviews, algoliaReviews, (item: any) => item.id.toString())
      console.log(`🔍 Delta - reviews: ${deltaReviews.length}`)
      await updateAlgolia(env.ALGOLIA_REVIEWS_INDEX!, deltaReviews)
      await deleteObsolete(
        env.ALGOLIA_REVIEWS_INDEX!,
        reviews.map((r) => r.id.toString())
      )
    }
    console.log("🎉 Sync completed successfully!")
  } catch (error) {
    console.error("❌ Error during sync:", error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

async function updateAlgolia<T extends Record<string, any>>(indexName: string, docs: T[]) {
  if (!docs.length) return
  console.log(`📤 Updating ${docs.length} records in ${indexName}`)
  await searchClient.batchUpdate({
    indexName,
    batchWriteParams: {
      requests: docs.map((doc) => ({
        action: "partialUpdateObject",
        body: { ...doc, objectID: doc.id.toString() },
      })),
    },
  })
}

async function deleteObsolete(indexName: string, currentIds: string[]) {
  console.log(`🔍 Checking obsolete entries in ${indexName}`)
  const { hits } = await searchClient.getAllResults({
    indexName,
    browseParams: { attributesToRetrieve: ["objectID"] },
  })
  const existingIds = hits.map((h) => h.objectID)
  const toRemove = existingIds.filter((id) => !currentIds.includes(id))
  if (!toRemove.length) {
    console.log(`✨ No obsolete entries in ${indexName}`)
    return
  }
  console.log(`🗑️ Deleting ${toRemove.length} obsolete entries from ${indexName}`)
  await searchClient.batchUpdate({
    indexName,
    batchWriteParams: {
      requests: toRemove.map((id) => ({
        action: "deleteObject",
        body: { objectID: id },
      })),
    },
  })
}

function calculateDelta<T extends Record<string, any>>(source: T[], target: any[], idFn: (item: any) => string) {
  const map = new Map<string, any>(target.map((item) => [idFn(item), item]))
  return source.filter((item) => {
    const id = idFn(item)
    const existing = map.get(id)
    const normSource = omit(item, ["objectID"])
    const normExisting = existing ? omit(existing, ["objectID"]) : null
    return !existing || !isDeepEqual(normSource, normExisting)
  })
}

sync().then(() => process.exit(0))
