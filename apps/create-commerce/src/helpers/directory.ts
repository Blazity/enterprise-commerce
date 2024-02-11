import { mkdir, readdir } from "fs/promises"
import process from "process"

export async function gracefulDirectoryChange(directoryPath: string): Promise<void> {
  try {
    await mkdir(directoryPath, { recursive: true })
    const files = await readdir(directoryPath)
    if (files.length > 0) {
      throw new Error(`Directory exists and is not empty: ${directoryPath}`)
    }
    process.chdir(directoryPath)
  } catch (error) {
    throw error
  }
}
