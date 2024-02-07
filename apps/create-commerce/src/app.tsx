import { Text, Box } from "ink"

import { CreateCommerceForm } from "./components/CreateCommerceForm"
import { ShopAnimation } from "./components/ShopAnimation"

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
      <CreateCommerceForm
        defaultPackageManager={systemData.packageManager}
        onFormSubmit={(values) => console.log(values)}
      />
    </>
  )
}
