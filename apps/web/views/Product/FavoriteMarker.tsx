"use client"

import { HeartIcon } from "components/Icons/HeartIcon"
import { cn } from "utils/cn"
import { getParsedFavoritesHandles, toggleFavoriteProduct } from "app/actions/favorites.actions"
import { useEffect, useState, useTransition } from "react"
import { Spinner } from "components/Spinner/Spinner"
import { useFormState } from "react-dom"

export function FavoriteMarker({ handle }: { handle: string }) {
  const [isActive, setIsActive] = useState<boolean>(false)
  const [state, formAction] = useFormState(toggleFavoriteProduct, { ok: false })
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      const favorites = await getParsedFavoritesHandles()
      setIsActive(favorites.some((favoriteHandle) => favoriteHandle === handle))
    })
  }, [state, handle])

  return (
    <div className="absolute left-4 top-4">
      <form action={formAction.bind(null, handle)}>
        <button aria-label="Favorite this item" type="submit" className="relative bg-transparent">
          <HeartIcon className={cn("size-8 cursor-pointer transition-colors hover:fill-neutral-200", { "fill-black": isActive })} />
          {isPending && (
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center ">
              <Spinner className="size-4 bg-transparent " />
            </div>
          )}
        </button>
      </form>
    </div>
  )
}
