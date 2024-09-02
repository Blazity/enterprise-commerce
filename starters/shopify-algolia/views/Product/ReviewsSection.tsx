import Link from "next/link"

import { ReviewButton } from "./ReviewButton"
import { ReviewCard, type ReviewCardProps } from "./ReviewCard"
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "components/Carousel/Carousel"
import { RobotIcon } from "components/Icons/RobotIcon"
import { isOptIn, notifyOptIn } from "utils/opt-in"
import { StarIcon } from "components/Icons/StarIcon"
import { cn } from "utils/cn"

type ReviewsSectionProps = {
  productId: string
  productHandle: string
  reviews: ReviewCardProps[]
  total: number
  avgRating: number | undefined
  summary?: string
  className?: string
}
export const ReviewsSection = ({ productId, productHandle, reviews, total, summary, avgRating, className }: ReviewsSectionProps) => {
  if (!isOptIn("reviews")) {
    notifyOptIn({ feature: "reviews", source: "components/ReviewsSection" })

    return null
  }

  if (reviews?.length <= 0) {
    return (
      <section className={cn("relative left-1/2 w-screen -translate-x-1/2 bg-gray-50 py-12 md:my-10", className)}>
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
    <section className={cn("relative left-1/2 w-screen -translate-x-1/2 bg-gray-50 py-12 md:my-10", className)}>
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        <div className="space-y-4">
          <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center justify-center">
              <h2 className="text-xl font-semibold sm:text-xl">Customer Reviews</h2>
              <span className="ml-1 text-sm font-normal text-gray-500">({total})</span>
              {!!avgRating && (
                <div className="ml-1 inline-flex items-center">
                  <StarIcon className="ml-0.5 size-4 fill-yellow-400 text-yellow-500" />
                  <span className="ml-0.5 text-sm font-normal"> {avgRating.toFixed(2)}</span>
                </div>
              )}
            </div>

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

          <Carousel opts={{ skipSnaps: true }}>
            <div className="my-4 hidden justify-end gap-4 md:flex">
              <CarouselPrevious className="relative" />
              <CarouselNext className="relative" />
            </div>
            <CarouselContent className="ml-0 gap-6">
              {reviews.map(({ body, author, rating, created_at }) => (
                <ReviewCard key={created_at} body={body} author={author} rating={rating} created_at={created_at} />
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className="mt-10 flex justify-center md:justify-end">
          <Link href={`/reviews/${productHandle}`} className="text-sm underline" prefetch={false}>
            See all reviews
          </Link>
        </div>
      </div>
    </section>
  )
}
