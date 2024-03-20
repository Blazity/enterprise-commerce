import { NextResponse, NextRequest } from "next/server"
import { ScalableBloomFilter } from "bloom-filters"
import GeneratedBloomFilter from "./redirects/bloom-filter.json"

type RedirectEntry = {
  destination: string
  permanent: boolean
}

const bloomFilter = ScalableBloomFilter.fromJSON(GeneratedBloomFilter as any)

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (bloomFilter.has(pathname)) {
    const api = new URL(`/api/redirects?pathname=${encodeURIComponent(request.nextUrl.pathname)}`, request.nextUrl.origin)

    try {
      const redirectData = await fetch(api)

      if (redirectData.ok) {
        const redirectEntry: RedirectEntry | undefined = await redirectData.json()

        if (redirectEntry) {
          const statusCode = redirectEntry.permanent ? 308 : 307
          return NextResponse.redirect(new URL(redirectEntry.destination, request.nextUrl.origin), statusCode)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return NextResponse.next()
}

export const config = {
  // https://nextjs.org/docs/messages/edge-dynamic-code-evaluation
  unstable_allowDynamic: ["**/node_modules/lodash/lodash.js", "**/node_modules/reflect-metadata/Reflect.js"],
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
