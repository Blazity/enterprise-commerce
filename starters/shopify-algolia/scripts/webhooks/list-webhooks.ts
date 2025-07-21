import { createAdminApiClient } from "@shopify/admin-api-client"
import { env } from "../../env.mjs"

interface WebhookNode {
  id: string
  topic: string
  createdAt: string
  updatedAt: string
  endpoint?: {
    __typename: string
    callbackUrl?: string
  }
}

interface WebhookEdge {
  node: WebhookNode
}

interface WebhookSubscriptionsResponse {
  data?: {
    webhookSubscriptions?: {
      edges: WebhookEdge[]
      pageInfo: {
        hasNextPage: boolean
        endCursor: string | null
      }
    }
  }
}

const LIST_WEBHOOKS_QUERY = `#graphql
  query listAllWebhooks($first: Int!, $after: String) {
    webhookSubscriptions(first: $first, after: $after) {
      edges {
        node {
          id
          topic
          createdAt
          updatedAt
          endpoint {
            __typename
            ... on WebhookHttpEndpoint {
              callbackUrl
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

async function listWebhooks() {
  if (!env.SHOPIFY_STORE_DOMAIN || !env.SHOPIFY_ADMIN_ACCESS_TOKEN) {
    console.error("❌ Missing required environment variables:")
    console.error("   - SHOPIFY_STORE_DOMAIN")
    console.error("   - SHOPIFY_ADMIN_ACCESS_TOKEN")
    process.exit(1)
  }

  const client = createAdminApiClient({
    storeDomain: env.SHOPIFY_STORE_DOMAIN,
    accessToken: env.SHOPIFY_ADMIN_ACCESS_TOKEN,
    apiVersion: "2024-10",
  })

  console.log("📋 Listing webhooks for:", env.SHOPIFY_STORE_DOMAIN)
  console.log("=".repeat(60))

  try {
    const allWebhooks: WebhookEdge[] = []
    let hasNextPage = true
    let cursor: string | null = null

    while (hasNextPage) {
      const response = (await client.request(LIST_WEBHOOKS_QUERY, {
        variables: {
          first: 50,
          after: cursor,
        },
      })) as WebhookSubscriptionsResponse

      const webhooks = response.data?.webhookSubscriptions?.edges || []
      allWebhooks.push(...webhooks)

      hasNextPage = response.data?.webhookSubscriptions?.pageInfo?.hasNextPage || false
      cursor = response.data?.webhookSubscriptions?.pageInfo?.endCursor || null
    }

    if (allWebhooks.length === 0) {
      console.log("\n✅ No webhooks found")
      console.log("\nTo create webhooks, run: yarn webhooks:setup")
      return
    }

    console.log(`\n📊 Found ${allWebhooks.length} webhook(s):\n`)

    const groupedByUrl = allWebhooks.reduce(
      (acc, webhook) => {
        const url = webhook.node.endpoint?.callbackUrl || "No URL"
        if (!acc[url]) acc[url] = []
        acc[url].push(webhook.node)
        return acc
      },
      {} as Record<string, WebhookNode[]>
    )

    Object.entries(groupedByUrl).forEach(([url, webhooks]) => {
      console.log(`🔗 Endpoint: ${url}`)
      console.log(`   Webhooks (${webhooks.length}):`)

      webhooks.forEach((webhook) => {
        console.log(`   - ${webhook.topic}`)
        console.log(`     ID: ${webhook.id}`)
        console.log(`     Created: ${new Date(webhook.createdAt).toLocaleString()}`)
        if (webhook.updatedAt !== webhook.createdAt) {
          console.log(`     Updated: ${new Date(webhook.updatedAt).toLocaleString()}`)
        }
      })
      console.log("")
    })

    const topics = allWebhooks.map((w) => w.node.topic)
    const uniqueTopics = Array.from(new Set(topics))

    console.log("📈 Summary:")
    console.log(`   Total webhooks: ${allWebhooks.length}`)
    console.log(`   Unique topics: ${uniqueTopics.length}`)
    console.log(`   Endpoints: ${Object.keys(groupedByUrl).length}`)
  } catch (error) {
    console.error("❌ Failed to list webhooks:", error)
    process.exit(1)
  }
}

const args = process.argv.slice(2)
if (args.includes("--help")) {
  console.log(`
Shopify Webhook List Script

Usage: yarn webhooks:list

This script lists all webhooks registered for your Shopify store via the Admin API.

Note: Webhooks created through the Shopify Admin Panel (Settings > Notifications)
are separate and will not be shown here.
`)
  process.exit(0)
}

listWebhooks()
