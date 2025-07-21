"use client"

import { Dot } from "lucide-react"
import { motion } from "motion/react"

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="justify-left flex space-x-1"
    >
      <div className="flex -space-x-2.5">
        <Dot className="size-5 animate-typing-dot-bounce" />
        <Dot className="size-5 animate-typing-dot-bounce [animation-delay:80ms]" />
        <Dot className="size-5 animate-typing-dot-bounce [animation-delay:160ms]" />
      </div>
    </motion.div>
  )
}
