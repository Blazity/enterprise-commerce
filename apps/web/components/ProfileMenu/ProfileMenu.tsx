import dynamic from "next/dynamic"
import { cookies } from "next/headers"
import { storefrontClient } from "clients/storefrontClient"
import { Skeleton } from "components/Skeleton/Skeleton"
import { COOKIE_ACCESS_TOKEN } from "constants/index"
import { AuthActions } from "components/ProfileMenu/AuthActions"

const ProfileBar = dynamic(() => import("./ProfileBar"), { ssr: false, loading: ActionsSkeleton })

export async function ProfileMenu() {
  const accessToken = cookies().get(COOKIE_ACCESS_TOKEN)
  const user = await storefrontClient.getUser(accessToken?.value!)

  return (
    <>
      {user ? (
        <ProfileBar user={user} />
      ) : (
        <div className="flex items-center space-x-6">
          <AuthActions />
        </div>
      )}
    </>
  )
}

function ActionsSkeleton() {
  return <Skeleton className="h-[35px] w-[250px]" />
}
