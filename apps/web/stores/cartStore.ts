import { PlatformCart } from "@enterprise-commerce/core/platform/types"
import { create } from "zustand"

interface CartStore {
  isOpen: boolean
  lastUpdatedAt: number
  cart: PlatformCart | null
  openCart: () => void
  closeCart: () => void
  refresh: () => void
  setCart: (payload: PlatformCart | null) => void
}

export const useCartStore = create<CartStore>((set) => ({
  isOpen: false,
  lastUpdatedAt: 0,
  cart: null,

  openCart: () => set(() => ({ isOpen: true, lastUpdatedAt: Date.now() })),
  closeCart: () => set(() => ({ isOpen: false, lastUpdatedAt: Date.now() })),
  refresh: () => set(() => ({ lastUpdatedAt: Date.now() })),
  setCart: (payload: PlatformCart | null) => set(() => ({ cart: payload })),
}))
