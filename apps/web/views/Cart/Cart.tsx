import { cookies } from "next/headers"
import { CartView } from "views/Cart/CartView"
import { COOKIE_CART_ID } from "constants/index"
import { getCart } from "app/actions/cart.actions"

export async function Cart() {
  const cartId = cookies().get(COOKIE_CART_ID)?.value

  let cart
  if (cartId) {
    cart = await getCart(cartId)
  }

  return <CartView cart={cart} />
}
