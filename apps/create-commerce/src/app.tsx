import { Text, Box, useApp } from "ink"
import { useEffect, useState } from "react"
import { downloadAndExtractRepository } from "@enterprise-commerce/tui/helpers/github"

import { CreateCommerceForm, type CreateCommerceFormValues } from "./components/CreateCommerceForm"
import { ShopAnimation } from "./components/ShopAnimation"
import { AnimatedProgressBar } from "./components/AnimatedProgressBar"

import { trackPromiseArrayProgressSequentially } from "./helpers/promise"
import { gracefullyChangeDirectory } from "./helpers/directory"
import { type PackageManager, migrateCurrentDirectoryPackageManager } from "./helpers/migrate-pkg-manager"

type AppProps = {
  systemData: {
    systemUserName: string
    packageManager: string
  }
}

export function App({ systemData }: AppProps) {
  return (
    <>
      <ShopAnimation />
      <Box marginTop={1}>
        <Text>Hello {systemData.systemUserName}! Let's create your new store!</Text>
      </Box>
      <CreateCommerceFormWithProgressBar systemData={systemData} />
    </>
  )
}

function CreateCommerceFormWithProgressBar({ systemData }: AppProps) {
  const [progress, setProgress] = useState(0)
  const [formValues, setFormValues] = useState<CreateCommerceFormValues>()
  const [errorMessage, setErrorMessage] = useState<string>()

  const isFormFilled = formValues ? Object.keys(formValues).length > 0 : false

  useEffect(() => {
    if (!formValues || !isFormFilled || errorMessage) {
      return
    }

    let isCancelled = false

    trackPromiseArrayProgressSequentially(
      [
        () => gracefullyChangeDirectory(formValues["project-directory"]),
        () => downloadAndExtractRepository({ owner: "blazity", name: "next-enterprise" }),
        () => migrateCurrentDirectoryPackageManager({ to: formValues["package-manager"] as PackageManager }),
      ],
      (newProgress) => {
        if (!isCancelled) {
          setProgress(newProgress)
        }
      },
      (error) => {
        const typedError = error as Error
        if (!isCancelled) {
          setErrorMessage(typedError.message)
          isCancelled = true
        }
      }
    )

    return () => {
      isCancelled = true
    }
  }, [formValues])

  return (
    <>
      <CreateCommerceForm
        defaultPackageManager={systemData.packageManager}
        onFormSubmit={(values) => setFormValues(values)}
      />
      {isFormFilled && !errorMessage ? <AnimatedProgressBarWithStatusText progress={progress} /> : null}
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
      <Text color="red">Critical Error Occured: {message}</Text>
    </Box>
  )
}
