import { writeFile } from "fs/promises"
import { QuestionMultiSelectInput } from "./QuestionMultiSelectInput"
import { ComponentProps, useState } from "react"
import { DoneText } from "./DoneText"

type ExternallyProvidedMultiselectProps = { originalEnvVars: Record<string, string>; envFilePath: string } & Pick<
  ComponentProps<typeof QuestionMultiSelectInput>,
  "initialValues" | "items"
>

export function FeatureForm({ originalEnvVars, envFilePath, ...externallyProvidedMultiselectProps }: ExternallyProvidedMultiselectProps) {
  const [shouldShowStatusText, setShouldShowStatusText] = useState(false)

  return (
    <>
      <QuestionMultiSelectInput
        helperText="Select the features you want to use. Press space to toggle the selection. Press enter to submit. Use arrows to move between the items"
        onEnter={async (value) => {
          const envVars = Object.entries(value).reduce((acc, [key, value]) => ({ ...acc, [key]: value.toString() }), {})
          await writeFile(envFilePath, stringifyEnv({ ...originalEnvVars, ...envVars }))
          setShouldShowStatusText(true)
        }}
        {...externallyProvidedMultiselectProps}
      />
      {shouldShowStatusText ? <DoneText /> : null}
    </>
  )
}

function stringifyEnv(env: Record<string, string>): string {
  const isValidKey = (key: string) => /^[a-zA-Z_]+[a-zA-Z0-9_]*$/.test(key)
  const escapeNewLines = (str: string) => str.replace(/\n/g, "\\n")

  const invalidKeys = Object.keys(env).filter((key) => !isValidKey(key))

  if (invalidKeys.length > 0) {
    throw new Error(`Invalid key(s) found: ${invalidKeys.join(", ")}. Keys must match the pattern [a-zA-Z_]+[a-zA-Z0-9_]*`)
  }

  return Object.entries(env)
    .map(([key, value]) => `${key}=${escapeNewLines(value)}`)
    .join("\n")
}
