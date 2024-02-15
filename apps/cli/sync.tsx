import { Box, Newline, Text, useApp } from "ink"
import { SyncFormValues, SyncForm } from "./components/SyncForm"
import { ShopAnimation } from "./components/ShopAnimation"
import { useEffect, useState } from "react"
import { AnimatedProgressBar } from "./components/AnimatedProgressBar"
import { Alert, Badge } from "@inkjs/ui"
import { createStorefrontClient } from "@enterprise-commerce/core"

interface Feedback {
  message: string
  status: "WARN" | "SUCCESS" | "FAIL" | "INFO"
}

const STATUS_BADGES: Record<Feedback["status"], React.ReactNode> = {
  FAIL: <Badge color="red">FAIL</Badge>,
  INFO: <Badge color="blue">INFO</Badge>,
  WARN: <Badge color="yellow">WARN</Badge>,
  SUCCESS: <Badge color="green">PASS</Badge>,
}

export function Sync() {
  const [progress, setProgress] = useState<number>(0)
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [formValues, setFormValues] = useState<SyncFormValues>()
  const [errorMessage, setErrorMessage] = useState<string>()

  const isFormFilled = formValues ? Object.keys(formValues).length > 0 : false

  const updateFeedback = (feedback: Feedback) => {
    setFeedbacks((prevFeedbacks) => [...prevFeedbacks, feedback])
  }

  useEffect(() => {
    if (!formValues || !isFormFilled || errorMessage) {
      return
    }

    async function migrate() {
      const prevWindow = window
      window = undefined

      const client = createStorefrontClient({
        strategy: "shopify",
        storeDomain: formValues["shopify-store-url"],
        adminAccessToken: formValues["shopify-admin-access-token"],
      })

      // This is a hacky way to get rid of Shopify enviornment validation to work with Ink that is using "window" variable.
      // Please do not remove or it will stop working.
      window = prevWindow

      const fetchedProductFeed = await client.createProductFeed()

      if (!fetchedProductFeed.data) {
        updateFeedback({ status: "FAIL", message: "Could not connect to Shopify store. Please, ensure you provided valid credentials." })
        process.exit(0)
        return
      }

      setProgress(10)
      updateFeedback({ status: "INFO", message: "Creating product feed..." })
      const errorMessage = fetchedProductFeed?.errors?.graphQLErrors?.find(Boolean)?.message

      if (!fetchedProductFeed || errorMessage) {
        updateFeedback({ status: "FAIL", message: "Could not create product feed." })
        process.exit(0)

        return
      }

      const userError = fetchedProductFeed?.data?.productFeedCreate?.userErrors?.find(Boolean)?.message
      let productFeed = fetchedProductFeed?.data?.productFeedCreate?.productFeed

      if (!productFeed) {
        const fetchedLatestProductFeed = await client.getLatestProductFeed()
        setProgress(20)
        updateFeedback({ status: "INFO", message: "Fetching latest product feed..." })
        productFeed = fetchedLatestProductFeed?.data?.productFeeds?.nodes?.find(Boolean)

        if (!productFeed && userError) {
          updateFeedback({ status: "FAIL", message: userError })
          process.exit(0)

          return
        }
      }

      setProgress(30)
      updateFeedback({ status: "INFO", message: "Subscribing PRODUCT_FEEDS_FULL_SYNC webhook..." })
      const fetchedWebhookMutation = await client.subscribeWebhook("PRODUCT_FEEDS_FULL_SYNC", `${formValues["live-app-url"]}/api/shopify`)
      const webhookServerError = fetchedWebhookMutation?.errors?.graphQLErrors?.find(Boolean)?.message
      const webhookUserErrror = fetchedWebhookMutation?.data?.webhookSubscriptionCreate?.userErrors?.find(Boolean)?.message

      if (webhookServerError) {
        updateFeedback({ status: "FAIL", message: webhookServerError })
        process.exit(0)

        return
      }

      if (webhookUserErrror) {
        updateFeedback({ status: "WARN", message: "Webhook subscription was already created" })
        setProgress(35)
        updateFeedback({ status: "INFO", message: "Reusing PRODUCT_FEEDS_FULL_SYNC webhook subscription..." })
      } else {
        setProgress(40)
        updateFeedback({ status: "SUCCESS", message: "Successfully subscribed to PRODUCT_FEEDS_FULL_SYNC webhook" })
      }

      const fetchedFullSync = await client.fullSyncProductFeed(productFeed?.id)
      setProgress(45)
      updateFeedback({ status: "INFO", message: "Starting full sync on latest product feed..." })

      const syncUserError = fetchedFullSync?.data?.productFullSync?.userErrors?.find(Boolean)?.message

      if (syncUserError) {
        updateFeedback({ status: "FAIL", message: syncUserError })
        process.exit(0)

        return
      }

      setProgress(80)
      updateFeedback({ status: "SUCCESS", message: "Full sync mode started. Migration should start in a few seconds" })
      setProgress(85)
      updateFeedback({ status: "INFO", message: "Subscribing PRODUCT_FEEDS_INCREMENTAL_SYNC webhook..." })

      const incrementalWebhook = await client.subscribeWebhook("PRODUCT_FEEDS_INCREMENTAL_SYNC", `${formValues["live-app-url"]}/api/shopify`)

      setProgress(95)
      updateFeedback({ status: "SUCCESS", message: "Successfully subscribed to PRODUCT_FEEDS_INCREMENTAL_SYNC webhook" })

      const incrementalWebhookServerError = incrementalWebhook?.errors?.graphQLErrors?.find(Boolean)?.message

      if (incrementalWebhookServerError) {
        updateFeedback({ status: "FAIL", message: incrementalWebhookServerError })
        process.exit(0)

        return
      }

      setProgress(100)
      updateFeedback({ status: "SUCCESS", message: "Done" })
      process.exit(0)
    }

    migrate()
  }, [formValues])

  return (
    <>
      <ShopAnimation />
      <Newline />
      <SyncForm onFormSubmit={(values) => setFormValues(values)} />
      <Newline />
      {isFormFilled && !errorMessage
        ? feedbacks.map((singleFeedback) => (
            <Box key={singleFeedback.message}>
              {STATUS_BADGES[singleFeedback.status]}
              <Box paddingLeft={3}>
                <Text color="white">{singleFeedback.message}</Text>
              </Box>
            </Box>
          ))
        : null}
      <Newline />
      {isFormFilled && !errorMessage ? <AnimatedProgressBarWithStatusText progress={progress || 0} /> : null}
      {errorMessage ? <CriticalError message={errorMessage} /> : null}
    </>
  )
}

type AnimatedProgressBarWithStatusTextProps = {
  progress: number
}

function AnimatedProgressBarWithStatusText({ progress }: AnimatedProgressBarWithStatusTextProps) {
  const [shouldShowStatusText, setShouldShowStatusText] = useState(false)
  const { exit } = useApp()

  useEffect(() => {
    if (progress === 100) {
      setShouldShowStatusText(true)
      exit()
      process.exit(0)
    }
  }, [progress])

  return (
    <>
      <AnimatedProgressBar progress={progress} />
      {shouldShowStatusText ? <Text>Done!</Text> : null}
    </>
  )
}

function CriticalError({ message }: { message: string }) {
  const { exit } = useApp()

  useEffect(() => {
    exit()
    process.exit(0)
  }, [])

  return (
    <Box marginBottom={1}>
      <Alert variant="error">Critical Error Occured: {message}</Alert>
    </Box>
  )
}
