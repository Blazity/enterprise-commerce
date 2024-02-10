export function trackPromiseArrayProgress(promises: Promise<unknown>[], progressCallback: (progress: number) => void) {
  let done = 0
  const total = promises.length

  const trackedPromises: Promise<unknown>[] = promises.map(
    (promise) =>
      new Promise<unknown>((resolve, reject) => {
        promise
          .then((value) => {
            done++
            // Multiply by 100 to convert to percentage
            progressCallback((done / total) * 100)
            resolve(value)
          })
          .catch((error) => {
            done++
            // Multiply by 100 to convert to percentage
            progressCallback((done / total) * 100)
            reject(error)
          })
      })
  )

  return Promise.all(trackedPromises)
}
