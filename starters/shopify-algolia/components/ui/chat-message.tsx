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
import { CreditCard, SearchCheck, ShoppingCart } from "lucide-react"
import { useToolInvocationStore } from "stores/tool-invocation-store"

const chatBubbleVariants = cva("group/message relative break-words rounded-lg text-sm sm:max-w-[70%]", {
  variants: {
    role: {
      user: "bg-gray-200 text-black px-3 py-2",
      assistant: "text-black sm:max-w-[90%]",
      data: "",
      system: "",
      toolInvocation:
        "border border-gray-300 px-3 py-2 md:w-full md:max-w-full flex items-center gap-2 hover:underline",
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

export const ChatMessage: React.FC<ChatMessageProps> = ({
  role,
  content,
  createdAt,
  showTimeStamp = false,
  animation = "scale",
  toolInvocations,
  showToolMessages,
  actions,
}) => {
  const isUser = role === "user"

  const formattedTime = createdAt?.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  if (toolInvocations?.length) {
    return toolInvocations.map((toolInvocation) => {
      const { toolName, toolCallId, state } = toolInvocation

      if (state === "result") {
        if (toolName === "navigateUser") {
          const { result } = toolInvocation
          return <NavigationToolResult key={toolCallId} result={result} animation={animation} toolCallId={toolCallId} />
        }
        if (toolName === "addToCart") {
          const { result } = toolInvocation
          return (
            <AddedToCart
              key={toolCallId}
              variant={result.variant}
              product={result.product}
              animation={animation}
              toolCallId={toolCallId}
            />
          )
        }
        if (toolName === "goToCheckout") {
          const { result } = toolInvocation
          return (
            <MoveToCheckout
              key={toolCallId}
              checkoutUrl={result.checkoutUrl}
              animation={animation}
              toolCallId={toolCallId}
            />
          )
        }
      }
      return null
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("flex flex-col", isUser ? "items-end" : "items-start")}
    >
      <div className={cn(chatBubbleVariants({ role, animation }))}>
        <motion.div className="text-black/90" animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
          <MarkdownRenderer>{content}</MarkdownRenderer>
        </motion.div>

        {!!(role === "assistant" && actions && showToolMessages) && (
          <div className="absolute -bottom-4 right-2 flex space-x-1 rounded-lg border p-1 opacity-0 transition-opacity group-hover/message:opacity-100">
            {actions}
          </div>
        )}
      </div>

      {showTimeStamp && createdAt ? (
        <span className={cn("mt-1 block text-xs opacity-50", role === "user" && "px-1")}>{formattedTime}</span>
      ) : null}
    </motion.div>
  )
}

const NavigationToolResult = ({ animation, result, toolCallId }) => {
  const router = useRouter()
  const { hasToolCallExecuted, markToolCallAsExecuted } = useToolInvocationStore()

  useEffect(() => {
    if (!hasToolCallExecuted(toolCallId)) {
      router.push(result)
      markToolCallAsExecuted(toolCallId)
    }
  }, [result, router, toolCallId, hasToolCallExecuted, markToolCallAsExecuted])

  const navigationMessages = {
    "/search": "Searched for products",
    "/product": "Navigated to product page",
    "/category": "Navigated to category",
  }

  const message = Object.keys(navigationMessages).reduce(
    (defaultMessage, path) => (result.includes(path) ? navigationMessages[path] : defaultMessage),
    "Navigated to page"
  )

  return (
    <div className={cn("flex flex-col", "items-start")}>
      <Link prefetch={false} href={result} className={chatBubbleVariants({ role: "toolInvocation", animation })}>
        <SearchCheck size={16} className="text-gray-400" /> {message}
      </Link>
    </div>
  )
}

const AddedToCart = ({ variant, product, animation, toolCallId }) => {
  const setProduct = useAddProductStore((s) => s.setProduct)
  const clean = useAddProductStore((s) => s.clean)
  const refresh = useCartStore((s) => s.refresh)
  const { hasToolCallExecuted, markToolCallAsExecuted } = useToolInvocationStore()

  useEffect(() => {
    if (!hasToolCallExecuted(toolCallId)) {
      setTimeout(() => {
        setProduct({ product, combination: variant })
      }, 300)

      setTimeout(() => clean(), 4500)

      refresh()
      markToolCallAsExecuted(toolCallId)
    }
  }, [setProduct, clean, refresh, product, variant, toolCallId, hasToolCallExecuted, markToolCallAsExecuted])

  return (
    <div className={cn("flex flex-col items-start")}>
      <div className={cn(chatBubbleVariants({ role: "toolInvocation", animation }), "hover:no-underline")}>
        <ShoppingCart size={16} className="text-gray-400" /> Added product to cart
      </div>
    </div>
  )
}

const MoveToCheckout = ({ checkoutUrl, animation, toolCallId }) => {
  const router = useRouter()
  const { hasToolCallExecuted, markToolCallAsExecuted } = useToolInvocationStore()

  useEffect(() => {
    if (!hasToolCallExecuted(toolCallId)) {
      router.push(checkoutUrl)
      markToolCallAsExecuted(toolCallId)
    }
  }, [checkoutUrl, router, toolCallId, hasToolCallExecuted, markToolCallAsExecuted])

  return (
    <div className={cn("flex flex-col", "items-start")}>
      <Link prefetch={false} href={checkoutUrl} className={chatBubbleVariants({ role: "toolInvocation", animation })}>
        <CreditCard size={16} className="text-gray-400" /> Navigated to checkout
      </Link>
    </div>
  )
}
