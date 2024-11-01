import { ScalableBloomFilter } from "bloom-filters"
import { NextRequest, NextResponse } from "next/server"
import { getBucket } from "utils/ab-testing"
import { BUCKETS, facetParams } from "constants/index"
import GeneratedBloomFilter from "./lib/redirects/bloom-filter.json"

type RedirectEntry = {
  destination: string
  permanent: boolean
}

type Route = {
  page: string
  cookie: string
  buckets: readonly string[]
}

const BLOOM_FILTER = ScalableBloomFilter.fromJSON(GeneratedBloomFilter as any)
const ROUTES: Record<string, Route | undefined> = {
  "/": {
    page: "/home",
    cookie: "bucket-home",
    buckets: BUCKETS.HOME,
  },
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Bloom filters gives false positives for `/`
  const homeAwarePathname = pathname === "/" ? "/home" : pathname

  if (BLOOM_FILTER.has(homeAwarePathname)) {
    const response = await handleRedirectsMiddleware(request)

    if (response) {
      return response
    }
  }

  const route = ROUTES[pathname]
  if (route) {
    return handleAbTestingMiddleware(request, route)
  }

  if (isCLP(request)) {
    return handleCLPMiddleware(request)
  }

  if (isPLP(request)) {
    return handlePLPMiddleware(request)
  }

  return NextResponse.next()
}

async function handleRedirectsMiddleware(request: NextRequest) {
  const api = new URL(`/api/redirects?pathname=${encodeURIComponent(request.nextUrl.pathname)}`, request.nextUrl.origin)

  try {
    const redirectData = await fetch(api)

    if (redirectData.ok) {
      const redirectEntry = (await redirectData.json()) as RedirectEntry | undefined

      if (redirectEntry) {
        const statusCode = redirectEntry.permanent ? 308 : 307
        return NextResponse.redirect(new URL(redirectEntry.destination, request.nextUrl.origin), statusCode)
      }
    }
  } catch (error) {
    console.error(error)
  }
}

function handleAbTestingMiddleware(request: NextRequest, route: Route) {
  let bucket = request.cookies.get(route.cookie)?.value
  let hasBucket = !!bucket

  if (!bucket || !route.buckets.includes(bucket)) {
    bucket = getBucket(route.buckets)
    hasBucket = false
  }

  const url = request.nextUrl.clone()
  url.pathname = `${route.page}/${bucket}`

  const res = NextResponse.rewrite(url)
  !hasBucket && res.cookies.set(route.cookie, bucket)

  return res
}

function handleCLPMiddleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const page = request.nextUrl.searchParams.get("page")

  if (page) {
    url.pathname = `category/clp/${request.nextUrl.pathname.split("/")[2]}/${page}`
    url.searchParams.delete("page")

    return NextResponse.rewrite(url)
  }

  url.pathname = `category/clp/${request.nextUrl.pathname.split("/")[2]}`

  return NextResponse.rewrite(url)
}

function handlePLPMiddleware(request: NextRequest) {
  const url = request.nextUrl.clone()

  url.pathname = `category/plp/${request.nextUrl.pathname.split("/")[2]}`

  return NextResponse.rewrite(url)
}

export const config = {
  // https://nextjs.org/docs/messages/edge-dynamic-code-evaluation
  unstable_allowDynamic: ["**/node_modules/lodash/lodash.js", "**/node_modules/reflect-metadata/Reflect.js"],
  matcher: ["/", "/((?!api|_next|cache-healthcheck|health|_vercel|.*\\..*).*)"],
}

function isCLP(request: NextRequest): boolean {
  const isCategory = request.nextUrl.pathname.startsWith("/category/")
  const isInternalRoute = request.nextUrl.pathname.startsWith("/category/clp/")
  const isFaceted = facetParams.some((param) => request.nextUrl.searchParams.has(param))

  return isCategory && !isFaceted && !isInternalRoute
}

function isPLP(request: NextRequest): boolean {
  const isCategory = request.nextUrl.pathname.startsWith("/category/")
  const isInternalRoute = request.nextUrl.pathname.startsWith("/category/plp/")
  const isFaceted = facetParams.some((param) => request.nextUrl.searchParams.has(param))

  return isCategory && isFaceted && !isInternalRoute
}
