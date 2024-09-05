export type GetProductReviewsOpts = Partial<{
  per_page: number
  page: number
}>

export type Reviewer = {
  id: number
  external_id: number
  email: string
  name: string
  phone: string
  accepts_marketing: boolean
  unsubscribed_at: string
  tags: string[]
}

export type Review = {
  id: number
  title: string
  body: string
  rating: number
  product_external_id: number
  reviewer: Reviewer
  source: string
  curated: string
  published: boolean
  hidden: boolean
  verified: string
  featured: boolean
  created_at: string
  updated_at: string
  has_published_pictures: boolean
  has_published_videos: boolean
  pictures: any[]
  ip_address: string
  product_title: number
  product_handle: string
}

export type GetProductReviewsResponse = {
  current_page: number
  per_page: number
  total: number
  totalPages: number
  reviews: Review[]
}

export type ProductReviewBody = {
  name: string
  email: string
  rating: 1 | 2 | 3 | 4 | 5
  body: string
  id: string
  ip_addr: string | null
}

export type ProductReviewArgs = {
  baseUrl: URL
  body: ProductReviewBody
}

export type JudgeMeWebhookKey = "review/created" | "review/updated" | "review/created_fail"
