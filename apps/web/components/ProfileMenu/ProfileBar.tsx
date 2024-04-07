"use client"

import { PlatformUser } from "@enterprise-commerce/core/platform/types"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { logoutUser } from "app/actions/user.actions"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "components/DropdownMenu/DropdownMenu"
import { useUserStore } from "stores/userStore"

export default function ProfileBar({ user }: { user: PlatformUser }) {
  const router = useRouter()
  const setUser = useUserStore((s) => s.setUser)
  const menuItemClass = "cursor-pointer border-b border-neutral-200 py-2 last:border-b-0 hover:bg-neutral-50 focus:bg-neutral-50 active:bg-neutral-50"

  function handleLogout() {
    logoutUser()
    setUser(null)
    
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-transparent">{user.displayName || user.email}</DropdownMenuTrigger>
      <DropdownMenuContent className="my-0 w-[240px] rounded-b-md bg-white p-0 text-neutral-500 shadow-lg" align="end">
        <DropdownMenuItem className={menuItemClass} asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className={menuItemClass} onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
