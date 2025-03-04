"use client"

import React, { useEffect } from "react"
import type { Message as SDKMessage } from "ai"
import { cva, type VariantProps } from "class-variance-authority"
import { MarkdownRenderer } from "./markdown-renderer"
import { cn } from "utils/cn"
import Link from "next/link"
import { useRouter } from "next/navigation"

const chatBubbleVariants = cva("group/message relative break-words rounded-lg p-3 text-sm sm:max-w-[70%]", {
  variants: {
    role: {
      user: "bg-primary",
      assistant: "bg-muted",
      data: "",
      system: "",
      toolInvocation: "font-bold text-sm bg-orange-700 text-orange-100", // abstract, normally tool invocations are marked as assistant role
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
      role: "user",
      animation: "slide",
      class: "slide-in-from-right",
    },
    {
      role: "assistant",
      animation: "slide",
      class: "slide-in-from-left",
    },
    {
      role: "user",
      animation: "scale",
      class: "origin-bottom-right",
    },
    {
      role: "assistant",
      animation: "scale",
      class: "origin-bottom-left",
    },
  ],
})

type Animation = VariantProps<typeof chatBubbleVariants>["animation"]

export interface Message extends SDKMessage {
  id: string
  content: string
  createdAt?: Date
}

export interface ChatMessageProps extends Message {
  showTimeStamp?: boolean
  animation?: Animation
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, createdAt, showTimeStamp = false, animation = "scale", toolInvocations }) => {
  const isUser = role === "user"

  const formattedTime = createdAt?.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  if (!!toolInvocations?.length) {
    return toolInvocations.map((toolInvocation) => {
      const { toolName, toolCallId, state } = toolInvocation

      if (state === "result") {
        if (toolName === "buildNavigationQuery") {
          const { result } = toolInvocation
          return <NavigationToolResult key={toolCallId} result={result} animation={animation} />
        }
      }
    })
  }

  return (
    <div className={cn("flex flex-col", isUser ? "items-end" : "items-start")}>
      <div className={chatBubbleVariants({ role, animation })}>
        <div className={isUser ? "text-primary-foreground" : "text-foreground"}>
          <MarkdownRenderer>{content}</MarkdownRenderer>
        </div>
      </div>
      {showTimeStamp && createdAt ? (
        <span className={cn("mt-1 block px-1 text-xs opacity-50", animation !== "none" && "duration-500 animate-in fade-in-0")}>{formattedTime}</span>
      ) : null}
    </div>
  )
}

const NavigationToolResult = ({ animation, result }) => {
  const router = useRouter()
  useEffect(() => {
    router.push(result)
  }, [result, router])

  return (
    <div className={cn("flex flex-col", "items-start")}>
      <div className={chatBubbleVariants({ role: "toolInvocation", animation })}>
        <Link prefetch={false} href={result}>
          Navigation result
        </Link>
      </div>
    </div>
  )
}
