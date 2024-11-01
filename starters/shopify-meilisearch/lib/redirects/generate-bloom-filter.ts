const { ScalableBloomFilter } = require("bloom-filters")
const { writeFileSync } = require("fs")
const redirects = require("./new-redirects.json")

const filter = new ScalableBloomFilter(Object.keys(redirects).length, 0.0001)

for (const key in redirects) {
  filter.add(key)
}

const filterJson = filter.saveAsJSON()
writeFileSync("./lib/redirects/bloom-filter.json", JSON.stringify(filterJson))
