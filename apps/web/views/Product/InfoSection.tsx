import { PlatformVariant } from "@enterprise-commerce/core/platform/types"

interface InfoSectionProps {
  title: string
  description: string
  price: PlatformVariant["price"] | undefined
  className?: string
}

export function InfoSection({ title, description, price, className }: InfoSectionProps) {
  return (
    <div className={className}>
      <h1 className="mb-6 text-[36px] leading-tight tracking-[-1.44px]">{title}</h1>
      <div className="text-[17px] leading-tight tracking-normal text-slate-600" dangerouslySetInnerHTML={{ __html: description }} />
      {price ? <div className="mt-4 text-[36px] font-bold tracking-[-1.44px]">{price.amount + " " + price.currencyCode}</div> : null}
    </div>
  )
}
