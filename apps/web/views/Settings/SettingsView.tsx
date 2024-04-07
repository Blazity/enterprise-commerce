"use client"

import { Skeleton } from "components/Skeleton/Skeleton"
import { ProfileForm } from "./ProfileForm"
import { useUserStore } from "stores/userStore"

export function SettingsView() {
  const user = useUserStore((s) => s.user)

  if (!user) return null

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
