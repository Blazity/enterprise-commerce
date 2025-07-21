export function getBucket(buckets: readonly string[]) {
  let n = cryptoRandom() * 100

  let percentage = 100 / buckets.length

  return (
    buckets.find(() => {
      n -= percentage
      return n <= 0
    }) ?? buckets[0]
  )
}

function cryptoRandom() {
  return crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1)
}
