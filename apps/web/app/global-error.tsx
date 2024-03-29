"use client"

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <pre>{JSON.stringify(error, null, 2)}</pre>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
