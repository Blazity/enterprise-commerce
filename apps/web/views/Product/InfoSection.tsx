import { PlatformVariant } from "@enterprise-commerce/core/platform/types"
import { Combination } from "utils/productOptionsUtils"
import { StarRating } from "./StarRating"

interface InfoSectionProps {
  title: string
  description: string
  combination: Combination | PlatformVariant | undefined
  className?: string
  avgRating?: number
  totalReviews?: number
}

export function InfoSection({ title, description, combination, className, avgRating, totalReviews }: InfoSectionProps) {
  return (
    <div className={className}>
      <div className="mb-6">
        <h1 className="mb-1 text-xl/6 tracking-[-1px] md:text-4xl">{title}</h1>
        {!!avgRating && !!totalReviews && (
          <div className="flex items-center space-x-1">
            <StarRating rating={Math.ceil(avgRating)} />
            <span className="text-xs text-gray-400">
              ({avgRating.toFixed(2)}) based on {totalReviews} review{totalReviews !== 1 && "s"}
            </span>
          </div>
        )}
      </div>
      {description && <div className="text-[17px] leading-tight tracking-normal text-neutral-500" dangerouslySetInnerHTML={{ __html: description }} />}
      {!!combination?.price && (
        <div className="mt-4 text-[36px] font-bold tracking-[-1.44px]">{parseFloat(combination?.price.amount).toFixed(2) + " " + combination?.price.currencyCode}</div>
      )}
    </div>
  )
}
