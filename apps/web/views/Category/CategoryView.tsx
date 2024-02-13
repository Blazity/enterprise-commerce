import Link from "next/link"

export function CategoryView() {
  return (
    <main className="flex-1">
      <section className="w-full  pt-12 md:pt-24 lg:pt-32">
        <div className="space-y-10 px-4 md:px-6 xl:space-y-16">
          <div className="mx-auto grid max-w-[1300px] gap-4 px-4 sm:px-6 md:grid-cols-2 md:gap-16 md:px-10">
            <div className="flex flex-col items-start justify-start gap-6">
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">Discover the best products</h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">Shop the latest and most popular items at the best prices.</p>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Shop Now
              </Link>
            </div>
            <div>
              <img alt="Hero" className="mx-auto aspect-video overflow-hidden rounded-xl object-cover" height="310" src="https://placehold.co/550x310" width="550" />
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto w-full py-12 md:py-24 lg:py-32">
        <div className="space-y-12 px-4 md:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-5xl">Featured Products</h2>
          <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
            <div className="grid gap-1">
              <img alt="Product Image" className="mx-auto aspect-square overflow-hidden rounded-xl object-cover" height="300" src="https://placehold.co/300x300" width="300" />
              <h3 className="text-lg font-bold">Product 1</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">$99.99</p>
              <div className="flex items-center gap-0.5">
                <StarIcon className="fill-primary h-4 w-4" />
                <StarIcon className="fill-primary h-4 w-4" />
                <StarIcon className="fill-primary h-4 w-4" />
                <StarIcon className="fill-primary h-4 w-4" />
                <StarIcon className="fill-muted stroke-muted-foreground h-4 w-4" />
              </div>
            </div>
            <div className="grid gap-1">
              <img alt="Product Image" className="mx-auto aspect-square overflow-hidden rounded-xl object-cover" height="300" src="https://placehold.co/300x300" width="300" />
              <h3 className="text-lg font-bold">Product 2</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">$79.99</p>
              <div className="flex items-center gap-0.5">
                <StarIcon className="fill-primary h-4 w-4" />
                <StarIcon className="fill-primary h-4 w-4" />
                <StarIcon className="fill-primary h-4 w-4" />
                <StarIcon className="fill-primary h-4 w-4" />
                <StarIcon className="fill-muted stroke-muted-foreground h-4 w-4" />
              </div>
            </div>
            <div className="grid gap-1">
              <img alt="Product Image" className="mx-auto aspect-square overflow-hidden rounded-xl object-cover" height="300" src="https://placehold.co/300x300" width="300" />
              <h3 className="text-lg font-bold">Product 3</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">$59.99</p>
              <div className="flex items-center gap-0.5">
                <StarIcon className="fill-primary h-4 w-4" />
                <StarIcon className="fill-primary h-4 w-4" />
                <StarIcon className="fill-primary h-4 w-4" />
                <StarIcon className="fill-primary h-4 w-4" />
                <StarIcon className="fill-muted stroke-muted-foreground h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function StarIcon(props) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
