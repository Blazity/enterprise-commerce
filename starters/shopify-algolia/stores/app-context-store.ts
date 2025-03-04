import { create } from "zustand"

interface AppContextStore {
  productsContext: string
  categoriesContext: string
  filtersContext: string
  setProductsContext: (context: string) => void
  setCategoriesContext: (context: string) => void
  setFiltersContext: (context: string) => void
}

export const useAppContextStore = create<AppContextStore>()((set) => ({
  productsContext: "",
  categoriesContext: "",
  filtersContext: "",
  setProductsContext: (context: string) => set({ productsContext: context }),
  setCategoriesContext: (context: string) => set({ categoriesContext: context }),
  setFiltersContext: (context: string) => set({ filtersContext: context }),
}))
