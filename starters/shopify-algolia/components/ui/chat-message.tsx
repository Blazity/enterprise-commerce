"use client"

import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { MarkdownRenderer } from "./markdown-renderer"
import { cn } from "utils/cn"
import { motion } from "motion/react"

const chatBubbleVariants = cva("group/message relative break-words rounded-lg p-3 text-sm sm:max-w-[70%]", {
  variants: {
    isUser: {
      true: "bg-gray-200 text-black",
      false: "bg-gray-400/70 text-black",
    },
    animation: {
      none: "",
      slide: "animate-in fade-in-0 duration-300",
      scale: "animate-in fade-in-0 zoom-in-75 duration-300",
      fade: "animate-in fade-in-0 duration-500",
    },
  },
  compoundVariants: [
    {
      isUser: true,
      animation: "slide",
      class: "slide-in-from-right",
    },
    {
      isUser: false,
      animation: "slide",
      class: "slide-in-from-left",
    },
    {
      isUser: true,
      animation: "scale",
      class: "origin-bottom-right",
    },
    {
      isUser: false,
      animation: "scale",
      class: "origin-bottom-left",
    },
  ],
})

type Animation = VariantProps<typeof chatBubbleVariants>["animation"]

export interface Message {
  id: string
  role: "user" | "assistant" | "system" | "data"
  content: string
  createdAt?: Date
  attachments?: File[]
}

export interface ChatMessageProps extends Message {
  showTimeStamp?: boolean
  animation?: Animation
  actions?: React.ReactNode
  showToolMessages?: boolean
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, createdAt, showTimeStamp = false, animation = "scale", actions, showToolMessages }) => {
  const isUser = role === "user"

  const formattedTime = createdAt?.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })
  return (
    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className={cn("flex flex-col", isUser ? "items-end" : "items-start")}>
      <div className={cn(chatBubbleVariants({ isUser }))}>
        <div className="text-black/90">
          <MarkdownRenderer>{content}</MarkdownRenderer>
        </div>

        {!!(role === "assistant" && actions && showToolMessages) && (
          <div className="absolute -bottom-4 right-2 flex space-x-1 rounded-lg border p-1 opacity-0 transition-opacity group-hover/message:opacity-100">{actions}</div>
        )}
      </div>

      {showTimeStamp && createdAt ? (
        <span className={cn("mt-1 block px-1 text-xs opacity-50", animation !== "none" && "duration-500 animate-in fade-in-0")}>{formattedTime}</span>
      ) : null}
    </motion.div>
  )
}
