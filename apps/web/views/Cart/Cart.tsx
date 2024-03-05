import { getCart } from "app/actions"
import { cookies } from "next/headers"
import { CartView } from "views/Cart/CartView"

export async function Cart() {
  const cartId = cookies().get("ecom_cartId")?.value

  let cart
  if (cartId) {
    cart = await getCart(cartId)
  }

  return <CartView cart={cart} />
}
