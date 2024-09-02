import { env } from "env.mjs"
import Replicate from "replicate"

export const replicate = () => {
  if (!env.REPLICATE_API_KEY) return null
  return new Replicate({
    auth: env.REPLICATE_API_KEY || "",
  })
}
