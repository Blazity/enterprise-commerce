import type { Config } from "tailwindcss"
import sharedConfig from "@enterprise-commerce/tailwind-config"

const config: Pick<Config, "prefix" | "presets" | "content"> = {
  content: ["./**/*.{js,ts,jsx,tsx}"],
  prefix: "ui-",
  presets: [sharedConfig],
}

export default config
