"use client"

import { useSidebar } from "components/ui/sidebar"
import { Zap } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { cn } from "utils/cn"

export default function SidebarButton() {
  const { state, toggleSidebar } = useSidebar()
  const [isHovered, setIsHovered] = useState(false)
  const [buttonText, setButtonText] = useState("Close")

  return (
    <motion.button
      variants={variants}
      initial={false}
      animate={state}
      custom={isHovered}
      whileTap={{ scale: 0.98 }}
      transition={{ bounce: 0, duration: 0.2 }}
      className={cn("fixed bottom-4 left-4 z-50 flex origin-center items-center justify-center overflow-clip bg-black/95 py-2 font-bold text-gray-100 shadow-lg")}
      onClick={() => toggleSidebar()}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      style={{ borderRadius: 9999 }}
    >
      <Zap size={20} className="w-full" />
      <AnimatePresence>
        {isHovered ? (
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2, bounce: 0.15, opacity: { duration: 0.15 } }}
            className="inline-flex origin-left whitespace-nowrap text-base/3"
            onAnimationComplete={() => {
              if (state === "collapsed") {
                setButtonText("Shop with AI")
              } else {
                setButtonText("Close")
              }
            }}
          >
            {buttonText}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.button>
  )
}

const variants = {
  collapsed: (isHovered: boolean) => ({
    translateX: "0",
    gap: isHovered ? 12 : 4,
    paddingLeft: isHovered ? "0.75rem" : "0.5rem",
    paddingRight: isHovered ? "1rem" : "0.5rem",
  }),
  expanded: (isHovered: boolean) => ({
    translateX: "20rem",
    gap: isHovered ? 12 : 4,
    paddingLeft: isHovered ? "0.75rem" : "0.5rem",
    paddingRight: isHovered ? "1rem" : "0.5rem",
  }),
}
