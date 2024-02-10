import { Text, Box } from "ink"
import { useEffect, useState } from "react"

import { CreateCommerceForm } from "./components/CreateCommerceForm"
import { ShopAnimation } from "./components/ShopAnimation"
import { AnimatedProgressBar } from "./components/AnimatedProgressBar"
import { trackPromiseArrayProgress } from "./helpers/promise"

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

const getTestPromises = () => [
  new Promise((resolve) => setTimeout(() => resolve("String"), 1000)),
  new Promise((resolve) => setTimeout(() => resolve(10), 2000)),
  new Promise((resolve) => setTimeout(() => resolve(true), 3000)),
]

function CreateCommerceFormWithProgressBar({ systemData }: AppProps) {
  const [progress, setProgress] = useState(0)
  const [formValues, setFormValues] = useState({})

  const isFormFilled = Object.keys(formValues).length > 0

  const handleFormSubmit = (values) => {
    setFormValues(values)
  }

  useEffect(() => {
    if (!isFormFilled) {
      return
    }

    let isCancelled = false
    trackPromiseArrayProgress(getTestPromises(), (newProgress) => {
      if (!isCancelled) {
        setProgress(newProgress)
      }
    })

    return () => {
      isCancelled = true
    }
  }, [formValues])

  return (
    <>
      <CreateCommerceForm defaultPackageManager={systemData.packageManager} onFormSubmit={handleFormSubmit} />
      {isFormFilled ? <AnimatedProgressBar progress={progress} /> : null}
    </>
  )
}
