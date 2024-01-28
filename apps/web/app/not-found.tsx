import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200">404</h1>
      <p className="mt-4 text-2xl text-gray-600 dark:text-gray-400">Page not found</p>
      <p className="mt-2 text-lg text-gray-500 dark:text-gray-300">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Link
        className="mt-8 rounded-md bg-gray-200 px-6 py-2 text-gray-900 hover:bg-gray-300 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-gray-200"
        href="/"
      >
        Go to Homepage
      </Link>
    </div>
  )
}
