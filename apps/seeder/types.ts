export interface Product {
  title: string
  type: "shirt" | "shoes" | "jacket" | "sport"
  description: string
  images?: string[]
}

export interface SeedStrategy {
  seed: (products: Product[]) => Promise<void>
}
