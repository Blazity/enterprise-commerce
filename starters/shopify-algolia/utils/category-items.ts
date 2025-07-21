export interface CategoryItem {
  title: string
  handle: string
  href: string
  description: string
}

export const categoryItems: CategoryItem[] = [
  {
    title: "Fashion",
    handle: "fashion",
    href: "/category/fashion",
    description: "Curated styles for every occasion",
  },
  {
    title: "Electronics",
    handle: "electronics",
    href: "/category/electronics",
    description: "Latest tech and innovations",
  },
  {
    title: "Beauty",
    handle: "beauty",
    href: "/category/beauty",
    description: "Premium skincare and cosmetics",
  },
  {
    title: "Furniture",
    handle: "furniture",
    href: "/category/furniture",
    description: "Modern designs for your space",
  },
]
