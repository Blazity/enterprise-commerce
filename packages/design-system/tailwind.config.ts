import sharedConfig from "@enterprise-commerce/tailwind-config"
import type { Config } from "tailwindcss"

const config: Pick<Config, "prefix" | "presets" | "content"> = {
  content: ["./**/*.{js,ts,jsx,tsx}"],
  prefix: "ui-",
  presets: [sharedConfig],
}

export default config
