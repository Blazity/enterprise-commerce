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
      initial={state}
      animate={state}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.05 }}
      transition={{ bounce: 0, duration: 0.2 }}
      className={cn("fixed bottom-4 left-4 z-50 flex items-center justify-center overflow-clip bg-black/95 px-1 py-0 font-bold text-gray-100 shadow-lg")}
      onClick={() => toggleSidebar()}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      style={{ borderRadius: 9999 }}
    >
      {/* <SidebarTrigger className="h-full w-full rounded-full hover:bg-inherit"></SidebarTrigger> */}
      <div className="flex items-center p-2">
        <div className="px-0.5 py-1.5">
          <Zap size={20} className="w-full" />
        </div>
        <AnimatePresence>
          {isHovered ? (
            <motion.span
              initial={{ width: 0, scale: 0.8, opacity: 0 }}
              animate={{ width: "auto", scale: 1, opacity: 1 }}
              exit={{ width: 0, scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2, bounce: 0.15, opacity: { duration: 0.15 } }}
              className="inline-flex origin-left whitespace-nowrap text-base"
              onAnimationComplete={() => {
                if (state === "collapsed") {
                  setButtonText("Chat with AI")
                } else {
                  setButtonText("Close")
                }
              }}
            >
              {buttonText}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.button>
  )
}

const variants = {
  collapsed: {
    translateX: "0",
  },
  expanded: {
    translateX: "20rem",
  },
}
