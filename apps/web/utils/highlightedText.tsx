import { cn } from "./cn"

export function getHighlightedText(text: string, highlight: string) {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"))
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
