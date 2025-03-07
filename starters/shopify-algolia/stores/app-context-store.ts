import { create } from "zustand"

interface AppContextStore {
  productsContext: string
  similarProductsContext: string
  categoriesContext: string
  availableFiltersContext: string
  setProductsContext: (context: string) => void
  setSimilarProductsContext: (context: string) => void
  setCategoriesContext: (context: string) => void
  setsAvailableFiltersContext: (context: string) => void
}

export const useAppContextStore = create<AppContextStore>()((set) => ({
  productsContext: "",
  similarProductsContext: "",
  categoriesContext: "",
  availableFiltersContext: "",
  setProductsContext: (context: string) => set({ productsContext: context }),
  setSimilarProductsContext: (context: string) => set({ similarProductsContext: context }),
  setCategoriesContext: (context: string) => set({ categoriesContext: context }),
  setsAvailableFiltersContext: (context: string) => set({ availableFiltersContext: context }),
}))
