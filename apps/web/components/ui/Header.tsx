import { env } from "env.mjs"
import { unstable_cache } from "next/cache"
import Link from "next/link"
import { storefrontClient } from "utils/storefrontClient"
import { Input } from "./Input"

export async function Header() {
  const items = await getCachedMenuItems()

  return (
    <header className="container mx-auto flex h-14 items-center justify-center px-4 lg:px-6">
      <Link className="flex items-center justify-center" href="/">
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <div className="relative ml-4 w-64">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            className="w-full appearance-none bg-white pl-8 shadow-none"
            placeholder="Search products..."
            type="search"
          />
        </div>
        {items.map((singleItem) => (
          <Link
            key={singleItem.url}
            className="text-sm font-medium underline-offset-4 hover:underline"
            href={singleItem.url}
          >
            {singleItem.title}
          </Link>
        ))}
        <Link className="text-sm font-medium underline-offset-4 hover:underline" href="/search">
          PLP
        </Link>
        <Link className="text-sm font-medium underline-offset-4 hover:underline" href="/sport">
          CLP
        </Link>
        <Link className="text-sm font-medium underline-offset-4 hover:underline" href="#">
          About
        </Link>
        <Link className="text-sm font-medium underline-offset-4 hover:underline" href="#">
          Contact
        </Link>
      </nav>
    </header>
  )
}

const getCachedMenuItems = unstable_cache(async () => getMenuItems(), ["menu"], { revalidate: 3600 })

async function getMenuItems() {
  const menu = await storefrontClient.getMenu()
  const items = menu.data?.menu?.items

  if (!items || menu.errors?.graphQLErrors) return []

  return items?.map((singleItem) => ({
    ...singleItem,
    url: singleItem.url.replace(`https://${env.SHOPIFY_STORE_DOMAIN}`, ""),
  }))
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
