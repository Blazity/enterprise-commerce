"use client"

import { useSidebar } from "components/ui/sidebar"
import { Zap } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { cn } from "utils/cn"

export const SidebarButton = () => {
  const { state, toggleSidebar, isMobile } = useSidebar()
  const [isHovered, setIsHovered] = useState(false)
  const [buttonText, setButtonText] = useState("Close")

  return (
    <div className="sticky bottom-4 z-50 ml-4">
      <motion.button
        aria-label={buttonText}
        variants={variants}
        initial={false}
        animate={state}
        custom={{ isHovered, isMobile }}
        whileTap={{ scale: 0.98 }}
        transition={{ bounce: 0, duration: 0.2 }}
        className={cn("flex w-max origin-center items-center justify-center overflow-clip bg-black/95 py-2 font-bold text-gray-100 shadow-lg")}
        onClick={() => {
          toggleSidebar()
        }}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        style={{ borderRadius: 9999 }}
      >
        <Zap size={20} className="w-full" />

        {!isMobile && (
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
        )}
      </motion.button>
    </div>
  )
}

const variants = {
  collapsed: ({ isHovered, isMobile }) =>
    !isMobile
      ? {
          gap: isHovered ? 12 : 4,
          paddingLeft: isHovered ? "0.75rem" : "0.5rem",
          paddingRight: isHovered ? "1rem" : "0.5rem",
        }
      : {},
  expanded: ({ isHovered, isMobile }) =>
    !isMobile
      ? {
          gap: isHovered ? 12 : 4,
          paddingLeft: isHovered ? "0.75rem" : "0.5rem",
          paddingRight: isHovered ? "1rem" : "0.5rem",
        }
      : {},
}
