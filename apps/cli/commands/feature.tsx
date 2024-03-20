import { Box, Newline } from "ink"
import { ShopAnimation } from "../components/ShopAnimation"
import { FeatureForm } from "../components/FeatureForm"
import { findAndReadEnvFileSync } from "../helpers/system"
import { useEffect, useState } from "react"
import { parse as parseEnv, type DotenvParseOutput } from "dotenv"
import { CriticalError } from "../components/CriticalError"
import { TextWithHorizontalPadding } from "../components/TextWithHorizontalPadding"
import { terminalColors } from "../helpers/terminal-colors"

export function Feature() {
  const [error, setError] = useState(false)
  const [envFileBooleanOptions, setEnvFileBooleanOptions] = useState<Record<string, boolean>>()
  const [envFileAllOptions, setEnvFileAllOptions] = useState<DotenvParseOutput>()
  const [envFilePath, setEnvFilePath] = useState<string>()

  useEffect(() => {
    try {
      const { envFileContent, envFilePath } = findAndReadEnvFileSync()
      setEnvFilePath(envFilePath)

      const envFiles = parseEnv(envFileContent)

      setEnvFileAllOptions(envFiles)

      const booleanOnlyEnvVars = Object.fromEntries(
        Object.entries(envFiles)
          .filter(([_, value]) => value === "true" || value === "false")
          .map(([key, value]) => [key, value === "true"])
      )

      setEnvFileBooleanOptions(booleanOnlyEnvVars)
    } catch (error) {
      setError(true)
    }
  }, [])

  return (
    <>
      <ShopAnimation />
      <Newline />
      <Box marginBottom={1}>
        <TextWithHorizontalPadding backgroundColor={terminalColors.blazity} color={terminalColors.textOnBrightBackground} bold>
          Which features would you like to use?
        </TextWithHorizontalPadding>
      </Box>
      {error ? (
        <CriticalError message="Could not find matching .env file and apps/web directory. This command must be executed in the directory where your enterprise commerce store's source is located." />
      ) : !!envFileBooleanOptions ? (
        <FeatureForm
          envFilePath={envFilePath}
          originalEnvVars={envFileAllOptions}
          initialValues={envFileBooleanOptions}
          items={Object.entries(envFileBooleanOptions).map(([key, value]) => ({ label: convertEnvVarToLegibleLabel(key), value: key }))}
        />
      ) : null}
    </>
  )
}

function convertEnvVarToLegibleLabel(text: string): string {
  return text
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
