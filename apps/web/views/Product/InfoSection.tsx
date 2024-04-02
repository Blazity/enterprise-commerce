import { PlatformVariant } from "@enterprise-commerce/core/platform/types"
import { Combination } from "utils/productOptionsUtils"

interface InfoSectionProps {
  title: string
  description: string
  combination: Combination | PlatformVariant | undefined
  className?: string
}

export function InfoSection({ title, description, combination, className }: InfoSectionProps) {
  return (
    <div className={className}>
      <h1 className="mb-6 text-xl/6 tracking-[-1px] md:text-4xl">{title}</h1>
      <div className="text-[17px] leading-tight tracking-normal text-neutral-500" dangerouslySetInnerHTML={{ __html: description }} />
      {!!combination?.price && (
        <div className="mt-4 text-[36px] font-bold tracking-[-1.44px]">{parseFloat(combination?.price.amount).toFixed(2) + " " + combination?.price.currencyCode}</div>
      )}
    </div>
  )
}
