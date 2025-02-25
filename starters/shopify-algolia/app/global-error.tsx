"use client"

import { Button } from "components/ui/button-old"

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-neutral-100 dark:bg-neutral-900">
          <h1 className="text-6xl font-bold text-neutral-800 dark:text-neutral-200">Something went wrong!</h1>
          <pre className="mt-2 text-lg text-neutral-500 dark:text-neutral-300">{JSON.stringify(error, null, 2)}</pre>
          <Button variant="secondary" isAnimated={false} size="xl" className="text-[22px] hover:text-white" onClick={() => reset()}>
            Try again
          </Button>
        </div>
      </body>
    </html>
  )
}
