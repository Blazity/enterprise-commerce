import { Product, SeedStrategy } from "types"

export async function seeder(strategy: SeedStrategy, products: Product[]): Promise<void> {
  await strategy.seed(products)
}
