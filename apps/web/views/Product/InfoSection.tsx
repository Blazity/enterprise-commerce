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
      <h1 className="mb-6 text-[36px] leading-tight tracking-[-1.44px]">{title}</h1>
      <div className="text-[17px] leading-tight tracking-normal text-slate-600" dangerouslySetInnerHTML={{ __html: description }} />
      {combination?.price ? <div className="mt-4 text-[36px] font-bold tracking-[-1.44px]">{combination?.price.amount + " " + combination?.price.currencyCode}</div> : null}
    </div>
  )
}
