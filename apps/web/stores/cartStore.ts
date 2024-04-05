import { create } from "zustand"

interface CartStore {
  isOpen: boolean
  lastUpdatedAt: number
  openCart: () => void
  closeCart: () => void
  refresh: () => void
}

export const useCartStore = create<CartStore>((set) => ({
  isOpen: false,
  lastUpdatedAt: 0,

  openCart: () => set(() => ({ isOpen: true, lastUpdatedAt: Date.now() })),
  closeCart: () => set(() => ({ isOpen: false, lastUpdatedAt: Date.now() })),
  refresh: () => set(() => ({ lastUpdatedAt: Date.now() })),
}))
