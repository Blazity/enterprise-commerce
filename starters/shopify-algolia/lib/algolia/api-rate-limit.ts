import { checkRateLimit } from "@vercel/firewall"

type ApiRateLimitKey =
  | "algolia-data-sync"
  | "algolia-product-update"
  | "algolia-review-update"
  | "algolia-category-update"

export async function checkApiRateLimit(key: ApiRateLimitKey, request: Request): Promise<Response | null> {
  if (process.env.NODE_ENV === "development" && !process.env.VERCEL_FIREWALL_DEV_HOST) {
    return null
  }

  try {
    const result = await checkRateLimit(key, {
      request,
      firewallHostForDevelopment: process.env.VERCEL_FIREWALL_DEV_HOST,
    })

    if (result.rateLimited) {
      return new Response(
        JSON.stringify({
          error: "Rate limit exceeded",
          message: "Too many requests. Please try again later.",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    }

    return null
  } catch (error) {
    return null
  }
}
