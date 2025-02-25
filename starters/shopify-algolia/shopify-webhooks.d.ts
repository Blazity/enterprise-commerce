export interface Root {
  metadata: Metadata
  productFeed: ProductFeed
  product: Product
}

export interface Metadata {
  action: string
  type: string
  resource: string
  fullSyncId: string
  truncatedFields: any[]
  occurred_at: string
}

export interface ProductFeed {
  id: string
  shop_id: string
  language: string
  country: string
}

export interface Product {
  id: string
  title: string
  description: string
  onlineStoreUrl: string
  createdAt: string
  updatedAt: string
  isPublished: boolean
  publishedAt: string
  productType: string
  vendor: string
  handle: string
  options: Option[]
  seo: Seo
  tags: string[]
  variants: Variants
  images: Images
}

export interface Option {
  name: string
  values: string[]
}

export interface Seo {
  title: any
  description: any
}

export interface Variants {
  edges: Edge[]
}

export interface Edge {
  node: Node
}

export interface Node {
  id: string
  title: string
  price: Price
  compareAtPrice: any
  sku: string
  barcode: any
  quantityAvailable: number
  availableForSale: boolean
  weight: number
  weightUnit: string
  requiresShipping: boolean
  inventoryPolicy: string
  createdAt: string
  updatedAt: string
  image: Image
  selectedOptions: SelectedOption[]
}

export interface Price {
  amount: string
  currencyCode: string
}

export interface Image {
  id: string
  url: string
  height: number
  width: number
}

export interface SelectedOption {
  name: string
  value: string
}

export interface Images {
  edges: ImagesEdges[]
}

export interface ImagesEdges {
  node: ImagesNodes
}

export interface ImagesNodes {
  id: string
  url: string
  height: number
  width: number
}
