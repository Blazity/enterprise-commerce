import { atom, useAtom } from "jotai"
import { useEffect } from "react"
import { isNil } from "remeda"
import { Text, useFocusManager } from "ink"

import { QuestionTextInput } from "./QuestionTextInput"
import { QuestionSelectInput } from "./QuestionSelectInput"

export type Step =
  | "project-directory"
  | "package-manager"
  | "shopify-storefront-api-token"
  | "meilisearch-api-token"
  | "meilisearch-api-host"

const projectDirectoryAtom = atom("")
const shopifyStorefrontApiTokenAtom = atom("")
const meilisearchApiTokenAtom = atom("")
const meilisearchApiHostAtom = atom("")
const packageManagerAtom = atom("")

const formValuesAtom = atom((get) => {
  return {
    "project-directory": get(projectDirectoryAtom),
    "shopify-storefront-api-token": get(shopifyStorefrontApiTokenAtom),
    "meilisearch-api-token": get(meilisearchApiTokenAtom),
    "meilisearch-api-host": get(meilisearchApiHostAtom),
    "package-manager": get(packageManagerAtom),
  }
})

const completedStepsAtom = atom<Step[]>(
  (get) => Object.entries(get(formValuesAtom)).map(([step, value]) => (value ? step : undefined)) as Step[]
)

export type CreateCommerceFormValues = Record<Step, string>

type CreateCommerceFormProps = {
  defaultPackageManager?: string
  onFormSubmit: (formValues: CreateCommerceFormValues) => void
}

const NO_OF_STEPS = 5

export function CreateCommerceForm({ onFormSubmit, defaultPackageManager }: CreateCommerceFormProps) {
  const [completedSteps] = useAtom(completedStepsAtom)
  const [formValues] = useAtom(formValuesAtom)
  const { disableFocus } = useFocusManager()

  useEffect(() => {
    if (completedSteps.filter((step) => !isNil(step)).length === NO_OF_STEPS) {
      onFormSubmit(formValues)
      disableFocus()
    }
  }, [completedSteps, formValues])

  return (
    <>
      <ProjectDirectory />

      {completedSteps.includes("project-directory") ? <ShopifyStorefrontAPIToken /> : null}

      {completedSteps.includes("shopify-storefront-api-token") ? <MeilisearchAPIToken /> : null}

      {completedSteps.includes("meilisearch-api-token") ? <MeilisearchHost /> : null}

      {completedSteps.includes("meilisearch-api-host") ? (
        <PackageManager defaultPackageManager={defaultPackageManager} />
      ) : null}
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
      defaultValue="demo"
      question="Shopify Storefront API Token (optional)"
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
      nextFocusId="meilisearch-api-host"
      defaultValue="demo"
      question="Meilisearch API Token (optional)"
      secretInput
      onEnter={(value) => {
        setMeilisearchApiToken(value)
      }}
    />
  )
}

function MeilisearchHost() {
  const stepName: Step = "meilisearch-api-host"
  const [, setMeilisearchHost] = useAtom(meilisearchApiHostAtom)

  return (
    <QuestionTextInput
      id={stepName}
      nextFocusId="package-manager"
      defaultValue="demo"
      question="Meilisearch Host (optional)"
      secretInput
      onEnter={(value) => {
        setMeilisearchHost(value)
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
