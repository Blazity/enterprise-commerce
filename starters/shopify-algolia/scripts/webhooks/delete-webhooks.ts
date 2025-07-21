import { createAdminApiClient } from "@shopify/admin-api-client"
import { env } from "../../env.mjs"

const LIST_WEBHOOKS_QUERY = `#graphql
  query listAllWebhooks($first: Int!, $after: String) {
    webhookSubscriptions(first: $first, after: $after) {
      edges {
        node {
          id
          topic
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

const DELETE_WEBHOOK_MUTATION = `#graphql
  mutation webhookSubscriptionDelete($id: ID!) {
    webhookSubscriptionDelete(id: $id) {
      userErrors {
        field
        message
      }
      deletedWebhookSubscriptionId
    }
  }
`

interface DeleteWebhooksOptions {
  filter?: string
  dryRun?: boolean
  force?: boolean
}

interface WebhookNode {
  id: string
  topic: string
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

async function deleteWebhooks(options: DeleteWebhooksOptions = {}) {
  const { filter, dryRun = false, force = false } = options

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

  console.log("🗑️  Deleting webhooks for Shopify store:", env.SHOPIFY_STORE_DOMAIN)

  if (dryRun) {
    console.log("⚠️  DRY RUN MODE - No webhooks will be deleted")
  }

  try {
    console.log("\n📋 Fetching all webhooks...")
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
      console.log("✅ No webhooks found to delete")
      return
    }

    console.log(`📊 Found ${allWebhooks.length} webhook(s)`)

    let webhooksToDelete = allWebhooks
    if (filter) {
      webhooksToDelete = allWebhooks.filter((webhook) => {
        const topic = webhook.node.topic
        const url = webhook.node.endpoint?.callbackUrl || ""
        return topic.toLowerCase().includes(filter.toLowerCase()) || url.toLowerCase().includes(filter.toLowerCase())
      })
      console.log(`🔍 Filtered to ${webhooksToDelete.length} webhook(s) matching "${filter}"`)
    }

    if (webhooksToDelete.length === 0) {
      console.log("✅ No webhooks matched the filter criteria")
      return
    }

    console.log("\n📝 Webhooks to delete:")
    webhooksToDelete.forEach((webhook, index) => {
      console.log(`\n${index + 1}. Topic: ${webhook.node.topic}`)
      console.log(`   ID: ${webhook.node.id}`)
      console.log(`   URL: ${webhook.node.endpoint?.callbackUrl || "N/A"}`)
    })

    if (!force && !dryRun) {
      console.log(`\n⚠️  This will delete ${webhooksToDelete.length} webhook(s).`)
      console.log("   Use --force to skip this confirmation.")
      console.log("   Press Ctrl+C to cancel.\n")

      await new Promise((resolve) => {
        console.log("Waiting 5 seconds before proceeding...")
        setTimeout(resolve, 5000)
      })
    }

    if (!dryRun) {
      console.log("\n🚀 Deleting webhooks...")
      let deletedCount = 0
      let errorCount = 0

      for (const webhook of webhooksToDelete) {
        try {
          const response = await client.request(DELETE_WEBHOOK_MUTATION, {
            variables: {
              id: webhook.node.id,
            },
          })

          if (response.data?.webhookSubscriptionDelete?.userErrors?.length > 0) {
            console.error(`❌ Failed to delete webhook ${webhook.node.id}:`)
            response.data.webhookSubscriptionDelete.userErrors.forEach((error: any) => {
              console.error(`   - ${error.field}: ${error.message}`)
            })
            errorCount++
          } else {
            console.log(`✅ Deleted webhook: ${webhook.node.topic}`)
            deletedCount++
          }
        } catch (error) {
          console.error(`❌ Error deleting webhook ${webhook.node.id}:`, error)
          errorCount++
        }
      }

      console.log(`\n📊 Summary: ${deletedCount} deleted, ${errorCount} errors`)
    } else {
      console.log("\n✅ DRY RUN complete - no webhooks were deleted")
    }
  } catch (error) {
    console.error("❌ Failed to delete webhooks:", error)
    process.exit(1)
  }
}

const args = process.argv.slice(2)
const filter = args.find((arg) => arg.startsWith("--filter="))?.split("=")[1]
const dryRun = args.includes("--dry-run")
const force = args.includes("--force")

if (args.includes("--help")) {
  console.log(`
Shopify Webhook Deletion Script

Usage: yarn webhooks:delete [options]

Options:
  --filter=<text>   Only delete webhooks matching this text in topic or URL
  --dry-run         Show what would be deleted without actually deleting
  --force           Skip confirmation prompt
  --help            Show this help message

Examples:
  # Delete all webhooks (with confirmation)
  yarn webhooks:delete

  # Delete only product-related webhooks
  yarn webhooks:delete --filter=product

  # Delete webhooks for a specific URL
  yarn webhooks:delete --filter=ngrok.io

  # See what would be deleted without actually deleting
  yarn webhooks:delete --dry-run

  # Delete all webhooks without confirmation
  yarn webhooks:delete --force
`)
  process.exit(0)
}

deleteWebhooks({ filter, dryRun, force })
