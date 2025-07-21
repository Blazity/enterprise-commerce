import { writeFileSync } from "fs"
import { join } from "path"

interface RedirectEntry {
  destination: string
  permanent: boolean
}

interface GenerateOptions {
  count: number
  outputPath: string
  seed?: number
}

const PATH_PATTERNS = [
  "/products/",
  "/collections/",
  "/category/",
  "/brand/",
  "/sale/",
  "/new/",
  "/men/",
  "/women/",
  "/kids/",
  "/accessories/",
  "/shoes/",
  "/bags/",
  "/watches/",
  "/jewelry/",
  "/home/",
  "/blog/",
  "/about/",
  "/contact/",
  "/faq/",
  "/shipping/",
  "/returns/",
  "/size-guide/",
  "/gift-cards/",
  "/wishlist/",
  "/account/",
  "/orders/",
  "/checkout/",
  "/cart/",
]

const SLUG_WORDS = [
  "classic",
  "modern",
  "vintage",
  "premium",
  "deluxe",
  "essential",
  "basic",
  "professional",
  "casual",
  "formal",
  "sporty",
  "elegant",
  "luxury",
  "budget",
  "eco",
  "sustainable",
  "organic",
  "handmade",
  "limited",
  "exclusive",
  "new",
  "summer",
  "winter",
  "spring",
  "autumn",
  "holiday",
  "special",
  "clearance",
  "black",
  "white",
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "pink",
  "small",
  "medium",
  "large",
  "xlarge",
  "xxlarge",
  "plus",
  "petite",
  "cotton",
  "wool",
  "silk",
  "leather",
  "denim",
  "polyester",
  "linen",
  "shirt",
  "pants",
  "dress",
  "skirt",
  "jacket",
  "coat",
  "sweater",
  "shoes",
  "bag",
  "wallet",
  "belt",
  "hat",
  "scarf",
  "gloves",
  "socks",
  "underwear",
]

function generateSlug(words: number = 3): string {
  const selected: string[] = []
  for (let i = 0; i < words; i++) {
    const word = SLUG_WORDS[Math.floor(Math.random() * SLUG_WORDS.length)]
    if (!selected.includes(word)) {
      selected.push(word)
    }
  }
  return selected.join("-")
}

function generatePath(): string {
  const pattern = PATH_PATTERNS[Math.floor(Math.random() * PATH_PATTERNS.length)]
  const slug = generateSlug(Math.floor(Math.random() * 3) + 1)

  if (Math.random() > 0.7) {
    const id = Math.floor(Math.random() * 99999) + 1000
    return `${pattern}${slug}-${id}`
  }

  return `${pattern}${slug}`
}

function generateRedirect(from: string): RedirectEntry {
  let destination = generatePath()

  while (destination === from) {
    destination = generatePath()
  }

  const permanent = Math.random() > 0.8

  return {
    destination,
    permanent,
  }
}

async function generateTestRedirects(options: GenerateOptions) {
  const { count, outputPath, seed } = options

  if (seed !== undefined) {
    console.log(`📌 Using seed value: ${seed} (for consistent path generation order)`)
  }

  console.log(`🔧 Generating ${count} test redirects...`)

  const redirects: Record<string, RedirectEntry> = {}
  const startTime = Date.now()

  const reportInterval = Math.floor(count / 10)
  let generated = 0

  while (Object.keys(redirects).length < count) {
    const from = generatePath()

    if (redirects[from]) {
      continue
    }

    redirects[from] = generateRedirect(from)
    generated++

    if (generated % reportInterval === 0) {
      const progress = Math.floor((generated / count) * 100)
      console.log(`   📊 Progress: ${progress}% (${generated}/${count})`)
    }
  }

  const outputFullPath = join(process.cwd(), outputPath)
  writeFileSync(outputFullPath, JSON.stringify(redirects, null, 2))

  const endTime = Date.now()
  const duration = ((endTime - startTime) / 1000).toFixed(2)

  const permanentCount = Object.values(redirects).filter((r) => r.permanent).length
  const temporaryCount = count - permanentCount

  console.log(`\n✅ Generated ${count} redirects in ${duration}s`)
  console.log(`📁 Output: ${outputFullPath}`)
  console.log(`\n📊 Statistics:`)
  console.log(`   - Permanent redirects (308): ${permanentCount} (${Math.floor((permanentCount / count) * 100)}%)`)
  console.log(`   - Temporary redirects (307): ${temporaryCount} (${Math.floor((temporaryCount / count) * 100)}%)`)
  console.log(`   - File size: ${(JSON.stringify(redirects).length / 1024 / 1024).toFixed(2)} MB`)

  console.log(`\n📝 Sample entries:`)
  const samples = Object.entries(redirects).slice(0, 3)
  samples.forEach(([from, redirect]) => {
    console.log(`   ${from} → ${redirect.destination} (${redirect.permanent ? "308" : "307"})`)
  })
}

const args = process.argv.slice(2)
const count = parseInt(args.find((arg) => arg.startsWith("--count="))?.split("=")[1] || "50000")
const outputPath = args.find((arg) => arg.startsWith("--output="))?.split("=")[1] || "lib/redirects/test-redirects.json"
const seed = args.find((arg) => arg.startsWith("--seed="))?.split("=")[1]

if (args.includes("--help")) {
  console.log(`
Generate Test Redirects Script

Usage: yarn redirects:generate-test [options]

Options:
  --count=<number>   Number of redirects to generate (default: 50000)
  --output=<path>    Output file path (default: lib/redirects/test-redirects.json)
  --seed=<number>    Random seed for reproducible generation
  --help             Show this help message

Examples:
  yarn redirects:generate-test
  yarn redirects:generate-test --count=10000
  yarn redirects:generate-test --count=100000 --output=data/redirects.json
  yarn redirects:generate-test --seed=12345
`)
  process.exit(0)
}

if (count < 1 || count > 1000000) {
  console.error("❌ Count must be between 1 and 1,000,000")
  process.exit(1)
}

generateTestRedirects({
  count,
  outputPath,
  seed: seed ? parseInt(seed) : undefined,
})
