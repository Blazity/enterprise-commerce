import "dotenv/config"

import { Product, SeedStrategy } from "types"
import { seeder } from "./seeder"
import { createShopifyStrategy } from "./strategies/shopify.strategy"

const shopifyStrategy: SeedStrategy = createShopifyStrategy()

interface ResourceProduct {
  name: string
  path: string
}

;(async () => {
  try {
    const resources = require("./resources/male-shirt/data.json") as ResourceProduct[]
    await seeder(
      shopifyStrategy,
      resources.map((product: ResourceProduct) => ({
        type: "shirt",
        title: product.name,
        images: [product.path, ...resources.slice(0, 3).map((p) => p.path)],
        description: product.name || "N/A",
      }))
    )
    console.log("Products seeded successfully")
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message)
    }

    console.error(error)
  }
})()
