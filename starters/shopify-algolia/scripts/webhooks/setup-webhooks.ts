import { createAdminApiClient } from "@shopify/admin-api-client"
import { env } from "../../env.mjs"

const WEBHOOK_TOPICS = [
  "PRODUCTS_CREATE",
  "PRODUCTS_UPDATE",
  "PRODUCTS_DELETE",
  "COLLECTIONS_CREATE",
  "COLLECTIONS_UPDATE",
  "COLLECTIONS_DELETE",
] as const

const CREATE_WEBHOOK_MUTATION = `#graphql
  mutation webhookSubscriptionCreate($topic: WebhookSubscriptionTopic!, $webhookSubscription: WebhookSubscriptionInput!) {
    webhookSubscriptionCreate(topic: $topic, webhookSubscription: $webhookSubscription) {
      userErrors {
        field
        message
      }
      webhookSubscription {
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
  }
`

const LIST_WEBHOOKS_QUERY = `#graphql
  query listWebhooks($first: Int!, $topics: [WebhookSubscriptionTopic!]) {
    webhookSubscriptions(first: $first, topics: $topics) {
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
    }
  }
`

interface SetupWebhooksOptions {
  apiDomain?: string
  dryRun?: boolean
}

async function setupWebhooks(options: SetupWebhooksOptions = {}) {
  const { apiDomain = process.env.WEBHOOK_API_DOMAIN || "http://localhost:3000", dryRun = false } = options

  if (!env.SHOPIFY_STORE_DOMAIN || !env.SHOPIFY_ADMIN_ACCESS_TOKEN || !env.SHOPIFY_APP_API_SECRET_KEY) {
    console.error("❌ Missing required environment variables:")
    console.error("   - SHOPIFY_STORE_DOMAIN")
    console.error("   - SHOPIFY_ADMIN_ACCESS_TOKEN")
    console.error("   - SHOPIFY_APP_API_SECRET_KEY")
    process.exit(1)
  }

  const client = createAdminApiClient({
    storeDomain: env.SHOPIFY_STORE_DOMAIN,
    accessToken: env.SHOPIFY_ADMIN_ACCESS_TOKEN,
    apiVersion: "2024-10",
  })

  console.log("🔧 Setting up webhooks for Shopify store:", env.SHOPIFY_STORE_DOMAIN)
  console.log("📍 API Domain:", apiDomain)
  console.log("🔐 Using secret from SHOPIFY_APP_API_SECRET_KEY")

  if (dryRun) {
    console.log("⚠️  DRY RUN MODE - No webhooks will be created")
  }

  console.log("\n📋 Checking existing webhooks...")
  try {
    const existingWebhooks = await client.request(LIST_WEBHOOKS_QUERY, {
      variables: {
        first: 50,
        topics: WEBHOOK_TOPICS as any,
      },
    })

    const existingTopics = new Set(
      existingWebhooks.data?.webhookSubscriptions?.edges?.map((edge: any) => edge.node.topic) || []
    )

    if (existingTopics.size > 0) {
      console.log("ℹ️  Found existing webhooks for topics:")
      existingTopics.forEach((topic) => console.log(`   - ${topic}`))
    }

    console.log("\n🚀 Registering webhooks...")
    const callbackUrl = `${apiDomain}/api/feed/sync`

    for (const topic of WEBHOOK_TOPICS) {
      if (existingTopics.has(topic)) {
        console.log(`⏭️  Skipping ${topic} - already registered`)
        continue
      }

      if (dryRun) {
        console.log(`🔄 [DRY RUN] Would create webhook for ${topic}`)
        continue
      }

      try {
        const response = await client.request(CREATE_WEBHOOK_MUTATION, {
          variables: {
            topic,
            webhookSubscription: {
              callbackUrl,
              format: "JSON",
            },
          },
        })

        if (response.data?.webhookSubscriptionCreate?.userErrors?.length > 0) {
          console.error(`❌ Failed to create webhook for ${topic}:`)
          response.data.webhookSubscriptionCreate.userErrors.forEach((error: any) => {
            console.error(`   - ${error.field}: ${error.message}`)
          })
        } else {
          console.log(`✅ Created webhook for ${topic}`)
          console.log(`   ID: ${response.data?.webhookSubscriptionCreate?.webhookSubscription?.id}`)
          console.log(`   URL: ${callbackUrl}`)
        }
      } catch (error) {
        console.error(`❌ Error creating webhook for ${topic}:`, error)
      }
    }

    console.log("\n✨ Webhook setup complete!")
    console.log("\n📝 Notes:")
    console.log("- Webhooks will be validated using HMAC with your SHOPIFY_APP_API_SECRET_KEY")
    console.log("- Make sure your endpoint is accessible from the internet in production")
    console.log("- Use ngrok or similar for local development testing")
  } catch (error) {
    console.error("❌ Failed to setup webhooks:", error)
    process.exit(1)
  }
}

const args = process.argv.slice(2)
const apiDomain = args.find((arg) => arg.startsWith("--domain="))?.split("=")[1]
const dryRun = args.includes("--dry-run")

if (args.includes("--help")) {
  console.log(`
Shopify Webhook Setup Script

Usage: yarn webhooks:setup [options]

Options:
  --domain=<url>    API domain where webhooks will be sent (default: http://localhost:3000)
  --dry-run         Show what would be created without actually creating webhooks
  --help            Show this help message

Examples:
  yarn webhooks:setup
  yarn webhooks:setup --domain=https://myapp.com
  yarn webhooks:setup --dry-run
`)
  process.exit(0)
}

setupWebhooks({ apiDomain, dryRun })
