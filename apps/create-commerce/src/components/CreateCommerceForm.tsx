import { atom, useAtom } from "jotai"
import { useEffect } from "react"
import { isNil } from "remeda"
import { Text, useFocusManager } from "ink"

import { QuestionTextInput } from "./QuestionTextInput"
import { QuestionSelectInput } from "./QuestionSelectInput"

export type Step = "project-directory" | "package-manager" | "shopify-storefront-api-token" | "meilisearch-api-token"

const projectDirectoryAtom = atom("")
const shopifyStorefrontApiTokenAtom = atom("")
const meilisearchApiTokenAtom = atom("")
const packageManagerAtom = atom("")

const formValuesAtom = atom((get) => {
  return {
    "project-directory": get(projectDirectoryAtom),
    "shopify-storefront-api-token": get(shopifyStorefrontApiTokenAtom),
    "meilisearch-api-token": get(meilisearchApiTokenAtom),
    "package-manager": get(packageManagerAtom),
  }
})

const completedStepsAtom = atom<Step[]>((get) => Object.entries(get(formValuesAtom)).map(([step, value]) => (value ? step : undefined)) as Step[])

export type CreateCommerceFormValues = Record<Step, string>

type CreateCommerceFormProps = {
  defaultPackageManager?: string
  onFormSubmit: (formValues: CreateCommerceFormValues) => void
}

export function CreateCommerceForm({ onFormSubmit, defaultPackageManager }: CreateCommerceFormProps) {
  const [completedSteps] = useAtom(completedStepsAtom)
  const [formValues] = useAtom(formValuesAtom)
  const { disableFocus } = useFocusManager()

  useEffect(() => {
    if (completedSteps.filter((step) => !isNil(step)).length === 4) {
      onFormSubmit(formValues)
      disableFocus()
    }
  }, [completedSteps, formValues])

  return (
    <>
      <ProjectDirectory />

      {completedSteps.includes("project-directory") ? <ShopifyStorefrontAPIToken /> : null}

      {completedSteps.includes("shopify-storefront-api-token") ? <MeilisearchAPIToken /> : null}

      {completedSteps.includes("meilisearch-api-token") ? <PackageManager defaultPackageManager={defaultPackageManager} /> : null}
    </>
  )
}

function ProjectDirectory() {
  const stepName: Step = "project-directory"
  const [, setProjectDirectory] = useAtom(projectDirectoryAtom)

  return (
    <QuestionTextInput
      id={stepName}
      nextFocusId="shopify-storefront-api-token"
      question="Project directory"
      defaultValue="./my-store"
      onEnter={(value) => {
        setProjectDirectory(value)
      }}
    />
  )
}

function ShopifyStorefrontAPIToken() {
  const stepName: Step = "shopify-storefront-api-token"
  const [, setShopifyStorefrontApiToken] = useAtom(shopifyStorefrontApiTokenAtom)

  return (
    <QuestionTextInput
      id={stepName}
      nextFocusId="meilisearch-api-token"
      question="Shopify Storefront API Token"
      secretInput
      onEnter={(value) => {
        setShopifyStorefrontApiToken(value)
      }}
    />
  )
}

function MeilisearchAPIToken() {
  const stepName: Step = "meilisearch-api-token"
  const [, setMeilisearchApiToken] = useAtom(meilisearchApiTokenAtom)

  return (
    <QuestionTextInput
      id={stepName}
      nextFocusId="package-manager"
      question="Meilisearch API Token"
      secretInput
      onEnter={(value) => {
        setMeilisearchApiToken(value)
      }}
    />
  )
}

function PackageManager({ defaultPackageManager }: { defaultPackageManager?: string }) {
  const stepName: Step = "package-manager"
  const [, setPackageManager] = useAtom(packageManagerAtom)

  return (
    <QuestionSelectInput
      id={stepName}
      question="Package Manager"
      defaultValue={defaultPackageManager ?? "npm"}
      items={[
        { label: "yarn", value: "yarn" },
        { label: "npm", value: "npm" },
        { label: "pnpm", value: "pnpm" },
      ]}
      onEnter={(value) => {
        setPackageManager(value)
      }}
    />
  )
}
