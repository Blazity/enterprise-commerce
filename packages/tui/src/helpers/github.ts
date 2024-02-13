import tar from "tar"
import { type ReadableStream } from "stream/web"
import { Readable } from "stream"
import { pipeline } from "stream/promises"

async function downloadToStream(url: string) {
  const response = await fetch(url)

  if (!response.body) {
    throw new Error(`Failed to download: ${url}`)
  }

  return Readable.fromWeb(response.body as ReadableStream)
}

type DownloadAndExtractRepositoryOptions = {
  owner: string
  name: string
  branch?: string
}

export async function downloadAndExtractRepository({
  owner,
  name,
  branch = "main",
}: DownloadAndExtractRepositoryOptions) {
  await pipeline(
    await downloadToStream(`https://codeload.github.com/${owner}/${name}/tar.gz/${branch}`),
    tar.x({
      cwd: process.cwd(),
      strip: 1,
    })
  )
}
