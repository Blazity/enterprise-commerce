import { MenuItem } from "./storefront.types"

export interface PlatformMenu {
  items: Array<Pick<MenuItem, "id" | "resource" | "title" | "items">>
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
  collections: Pick<PlatformCollection, "handle" | "id" | "title">[]
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
  id: string
  description?: string
  descriptionHtml: string
  updatedAt?: string
  image: PlatformImage | undefined | null
  seo?:
    | {
        description?: string | null | undefined
        title?: string | null | undefined
      }
    | undefined
    | null
}

export interface PlatformPriceRange {
  maxVariantPrice: PlatformPrice
  minVariantPrice: PlatformPrice
}

export interface PlatformVariant {
  id: string
  title: string
  quantityAvailable?: number | null | undefined
  availableForSale: boolean
  selectedOptions: {
    name: string
    value: string
  }[]
  price: PlatformPrice
}

export interface PlatformImage {
  url: string
  altText?: string | undefined | null
  width?: number | undefined | null
  height?: number | undefined | null
}

export interface PlatformPage {
  id: string
  title: string
  handle: string
  body: any
  bodySummary: string
  createdAt: any
  updatedAt: any
  seo?:
    | {
        description?: string | null | undefined
        title?: string | null | undefined
      }
    | undefined
    | null
}

export interface PlatformProductStatus {
  status: "ACTIVE" | "ARCHIVED" | "DRAFT"
}

export interface PlatformCart {
  id: string
  checkoutUrl: string
  cost: {
    subtotalAmount?: PlatformPrice | null | undefined
    totalAmount?: PlatformPrice | null | undefined
    totalTaxAmount?: PlatformPrice | null | undefined
  }
  items: PlatformCartItem[]
  totalQuantity: number
}

export interface PlatformCartItem {
  id: string
  cost: { totalAmount?: PlatformPrice | null | undefined }
  quantity: number
  merchandise: Omit<PlatformVariant, "availableForSale"> & { product: PlatformProduct }
}

export interface PlatformItemInput {
  id?: string
  merchandiseId: string
  attributes?: Record<string, string>
  quantity: number
  sellingPlanId?: string
}

export interface PlatformPrice {
  amount: string
  currencyCode: string
}

export interface PlatformUser {
  acceptsMarketing: boolean
  createdAt: string
  updatedAt: string
  displayName: string
  email?: string | null | undefined
  firstName?: string | null | undefined
  lastName?: string | null | undefined
  id: string
  phone?: string | null | undefined
  tags: string[]
}

export interface PlatformUserCreateInput extends Pick<PlatformUser, "email" | "firstName" | "lastName" | "phone"> {
  password: string
}

export interface PlatformAccessToken {
  accessToken: string
  expiresAt: string
}
