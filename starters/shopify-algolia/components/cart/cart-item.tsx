import Image from "next/image"
import Link from "next/link"
import { PlatformCartItem } from "lib/shopify/types"
import { cn } from "utils/cn"
import { filterImagesByVisualOption, getVisualOptionValueFromCombination } from "utils/visual-variant-utils"
import { ChangeQuantityButton } from "./change-quantity-button"
import { DeleteButton } from "./delete-button"

interface CartItemProps extends PlatformCartItem {
  onProductClick: () => void
  className?: string
}

export function CartItem(props: CartItemProps) {
  const visualOptionValue = getVisualOptionValueFromCombination(props.merchandise)

  const variantImages = filterImagesByVisualOption(props.merchandise.product.images, visualOptionValue || null)
  const variantImage = variantImages[0] || props.merchandise.product.featuredImage

  return (
    <li className={cn("flex items-center justify-between gap-6 py-2", props.className)}>
      <div className="flex h-[115px] w-[90px] shrink-0 items-center bg-neutral-100">
        <Image
          src={variantImage?.url || "/default-product-image.svg"}
          alt={variantImage?.altText || props.merchandise.product.title}
          width={115}
          height={90}
          sizes="100px"
        />
      </div>
      <div className="flex flex-1 flex-col items-start justify-around gap-0.5 text-[13px]">
        <Link href={`/product/${props.merchandise.product.handle}`} onClick={props.onProductClick}>
          <h2 className="line-clamp-1 hover:underline">
            {props.merchandise.product.title + props.merchandise.product.title + props.merchandise.product.title}
          </h2>
          <p className="line-clamp-1 text-neutral-500">{props.merchandise.title || ""}</p>
        </Link>
        <p className="py-2 font-bold">{props.merchandise.price.amount + " " + props.merchandise.price.currencyCode}</p>
        <div className="flex w-full items-center justify-between">
          <DeleteButton id={props.id} />

          <div className="boder-black flex h-[32px] w-[100px] justify-between border p-4 text-[14px] text-neutral-500">
            <ChangeQuantityButton
              id={props.id}
              variantId={props.merchandise.id}
              quantity={props.quantity - 1}
              productId={props.merchandise.product.id}
            >
              {"-"}
              </ChangeQuantityButton>
            <div className="flex cursor-not-allowed items-center gap-2 text-black">{props.quantity}</div>
            <ChangeQuantityButton
              id={props.id}
              variantId={props.merchandise.id}
              quantity={props.quantity + 1}
              productId={props.merchandise.product.id}
            >

              {"+"}
              </ChangeQuantityButton>

          </div>
        </div>
      </div>
    </li>
  )
}
