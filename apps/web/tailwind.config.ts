import sharedConfig from "../../packages/tailwind-config/tailwind.config.js"
import type { Config } from "tailwindcss"

/** @type {import('tailwindcss').Config} */
const config: Pick<Config, "content" | "presets"> = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
    "./dist/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/design-system/**/*{.js,.ts,.jsx,.tsx}",
  ],
  presets: [sharedConfig],
}

export default config
