import { FavoritesIcon } from "components/Icons/FavoritesIcon"
import { cn } from "utils/cn"

interface FavoritesProps {
  className?: string
}

export function Favorites({ className }: FavoritesProps) {
  return (
    <div className={cn("mt-0.5 hidden size-8 cursor-pointer items-center fill-none transition-transform hover:scale-105  md:flex", className)}>
      <FavoritesIcon />
    </div>
  )
}
