import type { Config } from "tailwindcss"
import sharedConfig from "../../packages/tailwind-config/tailwind.config.js"

/** @type {import('tailwindcss').Config} */
const config: Pick<Config, "content" | "presets" | "corePlugins"> = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
    "./dist/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  corePlugins: {
    preflight: false,
  },
  presets: [sharedConfig],
}

export default config
