import { StarIcon } from "components/icons/star-icon"
import { cn } from "utils/cn"

export const StarRating = ({ rating }: { rating: number }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1)

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <StarIcon key={star} className={cn("size-4", star <= rating ? "fill-gray-400 stroke-gray-500" : "stroke-gray-500")} />
      ))}
    </div>
  )
}
