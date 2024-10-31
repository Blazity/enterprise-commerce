import { cookies } from "next/headers"
import { Suspense } from "react"
import { ProductCard } from "components/product-card"
import { Skeleton } from "components/ui/skeleton"
import { COOKIE_FAVORITES } from "constants/index"
import { getProduct } from "lib/meilisearch"

export const revalidate = 86400

export const dynamicParams = true

export default async function Favorites() {
  return (
    <div className="mx-auto flex max-w-container-md flex-col gap-16 px-4 py-20 md:pb-32 md:pt-24 xl:px-0">
      <div className="basis-1/3 text-center text-5xl font-normal tracking-tighter sm:min-w-[280px] md:text-left md:text-6xl">
        <h2>Favorite products</h2>
      </div>
      <Suspense fallback={<FavoritesSkeleton />}>
        <FavoritesView />
      </Suspense>
    </div>
  )
}

async function FavoritesView() {
  let favoritesHandles: string[] = []
  const favoritesCookie = cookies().get(COOKIE_FAVORITES)?.value

  if (favoritesCookie) {
    favoritesHandles = JSON.parse(favoritesCookie) as string[]
  }

  const products = await Promise.all(favoritesHandles.map((handle) => getProduct(handle)).filter(Boolean))

  return (
    <>
      {products.length === 0 ? <p className="text-lg tracking-tight">No favorite products. You can add them by clicking on a heart icon on product page</p> : null}
      <div className="grid w-full grid-cols-[repeat(_auto-fill,minmax(140px,1fr)_)] items-start gap-4 gap-y-8 md:grid-cols-[repeat(_auto-fill,minmax(280px,1fr)_)]">
        {products.map((singleResult, idx) => (
          <ProductCard className="overflow-hidden rounded-lg" key={singleResult?.id} priority={[0, 1].includes(idx)} {...singleResult!} />
        ))}
      </div>
    </>
  )
}

function FavoritesSkeleton() {
  return (
    <section className="grid w-full grid-cols-[repeat(_auto-fill,minmax(140px,1fr)_)] items-start gap-4 gap-y-8 md:grid-cols-[repeat(_auto-fill,minmax(280px,1fr)_)]">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="flex h-[258px] w-full flex-col gap-4 md:h-[430px]">
          <Skeleton className="h-[320px]" />
          <div>
            <Skeleton className="h-[25px] w-3/4" />
            <Skeleton className="mt-1 h-[32px] w-12" />
          </div>
        </div>
      ))}
    </section>
  )
}
