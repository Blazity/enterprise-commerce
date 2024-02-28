"use client"

import { ArrowIcon } from "components/Icons/ArrowIcon"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { getPreviousUrl } from "utils/routerHistory"

export function BackButton({ className }: { className?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function handleOnClick() {
    const previousUrl = getPreviousUrl()
    const isDuplicate = previousUrl === `${pathname}?${searchParams}`

    if (!previousUrl || isDuplicate) {
      router.push("/search")
      return
    }

    router.push(previousUrl)
  }

  return (
    <div className={className} onClick={() => handleOnClick()}>
      <ArrowIcon className="size-8 cursor-pointer fill-black transition-transform hover:scale-110" />
    </div>
  )
}
