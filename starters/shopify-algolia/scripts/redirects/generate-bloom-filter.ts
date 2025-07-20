import bloomFilters from "bloom-filters"
import { readFileSync, writeFileSync, existsSync } from "fs"
import { join } from "path"

const { ScalableBloomFilter } = bloomFilters

interface RedirectEntry {
  destination: string
  permanent: boolean
}

interface GenerateOptions {
  inputPath: string
  outputPath: string
  errorRate: number
}

async function generateBloomFilter(options: GenerateOptions) {
  const { inputPath, outputPath, errorRate } = options
  
  console.log("🔧 Generating Bloom Filter for redirects...")
  console.log(`📂 Input: ${inputPath}`)
  console.log(`📂 Output: ${outputPath}`)
  console.log(`🎯 Target error rate: ${(errorRate * 100).toFixed(2)}%`)
  
  // Check if input file exists
  const inputFullPath = join(process.cwd(), inputPath)
  if (!existsSync(inputFullPath)) {
    console.error(`❌ Input file not found: ${inputFullPath}`)
    console.error("   Run 'yarn redirects:generate-test' to create test data first")
    process.exit(1)
  }
  
  // Load redirects
  console.log("\n📥 Loading redirects...")
  const startTime = Date.now()
  
  let redirects: Record<string, RedirectEntry>
  try {
    const content = readFileSync(inputFullPath, "utf-8")
    redirects = JSON.parse(content) as Record<string, RedirectEntry>
  } catch (error) {
    console.error("❌ Failed to parse redirects JSON:", error)
    process.exit(1)
  }
  
  const keys = Object.keys(redirects)
  console.log(`   ✅ Loaded ${keys.length} redirect entries`)
  
  // Create Bloom Filter
  console.log("\n🔨 Creating Scalable Bloom Filter...")
  const filter = new ScalableBloomFilter(keys.length, errorRate)
  
  // Add all paths to the filter
  const addStartTime = Date.now()
  let added = 0
  const reportInterval = Math.floor(keys.length / 10) || 1
  
  for (const key of keys) {
    // Handle special case for home path
    if (key === "/") {
      filter.add("/home")
    } else {
      filter.add(key)
    }
    
    added++
    
    // Report progress for large datasets
    if (added % reportInterval === 0) {
      const progress = Math.floor((added / keys.length) * 100)
      console.log(`   📊 Progress: ${progress}% (${added}/${keys.length})`)
    }
  }
  
  const addDuration = ((Date.now() - addStartTime) / 1000).toFixed(2)
  console.log(`   ✅ Added all paths in ${addDuration}s`)
  
  // Save Bloom Filter as JSON
  console.log("\n💾 Saving Bloom Filter...")
  const filterJson = filter.saveAsJSON()
  const outputFullPath = join(process.cwd(), outputPath)
  
  writeFileSync(outputFullPath, JSON.stringify(filterJson))
  
  const totalDuration = ((Date.now() - startTime) / 1000).toFixed(2)
  
  // Calculate and display statistics
  const filterSize = JSON.stringify(filterJson).length
  const originalSize = JSON.stringify(redirects).length
  const compression = ((1 - filterSize / originalSize) * 100).toFixed(1)
  
  console.log(`\n✅ Bloom Filter generated successfully in ${totalDuration}s`)
  console.log(`📁 Output: ${outputFullPath}`)
  console.log(`\n📊 Statistics:`)
  console.log(`   - Filter size: ${(filterSize / 1024 / 1024).toFixed(2)} MB`)
  console.log(`   - Original size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`)
  console.log(`   - Space savings: ${compression}%`)
  console.log(`   - Error rate: ${(errorRate * 100).toFixed(4)}%`)
  console.log(`   - Expected false positives: ~${Math.floor(keys.length * errorRate)} paths`)
  
  // Test the filter with a few samples
  console.log(`\n🧪 Testing filter with sample paths:`)
  const samples = keys.slice(0, 3)
  samples.forEach(path => {
    const testPath = path === "/" ? "/home" : path
    const inFilter = filter.has(testPath)
    console.log(`   ${path} → ${inFilter ? '✅ Found' : '❌ Not found'} ${path === "/" ? '(tested as /home)' : ''}`)
  })
  
  // Test with non-existent paths
  const fakePaths = ["/fake/path/1", "/non/existent/2", "/test/missing/3"]
  console.log(`\n🧪 Testing with non-existent paths:`)
  let falsePositives = 0
  fakePaths.forEach(path => {
    const inFilter = filter.has(path)
    if (inFilter) falsePositives++
    console.log(`   ${path} → ${inFilter ? '⚠️  False positive' : '✅ Correctly not found'}`)
  })
  
  if (falsePositives > 0) {
    console.log(`\n⚠️  Found ${falsePositives} false positive(s) in ${fakePaths.length} tests`)
    console.log("   This is expected behavior for Bloom Filters.")
  }
}

// Parse command line arguments
const args = process.argv.slice(2)
const inputPath = args.find(arg => arg.startsWith("--input="))?.split("=")[1] || "lib/redirects/new-redirects.json"
const outputPath = args.find(arg => arg.startsWith("--output="))?.split("=")[1] || "lib/redirects/bloom-filter.json"
const errorRate = parseFloat(args.find(arg => arg.startsWith("--error-rate="))?.split("=")[1] || "0.0001")

// Show help if requested
if (args.includes("--help")) {
  console.log(`
Generate Bloom Filter Script

Usage: yarn redirects:generate-bloom [options]

Options:
  --input=<path>       Input redirects JSON file (default: lib/redirects/new-redirects.json)
  --output=<path>      Output Bloom Filter JSON file (default: lib/redirects/bloom-filter.json)
  --error-rate=<rate>  False positive error rate (default: 0.0001 = 0.01%)
  --help               Show this help message

Examples:
  yarn redirects:generate-bloom
  yarn redirects:generate-bloom --input=data/redirects.json
  yarn redirects:generate-bloom --error-rate=0.001
  yarn redirects:generate-bloom --input=lib/redirects/test-redirects.json --output=lib/redirects/test-bloom.json

Notes:
  - Lower error rates require more memory but reduce false positives
  - The Bloom Filter will handle the "/" → "/home" transformation automatically
  - Typical error rates: 0.0001 (0.01%), 0.001 (0.1%), 0.01 (1%)
`)
  process.exit(0)
}

// Validate arguments
if (errorRate <= 0 || errorRate >= 1) {
  console.error("❌ Error rate must be between 0 and 1 (exclusive)")
  process.exit(1)
}

// Run generation
generateBloomFilter({
  inputPath,
  outputPath,
  errorRate
})