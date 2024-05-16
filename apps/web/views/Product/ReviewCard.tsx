import { Card } from "components/Card/Card"
import { StarRating } from "./StarRating"
import { ExpandableContent } from "components/ExpandableContent/ExpandableContent"

export type ReviewCardProps = {
  created_at: string
  author: string
  rating: number
  body: string
}

export const ReviewCard = ({ created_at, author, rating, body }: ReviewCardProps) => {
  return (
    <Card key={created_at} className="grow-1 basis-full p-4">
      <div className="flex flex-col items-center justify-between space-y-2">
        <div className="flex w-full flex-col-reverse items-center justify-between gap-2 lg:flex-row">
          <h3 className="font-semibold">{author}</h3>
          <span className="text-sm text-gray-500">
            {new Date(created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <StarRating rating={rating} />
      </div>
      <ExpandableContent lines={4}>
        <p className="mt-4 text-gray-500">{body}</p>
      </ExpandableContent>
    </Card>
  )
}
