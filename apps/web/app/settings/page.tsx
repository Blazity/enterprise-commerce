import { storefrontClient } from "clients/storefrontClient"
import { Skeleton } from "components/Skeleton"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ProfileForm } from "views/Settings/ProfileForm"
import { COOKIE_ACCESS_TOKEN } from "constants/index"

export default async function Settings() {
  const accessToken = cookies().get(COOKIE_ACCESS_TOKEN)
  const user = await storefrontClient.getUser(accessToken?.value!)

  if (!accessToken || !user) return redirect("/access-denied")

  return (
    <div className="max-w-container-sm mx-auto flex flex-wrap gap-8 px-4 py-24 text-4xl">
      <div className=" shrink-0 basis-full md:basis-1/2">
        <ProfileForm user={user} />
      </div>

      <div className="shrink-0 basis-full md:basis-2/5">
        <div className="relative">
          <Skeleton className="h-[428px]" />
          <div className="text-md absolute inset-y-1/2 -translate-y-1/2 text-center">You can add more settings cards here.</div>
        </div>
      </div>
    </div>
  )
}
