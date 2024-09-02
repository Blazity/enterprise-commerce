"use client"

import dynamic from "next/dynamic"
import { Skeleton } from "components/Skeleton/Skeleton"
import { AuthActions } from "components/ProfileMenu/AuthActions"
import { useUserStore } from "stores/userStore"
import { useEffect, useTransition } from "react"
import { getCurrentUser } from "app/actions/user.actions"

const ProfileBar = dynamic(() => import("./ProfileBar"), { ssr: false, loading: ActionsSkeleton })

export function ProfileMenu() {
  const { user, setUser } = useUserStore()
  const [_, startTransition] = useTransition()

  useEffect(() => {
    if (user) return

    startTransition(async () => {
      const currentUser = await getCurrentUser()
      currentUser && setUser(currentUser ?? null)
    })
  }, [setUser, user])

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
