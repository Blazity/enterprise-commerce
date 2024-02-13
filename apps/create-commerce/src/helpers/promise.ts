import { isNil } from 'remeda"

export async function trackPromiseArrayProgressSequentially(
  promiseHofs: (() => Promise<unknown>)[],
  progressCallback: (progress: number) => void,
  errorCallback?: (error: unknown) => void
): Promise<unknown[]> {
  let done = 0
  const total = promiseHofs.length
  const results: unknown[] = []

  for (const promiseHof of promiseHofs) {
    try {
      const result = await promiseHof()
      results.push(result)
      done++
      progressCallback((done / total) * 100)
    } catch (error) {
      if (!isNil(errorCallback)) {
        errorCallback(error)
        break
      } else {
        results.push(error)
        done++
        progressCallback((done / total) * 100)
      }
    }
  }

  return results
}
