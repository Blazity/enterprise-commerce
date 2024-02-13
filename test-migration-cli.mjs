import { createStorefrontClient } from "@enterprise-commerce/core"

const client = createStorefrontClient({
  strategy: "shopify",
  storeDomain: null,
  storefrontAccessToken: null,
  adminAccessToken: null,
})

async function abc() {
  const fetchedProductFeed = await client.createProductFeed()
  console.log("Creating product feed...")
  const errorMessage = fetchedProductFeed?.errors?.graphQLErrors?.find(Boolean)?.message

  if (!fetchedProductFeed || errorMessage) {
    console.error(errorMessage || "Could not create product feed.")
    return
  }

  const userError = fetchedProductFeed?.data?.productFeedCreate?.userErrors?.find(Boolean)?.message
  const productFeed = fetchedProductFeed?.data?.productFeedCreate?.productFeed

  if (!productFeed) {
    const fetchedLatestProductFeed = await client.getLatestProductFeed()
    console.log("Product feed already created. Fetching latest product feed...")
    const latestProductFeed = fetchedLatestProductFeed?.data?.productFeeds?.nodes?.find(Boolean)

    if (!latestProductFeed && userError) {
      console.error(userError)
      return
    }

    const fetchedWebhookMutation = await client.subscribeWebhook(
      "PRODUCT_FEEDS_FULL_SYNC",
      "https://c370-2a02-a311-813b-8880-b95b-ce26-df22-691e.ngrok-free.app/api/shopify"
    )
    const webhookServerError = fetchedWebhookMutation?.errors?.graphQLErrors?.find(Boolean)?.message
    const webhookUserErrror =
      fetchedWebhookMutation?.data?.webhookSubscriptionCreate?.userErrors?.find(Boolean)?.message

    if (webhookServerError) {
      console.error(webhookServerError)
      return
    }

    if (webhookUserErrror) {
      console.log("Webhook subscription already created, reusing...")
    } else {
      console.log("Creating webhook subscription...")
    }

    const fetchedFullSync = await client.fullSyncProductFeed(latestProductFeed.id)
    console.log("Starting full sync on latest product feed...")
    const syncUserError = fetchedFullSync?.data?.productFullSync?.userErrors?.find(Boolean)?.message

    if (syncUserError) {
      console.error(syncUserError)
      return
    }

    console.log("Started full sync. Migration should be finished in a few minutes")

    const incrementalWebhook = await client.subscribeWebhook(
      "PRODUCT_FEEDS_INCREMENTAL_SYNC",
      "https://c370-2a02-a311-813b-8880-b95b-ce26-df22-691e.ngrok-free.app/api/shopify"
    )

    console.log("Subscribing for incremental sync...")

    const incrementalWebhookServerError = incrementalWebhook?.errors?.graphQLErrors?.find(Boolean)?.message

    if (incrementalWebhookServerError) {
      console.error(incrementalWebhookServerError)
      return
    }
  }
}

await abc()
