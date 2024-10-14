import Link from "next/link"
import { FavoritesIcon } from "components/Icons/FavoritesIcon"
import { cn } from "utils/cn"

interface FavoritesProps {
  className?: string
}

export async function Favorites({ className }: FavoritesProps) {
  return (
    <div className={cn("mt-0.5 size-8 cursor-pointer items-center justify-center fill-none transition-transform hover:scale-105", className)}>
      <Link aria-label="Go to favorites items" href="/favorites" prefetch={false}>
        <FavoritesIcon />
      </Link>
    </div>
  )
}
