import { cn } from "./cn"

export function getHighlightedText(text: string, highlight: string) {
  let parts = [""]
  try {
    parts = text.split(new RegExp(`(${escapeRegExp(highlight)})`, "gi"))
  } catch (e) {}

  return (
    <span>
      {parts.map((part, i) => (
        <span key={i} className={cn({ "font-bold": part.toLowerCase() === highlight.toLowerCase() })}>
          {part}
        </span>
      ))}{" "}
    </span>
  )
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") // $& means the whole matched string
}
