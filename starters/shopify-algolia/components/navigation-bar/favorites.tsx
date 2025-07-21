import Link from "next/link"
import { FavoritesIcon } from "components/icons/favorites-icon"
import { cn } from "utils/cn"

interface FavoritesProps {
  className?: string
}

export function Favorites({ className }: FavoritesProps) {
  return (
    <div
      className={cn(
        "mt-0.5 size-8 cursor-pointer items-center justify-center fill-none transition-transform active:scale-[0.98]",
        className
      )}
    >
      <Link aria-label="Go to favorites items" href="/favorites" prefetch={false}>
        <FavoritesIcon />
      </Link>
    </div>
  )
}
