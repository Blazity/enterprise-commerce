import { env } from "env.mjs"
import Replicate from "replicate"

const replicateClientSingleton = () => {
  if (!env.REPLICATE_API_KEY) return null
  return new Replicate({
    auth: env.REPLICATE_API_KEY || "",
  })
}

declare global {
  var replicate: undefined | ReturnType<typeof replicateClientSingleton>
}

const replicate = globalThis.replicate ?? replicateClientSingleton()

export { replicate }

if (process.env.NODE_ENV !== "production") globalThis.replicate = replicate
