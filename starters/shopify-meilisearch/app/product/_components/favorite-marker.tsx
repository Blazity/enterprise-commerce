"use client"

import { useEffect, useState, useTransition } from "react"

import { getParsedFavoritesHandles, toggleFavoriteProduct } from "app/actions/favorites.actions"

import { Spinner } from "components/spinner"
import { HeartIcon } from "components/icons/heart-icon"
import { Button } from "components/ui/button"
import { cn } from "utils/cn"

export function FavoriteMarker({ handle }: { handle: string }) {
  const [isActive, setIsActive] = useState<boolean>(false)
  const [isAnimating, setIsAnimating] = useState(false)
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

  const handleClick = async () => {
    setIsAnimating(true)
    const isFavorite = await toggleFavoriteProduct(null, handle)

    setIsActive(isFavorite)
  }

  return (
    <>
      <Button aria-label="Favorite this item" type="submit" onClick={handleClick} variant="outline" className="group w-full bg-white transition-all hover:scale-105">
        {isPending ? (
          <div className="flex items-center justify-center">
            <Spinner className="size-4 bg-transparent" />
          </div>
        ) : (
          <>
            <HeartIcon
              onAnimationEnd={() => {
                setIsAnimating(false)
              }}
              className={cn("mr-2 size-5 transition-all", isActive ? "text-red-500 " : "text-black", isAnimating && "animate-single-bounce")}
            />
            Favorite
          </>
        )}
      </Button>
    </>
  )
}
