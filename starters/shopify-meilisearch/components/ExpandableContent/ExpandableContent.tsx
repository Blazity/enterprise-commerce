"use client"

import { ChevronIcon } from "components/Icons/ChevronIcon"
import { type ReactNode, useEffect, useRef, useState } from "react"
import { cn } from "utils/cn"

type ExpandableContentProps = {
  children: ReactNode
  className?: string
  lines: 1 | 2 | 3 | 4 | 5 | 6
}

export const ExpandableContent = ({ children, className, lines = 2 }: ExpandableContentProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isClamped, setIsClamped] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef?.current) return

    const checkClamp = () => {
      if (!contentRef.current) return
      setIsClamped(contentRef.current.scrollHeight > contentRef.current.clientHeight)
    }

    checkClamp()
    window.addEventListener("resize", checkClamp)
    return () => window.removeEventListener("resize", checkClamp)
  }, [])

  return (
    <div>
      <div
        ref={contentRef}
        style={
          {
            "--lines": lines,
          } as React.CSSProperties
        }
        className={cn(!isExpanded && "line-clamp-[var(--lines)]", className)}
      >
        {children}
      </div>
      {isClamped && (
        <button className={cn("flex items-center gap-1 bg-transparent text-sm underline")} onClick={() => setIsExpanded((prev) => !prev)}>
          {isExpanded ? "Read less" : "Read more"}
          <ChevronIcon className={isExpanded ? "rotate-180" : "rotate-0"} />
        </button>
      )}
    </div>
  )
}
