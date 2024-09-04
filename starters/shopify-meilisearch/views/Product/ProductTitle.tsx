type ProductTitleProps = {
  title: string
  className?: string
  currency?: string
  price: string | null
}

export const ProductTitle = ({ title, currency, price, className }: ProductTitleProps) => {
  return (
    <div className={className}>
      <h1 className="text-xl">{title}</h1>
      {!!price && (
        <p className="mt-2 text-xl">
          {currency}
          {price}
        </p>
      )}
    </div>
  )
}
