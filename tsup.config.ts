import { defineConfig } from "tsup"
import dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const envVariables = Object.fromEntries(Object.entries(process.env).map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)]))

export default defineConfig({
  format: ["esm"],
  clean: true,
  target: "node16",
  define: envVariables,
})
