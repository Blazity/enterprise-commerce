export interface PlatformMenu {
  items: { title: string; url: string }[]
}

export interface PlatformProduct {
  id: string
  handle: string
  title: string
  description: string
  descriptionHtml: string
  options: PlatformProductOptions[]
  priceRange: PlatformPriceRange
  variants: PlatformVariant[]
  featuredImage: PlatformImage | undefined | null
  images: PlatformImage[]
  tags: string[]
  vendor: string
  minPrice: number
  updatedAt: string
  createdAt: string
  updatedAtTimestamp: number
  createdAtTimestamp: number
  flatOptions: Record<string, string[]>
  collections: PlatformCollection[]
  seo: {
    description?: string | null | undefined
    title?: string | null | undefined
  }
}

export interface PlatformProductOptions {
  id: string
  name: string
  values: string[]
}

export interface PlatformCollection {
  handle: string
  title: string
  description: string
  updatedAt: string
}

export interface PlatformPriceRange {
  maxVariantPrice: {
    amount: number
    currencyCode: string
  }
  minVariantPrice: {
    amount: number
    currencyCode: string
  }
}

export interface PlatformVariant {
  id: string
  title: string
  availableForSale: boolean
  selectedOptions: {
    name: string
    value: string
  }[]
  price: {
    amount: string
    currencyCode: string
  }
}

export interface PlatformImage {
  url: string
  altText?: string | undefined | null
  width?: number | undefined | null
  height?: number | undefined | null
}
