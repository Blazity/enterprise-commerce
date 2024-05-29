import type { PlatformVariant } from "@enterprise-commerce/core/platform/types"
import type { CommerceProduct } from "types"
import type { Combination } from "utils/productOptionsUtils"
import { create } from "zustand"

interface AddProductStore {
  product: CommerceProduct | null
  combination: Combination | null
  setProduct: ({ product, combination }: { product: CommerceProduct; combination: Combination | PlatformVariant }) => void
  clean: () => void
}

export const useAddProductStore = create<AddProductStore>((set) => ({
  product: null,
  combination: null,
  setProduct: ({ product, combination }) => set(() => ({ product, combination })),
  clean: () => set(() => ({ product: null, combination: null })),
}))
