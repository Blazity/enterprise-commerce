import { StarIcon } from "components/Icons/StarIcon"
import { cn } from "utils/cn"

export const StarRating = ({ rating }: { rating: number }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1)

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <StarIcon key={star} className={cn("size-4", star <= rating ? "fill-yellow-400 stroke-yellow-500" : "stroke-yellow-500")} />
      ))}
    </div>
  )
}
