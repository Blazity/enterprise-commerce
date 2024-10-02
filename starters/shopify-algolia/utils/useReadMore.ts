import { useState } from "react"

export function useReadMore(text: string, maxLength: number = 400) {
  const [isReadMore, setIsReadMore] = useState(true)

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  }

  const currentText = isReadMore ? text.slice(0, maxLength) + (text.length > maxLength ? "..." : "") : text
  const isTruncated = text.length > maxLength

  return { currentText, isReadMore, toggleReadMore, isTruncated }
}
