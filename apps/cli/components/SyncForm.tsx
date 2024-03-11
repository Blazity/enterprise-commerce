import { atom, useAtom } from "jotai"
import { useEffect } from "react"
import { isNil } from "remeda"
import { useFocusManager } from "ink"

import { QuestionTextInput } from "./QuestionTextInput"

export type Step = "live-app-url" | "shopify-store-url" | "shopify-admin-access-token"

const liveAppUrlAtom = atom("")
const shopifyStoreUrlAtom = atom("")
const shopifyAdminAccessTokenAtom = atom("")
const submittedAtom = atom(false)

const formValuesAtom = atom((get) => {
  return {
    "live-app-url": get(liveAppUrlAtom),
    "shopify-store-url": get(shopifyStoreUrlAtom),
    "shopify-admin-access-token": get(shopifyAdminAccessTokenAtom),
  }
})

const completedStepsAtom = atom<Step[]>((get) => Object.entries(get(formValuesAtom)).map(([step, value]) => (value ? step : undefined)) as Step[])

export type SyncFormValues = Record<Step, string>

type SyncFormProps = {
  onFormSubmit: (formValues: SyncFormValues) => void
}

const NO_OF_STEPS = 3

export function SyncForm({ onFormSubmit }: SyncFormProps) {
  const [completedSteps] = useAtom(completedStepsAtom)
  const [formValues] = useAtom(formValuesAtom)
  const [hasSubmitted, setSubmitted] = useAtom(submittedAtom)
  const { disableFocus } = useFocusManager()

  useEffect(() => {
    if (completedSteps.filter((step) => !isNil(step)).length === NO_OF_STEPS) {
      disableFocus()

      if (!hasSubmitted) {
        onFormSubmit(formValues)
        setSubmitted(true)
      }
    }
  }, [completedSteps, formValues])

  return (
    <>
      <LiveAppUrl />

      {completedSteps.includes("live-app-url") ? <ShopifyStoreUrl /> : null}

      {completedSteps.includes("shopify-store-url") ? <ShopifyAdminAccessToken /> : null}
    </>
  )
}

function LiveAppUrl() {
  const stepName: Step = "live-app-url"
  const [, setProjectDirectory] = useAtom(liveAppUrlAtom)

  return (
    <QuestionTextInput
      id={stepName}
      helpText="This is the web address where your Next.js app is hosted. Do not put '/' at the end. For example: https://store.blazity.com"
      nextFocusId="shopify-store-url"
      question="Store URL"
      onEnter={(value) => {
        setProjectDirectory(value)
      }}
    />
  )
}

function ShopifyStoreUrl() {
  const stepName: Step = "shopify-store-url"
  const [, setProjectDirectory] = useAtom(shopifyStoreUrlAtom)

  return (
    <QuestionTextInput
      id={stepName}
      helpText="This is the web address where you can access your original Shopify storefront. Please provide just the hostname, without 'https' and '/' (e.g., yourstore.myshopify.com)"
      nextFocusId="shopify-admin-access-token"
      question="Shopify Store URL"
      onEnter={(value) => {
        setProjectDirectory(value)
      }}
    />
  )
}

function ShopifyAdminAccessToken() {
  const stepName: Step = "shopify-admin-access-token"
  const [, setShopifyStorefrontApiToken] = useAtom(shopifyAdminAccessTokenAtom)

  return (
    <QuestionTextInput
      id={stepName}
      helpText="This is a token that you can generate from your private Shopify app. Learn more here https://commerce.blazity.com/docs/access-tokens"
      question="Shopify Admin Access Token"
      secretInput
      onEnter={(value) => {
        setShopifyStorefrontApiToken(value)
      }}
    />
  )
}
