import { env } from "env.mjs"
import Replicate from "replicate"

const replicateClient = () => {
  if (!env.REPLICATE_API_KEY) return null
  return new Replicate({
    auth: env.REPLICATE_API_KEY || "",
  })
}

export const replicate = replicateClient()

export const generateImageCaption = async (imageUrl: string) => {
  if (!replicate) return
  return (await replicate.run("salesforce/blip:2e1dddc8621f72155f24cf2e0adbde548458d3cab9f00c0139eea840d0ac4746", {
    input: {
      task: "image_captioning",
      image: imageUrl,
    },
  })) as unknown as string
}
