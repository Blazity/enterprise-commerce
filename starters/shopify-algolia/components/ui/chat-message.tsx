"use client"

import React, { useEffect } from "react"
import type { Message as SDKMessage } from "ai"
import { cva, type VariantProps } from "class-variance-authority"
import { MarkdownRenderer } from "./markdown-renderer"
import { cn } from "utils/cn"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAddProductStore } from "stores/add-product-store"
import { useCartStore } from "stores/cart-store"

const chatBubbleVariants = cva("group/message relative break-words rounded-lg p-3 text-sm sm:max-w-[70%]", {
  variants: {
    role: {
      user: "bg-gray-200 text-black",
      assistant: "bg-gray-400/70 text-black",
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
  actions?: React.ReactNode
  showToolMessages?: boolean
}
export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, createdAt, showTimeStamp = false, animation = "scale", toolInvocations, showToolMessages, actions }) => {
  const isUser = role === "user"

  const formattedTime = createdAt?.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  if (!!toolInvocations?.length) {
    return toolInvocations.map((toolInvocation) => {
      const { toolName, toolCallId, state } = toolInvocation

      if (state === "result") {
        if (toolName === "navigateUser") {
          const { result } = toolInvocation
          return <NavigationToolResult key={toolCallId} result={result} animation={animation} />
        }

        if (toolName === "addToCart") {
          const { result } = toolInvocation
          return <AddedToCart key={toolCallId} variant={result.variant} product={result.product} />
        }
        if (toolName === "goToCheckout") {
          const { result } = toolInvocation
          return <MoveToCheckout key={toolCallId} checkoutUrl={result.checkoutUrl} />
        }
      }
    })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className={cn("flex flex-col", isUser ? "items-end" : "items-start")}>
      <div className={cn(chatBubbleVariants({ role, animation }))}>
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

const NavigationToolResult = ({ animation, result }) => {
  const router = useRouter()
  useEffect(() => {
    router.push(result)
  }, [result, router])

  return (
    <div className={cn("flex flex-col", "items-start")}>
      <div className={chatBubbleVariants({ role: "toolInvocation", animation })}>
        {/* @TODO: This can be improved if AI response provides a short navigation summary too */}
        <Link prefetch={false} href={result}>
          Navigation result
        </Link>
      </div>
    </div>
  )
}

const AddedToCart = ({ variant, product }) => {
  const setProduct = useAddProductStore((s) => s.setProduct)
  const clean = useAddProductStore((s) => s.clean)
  const refresh = useCartStore((s) => s.refresh)

  useEffect(() => {
    setTimeout(() => {
      setProduct({ product, combination: variant })
    }, 300)

    setTimeout(() => clean(), 4500)

    refresh()
  }, [setProduct, clean, refresh, product, variant])

  return null
}

const MoveToCheckout = ({ checkoutUrl }) => {
  const router = useRouter()
  useEffect(() => {
    router.push(checkoutUrl)
  }, [checkoutUrl, router])

  return null
}
