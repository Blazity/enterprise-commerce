"use client"

import { HeartIcon } from "components/Icons/HeartIcon"
import { cn } from "utils/cn"
import { getParsedFavoritesHandles, toggleFavoriteProduct } from "app/actions/favorites.actions"
import { useEffect, useState, useTransition } from "react"
import { Spinner } from "components/Spinner/Spinner"

export function FavoriteMarker({ handle }: { handle: string }) {
  const [isActive, setIsActive] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const checkIsFavorite = () => {
      startTransition(async () => {
        const favorites = await getParsedFavoritesHandles()

        setIsActive(favorites.includes(handle))
      })
    }

    checkIsFavorite()
  }, [handle])

  const handleClick = () => {
    startTransition(async () => {
      const isFavorite = await toggleFavoriteProduct(null, handle)
      setIsActive(isFavorite)
    })
  }

  return (
    <div className="absolute left-4 top-4">
      <button aria-label="Favorite this item" type="submit" className="relative bg-transparent" onClick={handleClick}>
        <HeartIcon className={cn("size-8 cursor-pointer transition-colors hover:fill-neutral-200", { "fill-black": isActive })} />
        {isPending && (
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center ">
            <Spinner className="size-4 bg-transparent " />
          </div>
        )}
      </button>
    </div>
  )
}
