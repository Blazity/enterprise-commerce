#!/usr/bin/env node

/**
 * Algolia Rate Limiting Summary
 *
 * This script shows all the granular rate limiting configurations
 * for your Vercel WAF setup to protect against excessive Algolia usage.
 *
 * Run: node scripts/rate-limit-summary.js
 */

const ALGOLIA_RATE_LIMIT_RULES = [
  {
    key: "algolia-category-browse",
    description: "Category listing pages with facet filtering",
    patterns: ["/category/", "/ai/category/"],
    conditions: "Rate limits category pages with search params (faceting) or PLP routes",
    algoliaCost: "HIGH - Complex faceted queries with multiple filters",
    usage: "Applied when: hasSearchParams || hasFacetParams || includes('/plp/')",
  },
  {
    key: "algolia-product-search",
    description: "Search pages with query and filtering",
    patterns: ["/search", "/ai/search"],
    conditions: "Always rate limit search pages as they perform complex queries",
    algoliaCost: "VERY HIGH - Full-text search with faceting and sorting",
    usage: "Applied to all search page requests",
  },
  {
    key: "algolia-product-browse",
    description: "Product browsing with filtering and sorting",
    patterns: ["/category/", "/ai/category/"],
    conditions: "Rate limit when sorting, filtering, or pagination is involved",
    algoliaCost: "HIGH - Filtered queries with sorting and pagination",
    usage: "Applied when: sort || page || q || facetParams present",
  },
  {
    key: "algolia-similar-products",
    description: "Product detail pages (recommendations)",
    patterns: ["/product/", "/ai/product/"],
    conditions: "Rate limit product pages as they fetch similar products",
    algoliaCost: "MEDIUM - Recommendation queries",
    usage: "Applied to product pages (excluding /draft and /opengraph-image)",
  },
  {
    key: "algolia-reviews-fetch",
    description: "Review pages with pagination",
    patterns: ["/reviews/"],
    conditions: "Rate limit review pages, especially with pagination",
    algoliaCost: "LOW - Simple product review queries",
    usage: "Applied to all review page requests",
  },
  {
    key: "algolia-facet-values",
    description: "Dynamic facet value loading",
    patterns: ["/api/search", "/api/suggestions"],
    conditions: "Rate limit API endpoints that fetch facet values",
    algoliaCost: "MEDIUM - Facet value enumeration queries",
    usage: "Applied to search and suggestion API endpoints",
  },
  {
    key: "algolia-ai-features",
    description: "AI-powered search and recommendations",
    patterns: ["/ai/"],
    conditions: "Extra rate limiting for AI features",
    algoliaCost: "VERY HIGH - AI-enhanced queries with complex processing",
    usage: "Applied when: ai || recommend params or /ai/search paths",
  },
]

console.log("🛡️  ALGOLIA RATE LIMITING CONFIGURATION")
console.log("=====================================\n")

console.log("📊 VERCEL WAF KEYS TO CONFIGURE:\n")

ALGOLIA_RATE_LIMIT_RULES.forEach((rule, index) => {
  console.log(`${index + 1}. ${rule.key}`)
  console.log(`   Description: ${rule.description}`)
  console.log(`   Patterns: ${rule.patterns.join(", ")}`)
  console.log(`   Algolia Cost: ${rule.algoliaCost}`)
  console.log(`   Trigger: ${rule.usage}`)
  console.log("")
})

console.log("💰 COST PRIORITY (Highest to Lowest):")
console.log("1. algolia-product-search - Full-text search queries")
console.log("2. algolia-ai-features - AI-enhanced complex queries")
console.log("3. algolia-category-browse - Faceted category queries")
console.log("4. algolia-product-browse - Filtered product browsing")
console.log("5. algolia-facet-values - Facet enumeration")
console.log("6. algolia-similar-products - Recommendation queries")
console.log("7. algolia-reviews-fetch - Simple review queries")

console.log("\n🎯 RECOMMENDED WAF SETTINGS:")
console.log("• algolia-product-search: 10 requests/minute per IP")
console.log("• algolia-ai-features: 5 requests/minute per IP")
console.log("• algolia-category-browse: 20 requests/minute per IP")
console.log("• algolia-product-browse: 30 requests/minute per IP")
console.log("• algolia-facet-values: 15 requests/minute per IP")
console.log("• algolia-similar-products: 50 requests/minute per IP")
console.log("• algolia-reviews-fetch: 40 requests/minute per IP")

console.log("\n📝 IMPLEMENTATION DETAILS:")
console.log("• Rate limiting is applied in Edge Middleware for optimal performance")
console.log("• Each rule has conditional logic to avoid unnecessary rate limiting")
console.log("• Static pages bypass rate limiting entirely (handled at build time)")
console.log("• Detailed logging available in development mode")
console.log("• Graceful fallback when rate limit checks fail")

console.log("\n🚀 DEPLOYMENT CHECKLIST:")
console.log("✓ Configure all 7 rate limit keys in Vercel WAF")
console.log("✓ Set VERCEL_FIREWALL_DEV_HOST for development testing")
console.log("✓ Monitor rate limit logs in production")
console.log("✓ Adjust limits based on actual usage patterns")
console.log("✓ Set up alerts for rate limit violations")
