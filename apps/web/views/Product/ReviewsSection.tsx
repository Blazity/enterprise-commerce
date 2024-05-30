import Link from "next/link"

import { ReviewButton } from "./ReviewButton"
import { ReviewCard, type ReviewCardProps } from "./ReviewCard"
import { RobotIcon } from "components/Icons/RobotIcon"
import { isOptIn, notifyOptIn } from "utils/opt-in"

type ReviewsSectionProps = {
  productId: string
  productHandle: string
  reviews: ReviewCardProps[]
  total: number
  summary?: string
}
export const ReviewsSection = ({ productId, productHandle, reviews, total, summary }: ReviewsSectionProps) => {
  if (!isOptIn("reviews")) {
    notifyOptIn({ feature: "reviews", source: "components/ReviewsSection" })

    return null
  }

  if (reviews?.length <= 0) {
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
          {!!summary && (
            <div className="rounded bg-gray-300/25 p-4">
              <div className="mb-2 flex items-center space-x-2">
                <RobotIcon className="size-4" />
                <h3 className="text-base font-semibold">AI Summary</h3>
              </div>
              <p className="text-sm text-gray-600">{summary}</p>
            </div>
          )}
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
