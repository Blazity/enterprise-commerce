const STOP_WORDS = [
  "a",
  "an",
  "the",
  "and",
  "or",
  "but",
  "about",
  "above",
  "after",
  "below",
  "to",
  "from",
  "up",
  "down",
  "in",
  "out",
  "on",
  "off",
  "over",
  "under",
  "again",
  "further",
  "then",
  "once",
  "here",
  "there",
  "when",
  "where",
  "why",
  "how",
  "all",
  "any",
  "both",
  "each",
  "few",
  "more",
  "most",
  "other",
  "some",
  "such",
  "no",
  "nor",
  "not",
  "only",
  "own",
  "same",
  "so",
  "than",
  "too",
  "very",
  "s",
  "t",
  "can",
  "will",
  "just",
  "don",
  "should",
  "now",
]

export function makeKeywords(content: string | null | undefined) {
  if (!content) return []

  let words = content.toLowerCase().match(/\b(\w+)\b/g) as string[]
  words = words.filter((word) => !STOP_WORDS.includes(word))

  const frequency = {}
  words.forEach((word) => {
    if (!frequency[word]) {
      frequency[word] = 0
    }
    frequency[word]++
  })

  const sortedWords = Object.keys(frequency).sort((a, b) => frequency[b] - frequency[a])
  return sortedWords.slice(0, 10)
}
