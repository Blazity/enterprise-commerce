import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <h1 className="text-6xl font-bold text-neutral-800 dark:text-neutral-200">404</h1>
      <p className="mt-4 text-2xl text-neutral-600 dark:text-neutral-500">Page not found</p>
      <p className="mt-2 text-lg text-neutral-500 dark:text-neutral-300">Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
      <Link
        prefetch={false}
        className="mt-8 rounded-md bg-neutral-200 px-6 py-2 text-neutral-900 hover:bg-neutral-300 hover:text-neutral-900 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600 dark:hover:text-neutral-200"
        href="/"
      >
        Go to Homepage
      </Link>
    </div>
  )
}
