export interface NavItem {
  text: string
  href?: string
  submenu?: Submenu
  pageDisplayType?: "CLP" | "PLP"
}

interface Submenu {
  variant: "text-grid" | "image-grid" | "text-image-grid"
  items: SubmenuItem[]
}

export interface TextGridItem {
  text: string
  href?: string
  items: Array<{ text: string; href: string }>
  pageDisplayType?: "CLP" | "PLP"
}

export interface ImageGridItem {
  href: string
  image: string
  text: string
}

export interface TextImageGridItem {
  href?: string
  image?: string
  text?: string
}

type SubmenuItem = TextGridItem | ImageGridItem | TextImageGridItem
