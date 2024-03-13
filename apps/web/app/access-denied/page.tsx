import Link from "next/link"

export default function AccessDenied() {
  return (
    <div className="max-w-container-sm mx-auto flex flex-col gap-16 px-4 py-32 text-4xl md:py-64">
      <p>Looks like you don&apos;t have access to this page. If you were logged in before your session might&apos;ve expired. Please log in again! 😊 </p>

      <Link href="/" className="text-2xl underline hover:no-underline">
        Go Home
      </Link>
    </div>
  )
}
