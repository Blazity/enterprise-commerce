"use client"

import { Dot } from "lucide-react"
import { motion } from "motion/react"

export function TypingIndicator() {
  return (
    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="justify-left flex space-x-1">
      <div className="bg rounded-lg bg-gray-400 p-3 text-gray-700">
        <div className="flex -space-x-2.5">
          <Dot className="h-5 w-5 animate-typing-dot-bounce" />
          <Dot className="h-5 w-5 animate-typing-dot-bounce [animation-delay:80ms]" />
          <Dot className="h-5 w-5 animate-typing-dot-bounce [animation-delay:160ms]" />
        </div>
      </div>
    </motion.div>
  )
}
