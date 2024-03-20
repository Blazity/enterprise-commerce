import { Text, Box, Newline } from "ink"

import { ShopAnimation } from "./components/ShopAnimation"
import { UnorderedList } from "@inkjs/ui"

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
      <Newline />
      <Text>Hello {systemData.systemUserName}! Here're all the commands you can use:</Text>
      <Box marginTop={1}>
        <UnorderedList>
          <UnorderedList.Item>
            <Text>
              <Text bold>about</Text> - learn more about this starter and authors
            </Text>
          </UnorderedList.Item>

          <UnorderedList.Item>
            <Text>
              <Text bold>sync</Text> - migrate all of your products to Shopify and enable incremental migration for future product updates
            </Text>
          </UnorderedList.Item>

          <UnorderedList.Item>
            <Text>
              <Text bold>feature</Text> - manage product's features
            </Text>
          </UnorderedList.Item>
        </UnorderedList>
      </Box>
    </>
  )
}
