import { storefrontClient } from "clients/storefrontClient"
import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import Link from "next/link"
import { COOKIE_ACCESS_TOKEN } from "constants/index"
import Actions from "./Actions"

const ProfileBar = dynamic(() => import("./ProfileBar").then((mod) => mod.ProfileBar), { ssr: false })

export async function TopBar() {
  const accessToken = cookies().get(COOKIE_ACCESS_TOKEN)
  const user = await storefrontClient.getUser(accessToken?.value!)

  return (
    <header className="hidden bg-white py-4 sm:block">
      <div className="max-w-container-lg mx-auto flex items-center justify-between px-4">
        <Link prefetch={false} href="/" className="text-3xl font-bold">
          Blazity
        </Link>

        {user ? (
          <ProfileBar user={user} />
        ) : (
          <div className="flex items-center space-x-6">
            <Actions />
          </div>
        )}
      </div>
    </header>
  )
}
