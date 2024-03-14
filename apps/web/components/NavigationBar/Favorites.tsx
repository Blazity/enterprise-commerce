import { FavoritesIcon } from "components/Icons/FavoritesIcon"
import Link from "next/link"
import { cn } from "utils/cn"

interface FavoritesProps {
  className?: string
}

export async function Favorites({ className }: FavoritesProps) {
  return (
    <div className={cn("mt-0.5 hidden size-8 cursor-pointer items-center fill-none transition-transform hover:scale-105  md:flex", className)}>
      <Link href="/favorites" prefetch={false}>
        <FavoritesIcon />
      </Link>
    </div>
  )
}
