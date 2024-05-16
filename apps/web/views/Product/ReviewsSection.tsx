import Link from "next/link"

import { ReviewButton } from "./ReviewButton"
import { ReviewCard, type ReviewCardProps } from "./ReviewCard"

type ReviewsSectionProps = {
  productId: string
  productHandle: string
  reviews: ReviewCardProps[]
  total: number
}
export const ReviewsSection = ({ productId, productHandle, reviews, total }: ReviewsSectionProps) => {
  if (reviews.length <= 0) {
    return (
      <section className="relative left-1/2 w-screen -translate-x-1/2 bg-gray-50 py-12 md:my-10">
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <h2 className="text-xl font-semibold sm:text-2xl">Have this product? Help others by sharing your experience</h2>
            <ReviewButton productId={productId} />
          </div>
        </div>
      </section>
    )
  }
  return (
    <section
      className="relative left-1/2 w-screen
    -translate-x-1/2 bg-gray-50 py-12 md:my-10
    "
    >
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <div className="space-y-4">
          <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
            <h2 className="text-xl font-semibold sm:text-2xl">
              Customer Reviews
              <span className="ml-1 text-xl text-gray-500">({total})</span>
            </h2>
            <ReviewButton productId={productId} />
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            {reviews.map(({ body, author, rating, created_at }) => (
              <ReviewCard key={created_at} body={body} author={author} rating={rating} created_at={created_at} />
            ))}
          </div>
        </div>
        <div className="mt-10 flex justify-center md:justify-end">
          <Link href={`/reviews/${productHandle}`} className="text-sm underline">
            See all reviews
          </Link>
        </div>
      </div>
    </section>
  )
}
