import { PlatformUser } from "@enterprise-commerce/core/platform/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "components/DropdownMenu"

export function ProfileBar({ user }: { user: PlatformUser }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-transparent">{user.email}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px] rounded-b-md bg-white px-0 text-neutral-500 shadow-lg" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer border-b border-neutral-200 py-2 last:border-b-0 hover:bg-neutral-50 focus:bg-neutral-50 active:bg-neutral-50">
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
