import { Card } from "components/ui/card"
import { StarRating } from "components/star-rating"
import { ExpandableContent } from "components/expandable-content"

export type ReviewCardProps = {
  created_at: string
  author: string
  rating: number
  body: string
}

export const ReviewCard = ({ created_at, author, rating, body }: ReviewCardProps) => {
  return (
    <Card key={created_at} className="flex min-w-[280px] max-w-[280px] flex-col px-4 py-8">
      <div className="mx-auto w-auto">
        <StarRating rating={rating} />
      </div>
      <ExpandableContent lines={4}>
        <p className="mt-6 overflow-hidden text-center text-gray-500">{body}</p>
      </ExpandableContent>
      <div className="mt-6 flex w-full flex-col items-center justify-between gap-2">
        <h3 className="font-semibold">{author}</h3>
        <span className="text-xs text-gray-500">
          {new Date(created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
    </Card>
  )
}
