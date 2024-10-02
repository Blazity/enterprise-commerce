import { env } from "env.mjs"
import Replicate from "replicate"

const replicateClient = () => {
  if (!env.REPLICATE_API_KEY) return null
  return new Replicate({
    auth: env.REPLICATE_API_KEY || "",
  })
}

export const replicate = replicateClient()
