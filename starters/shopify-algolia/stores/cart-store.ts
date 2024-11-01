import { PlatformCart } from "lib/shopify/types"
import { create } from "zustand"

interface CartStore {
  isOpen: boolean
  isSheetLoaded: boolean
  lastUpdatedAt: number
  cart: PlatformCart | null
  checkoutReady: boolean

  openCart: () => void
  closeCart: () => void
  preloadSheet: () => void
  refresh: () => void
  setCart: (payload: PlatformCart | null) => void
  setCheckoutReady: (payload: boolean) => void
}

export const useCartStore = create<CartStore>((set) => ({
  isOpen: false,
  lastUpdatedAt: 0,
  cart: null,
  isSheetLoaded: false,
  checkoutReady: true,

  openCart: () => set(() => ({ isOpen: true, isSheetLoaded: true, lastUpdatedAt: Date.now() })),
  closeCart: () => set(() => ({ isOpen: false, isSheetLoaded: true, lastUpdatedAt: Date.now() })),
  preloadSheet: () => set(() => ({ isSheetLoaded: true })),
  refresh: () => set(() => ({ lastUpdatedAt: Date.now() })),
  setCheckoutReady: (payload: boolean) => set(() => ({ checkoutReady: payload })),
  setCart: (payload: PlatformCart | null) => set(() => ({ cart: payload })),
}))
