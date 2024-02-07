import { Text, Box } from "ink"
import { useState } from "react"

import { CreateCommerceForm } from "./components/CreateCommerceForm"
import { ShopAnimation } from "./components/ShopAnimation"
import { AnimatedProgressBar } from "./components/AnimatedProgressBar"

type AppProps = {
  systemData: {
    systemUserName: string
    packageManager: string
  }
}

export function App({ systemData }: AppProps) {
  const [shouldShowProgressBar, setShouldShowProgressBar] = useState(false)

  const handleFormSubmit = (values: any) => {
    setShouldShowProgressBar(true)
  }

  return (
    <>
      <ShopAnimation />
      <Box marginTop={1}>
        <Text>Hello {systemData.systemUserName}! Let's create your new store!</Text>
      </Box>
      <CreateCommerceForm defaultPackageManager={systemData.packageManager} onFormSubmit={handleFormSubmit} />
      {shouldShowProgressBar ? <AnimatedProgressBar /> : null}
    </>
  )
}
