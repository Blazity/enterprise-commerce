import { storefrontClient } from "clients/storefrontClient"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { COOKIE_ACCESS_TOKEN } from "constants/index"

export default async function Settings() {
  const accessToken = cookies().get(COOKIE_ACCESS_TOKEN)
  const user = await storefrontClient.getUser(accessToken?.value!)

  if (!accessToken || !user) return redirect("/access-denied")

  return <h1>settings</h1>
}
