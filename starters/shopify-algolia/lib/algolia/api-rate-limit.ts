/**
 * Rate limiting helper for API routes
 * 
 * This helper is used in API route handlers where we have access
 * to the Request object required by @vercel/firewall
 */

import { checkRateLimit } from "@vercel/firewall"

// Rate limit keys for API operations
type ApiRateLimitKey = 
  | "algolia-data-sync"
  | "algolia-product-update"
  | "algolia-review-update"
  | "algolia-category-update"

/**
 * Check rate limit for API routes and return 429 response if limited
 * @param key - The rate limit key configured in Vercel WAF
 * @param request - The incoming request object
 * @returns Response object if rate limited, null otherwise
 */
export async function checkApiRateLimit(
  key: ApiRateLimitKey,
  request: Request
): Promise<Response | null> {
  // Skip rate limiting in development without VERCEL_FIREWALL_DEV_HOST
  if (process.env.NODE_ENV === 'development' && !process.env.VERCEL_FIREWALL_DEV_HOST) {
    return null
  }

  try {
    const result = await checkRateLimit(key, { 
      request,
      firewallHostForDevelopment: process.env.VERCEL_FIREWALL_DEV_HOST
    })
    
    if (result.rateLimited) {
      return new Response(
        JSON.stringify({ 
          error: "Rate limit exceeded",
          message: "Too many requests. Please try again later."
        }),
        { 
          status: 429,
          headers: {
            "Content-Type": "application/json",
          }
        }
      )
    }
    
    return null
  } catch (error) {
    // Log error but don't block the request
    console.error(`API rate limit check failed for key ${key}:`, error)
    return null
  }
}