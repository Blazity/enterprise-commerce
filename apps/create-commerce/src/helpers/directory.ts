import { mkdir, readdir } from "fs/promises"
import process from "process"
import { isEmpty } from "remeda"

export async function gracefullyChangeDirectory(directoryPath: string): Promise<void> {
  try {
    await mkdir(directoryPath, { recursive: true })
    const files = await readdir(directoryPath)

    if (!isEmpty(files)) {
      throw new Error(`Directory exists and is not empty: ${directoryPath}`)
    }

    process.chdir(directoryPath)
  } catch (error) {
    throw error
  }
}
