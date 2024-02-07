import { useEffect, useState } from "react"
import { Text, Newline, useFocusManager } from "ink"

import { QuestionTextInput } from "./components/QuestionTextInput"
import { QuestionSelectInput } from "./components/QuestionSelectInput"
import { ShopAnimation } from "./components/ShopAnimation"
import { type Step, useCompletedStepsStore } from "./store/completed-steps"

type AppProps = {
  systemUserName: string
  packageManager: string
}

type FormValues = Record<Step, string>

export function App({ systemUserName, packageManager }: AppProps) {
  const [formValues, setFormValues] = useState<FormValues>({
    "project-directory": "",
    "shopify-storefront-api-token": "",
    "meilisearch-api-token": "",
    "package-manager": "",
  })

  const completedSteps = useCompletedStepsStore((state) => state.completedSteps)
  const addCompletedStep = useCompletedStepsStore((state) => state.addCompletedStep)

  useEffect(() => {
    console.log("completedSteps", completedSteps)
    console.log("formValues", formValues)
  }, [formValues, completedSteps])

  return (
    <>
      <Newline />
      <ShopAnimation />
      <Newline />
      <Text>Welcome, {systemUserName}! Let's create your new store!</Text>

      <QuestionTextInput
        id="project-directory"
        nextFocusId="shopify-storefront-api-token"
        question="Project directory"
        defaultValue="./my-store"
        onEnter={(projectDirectory) => {
          const stepName: Step = "project-directory"
          setFormValues({ ...formValues, [stepName]: projectDirectory })
          addCompletedStep(stepName)
        }}
      />

      {completedSteps.includes("project-directory") ? (
        <QuestionTextInput
          id="shopify-storefront-api-token"
          nextFocusId="meilisearch-api-token"
          question="Shopify Storefront API Token"
          onEnter={(shopifyStorefrontApiToken) => {
            const stepName: Step = "shopify-storefront-api-token"
            setFormValues({ ...formValues, [stepName]: shopifyStorefrontApiToken })
            addCompletedStep(stepName)
          }}
        />
      ) : null}

      {completedSteps.includes("shopify-storefront-api-token") ? (
        <QuestionTextInput
          id="meilisearch-api-token"
          nextFocusId="package-manager"
          question="Meilisearch API Token"
          onEnter={(meilisearchApiToken) => {
            const stepName: Step = "meilisearch-api-token"
            setFormValues({ ...formValues, [stepName]: meilisearchApiToken })
            addCompletedStep(stepName)
          }}
        />
      ) : null}

      {completedSteps.includes("meilisearch-api-token") ? (
        <QuestionSelectInput
          id="package-manager"
          question="Package Manager"
          defaultValue={packageManager}
          items={[
            { label: "yarn", value: "yarn" },
            { label: "npm", value: "npm" },
            { label: "pnpm", value: "pnpm" },
          ]}
          onEnter={(packageManager) => {
            const stepName: Step = "package-manager"
            setFormValues({ ...formValues, [stepName]: packageManager })
            addCompletedStep(stepName)
          }}
        />
      ) : null}
    </>
  )
}
