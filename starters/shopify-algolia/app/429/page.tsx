import { Metadata } from "next"
import Link from "next/link"
import { BookOpenIcon, ClockIcon, RocketIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Rate Limit Exceeded | Enterprise Commerce",
  description: "You've temporarily exceeded our rate limits. Please wait a moment before trying again.",
}

export default function RateLimitPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-md text-center">
        {}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="flex size-24 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <ClockIcon className="size-12 text-gray-600 dark:text-gray-400" />
            </div>
            <div className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full bg-yellow-500">
              <span className="text-sm font-bold text-white">!</span>
            </div>
          </div>
        </div>

        {}
        <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">Rate Limit Exceeded</h2>

        {}
        <div className="mb-8 rounded-lg bg-gray-50 p-6 dark:bg-gray-800/50">
          <h3 className="mb-3 flex items-center justify-center gap-2 font-semibold text-gray-800 dark:text-gray-200">
            <RocketIcon className="size-4" />
            Why am I seeing this?
          </h3>
          <p className="text-balance text-sm text-gray-600 dark:text-gray-400">
            For demo purposes of <b>enterprise-commerce</b>, we limit amount of requests that can be made in a short
            time period in order to prevent abuse.
          </p>
        </div>

        {}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Return to Home
          </Link>

          <a
            href="https://docs.blazity.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <BookOpenIcon className="size-4" />
            Visit Our Docs
          </a>
        </div>

        {}
        <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>
            If you continue to experience issues, please{" "}
            <a
              href="https://docs.blazity.com/contact"
              className="underline hover:text-gray-700 dark:hover:text-gray-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              contact our support team
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
