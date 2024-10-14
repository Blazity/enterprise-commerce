import { dirname, join } from "path"
import type { StorybookConfig } from "@storybook/nextjs"
const config: StorybookConfig = {
  stories: ["../components/**/*.mdx", "../components/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [getAbsolutePath("@storybook/addon-links"), getAbsolutePath("@storybook/addon-essentials"), getAbsolutePath("@storybook/addon-interactions")],
  framework: {
    name: getAbsolutePath("@storybook/nextjs"),
    options: {},
  },
  features: {
    experimentalRSC: true,
  },
  docs: {
    autodocs: "tag",
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
}
export default config

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")))
}
