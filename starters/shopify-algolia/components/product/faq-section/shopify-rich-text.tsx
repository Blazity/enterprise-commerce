import { createElement } from "react"
import React from "react"
import { RichText } from "@shopify/hydrogen-react"
import { cn } from "utils/cn"

interface ShopifyRichTextProps {
  data: string
  className?: string
}

export function ShopifyRichText({ data, className }: ShopifyRichTextProps) {
  return (
    <RichText
      data={data}
      as="div"
      className={className}
      components={{
        paragraph({ node }) {
          return <p className="mb-4 text-gray-800 last:mb-0">{node.children}</p>
        },
        heading({ node }) {
          const tagName = `h${node.level}` as keyof JSX.IntrinsicElements
          const headingClasses = {
            1: "text-3xl font-bold mb-6 last:mb-0",
            2: "text-2xl font-semibold mb-4 last:mb-0",
            3: "text-xl font-medium mb-3 last:mb-0",
            4: "text-lg font-medium mb-2 last:mb-0",
            5: "text-base font-medium mb-2 last:mb-0",
            6: "text-sm font-medium mb-1 last:mb-0",
          }

          return createElement(
            tagName,
            { className: headingClasses[node.level as keyof typeof headingClasses] },
            node.children
          )
        },
        text({ node }) {
          let className = ""
          if (node.bold && node.italic) {
            className = "font-bold italic"
          } else if (node.bold) {
            className = "font-bold"
          } else if (node.italic) {
            className = "italic"
          }

          return className ? <span className={className}>{node.value}</span> : <>{node.value}</>
        },
        list({ node }) {
          const ListTag = node.listType === "ordered" ? "ol" : "ul"
          const listClasses =
            node.listType === "ordered"
              ? cn("list-decimal list-outside mb-4 last:mb-0 pl-6")
              : cn("list-disc list-outside mb-4 last:mb-0 pl-6")

          return <ListTag className={cn(listClasses, "text-balance")}>{node.children}</ListTag>
        },

        listItem: ({ node }) => {
          return <li className="mb-1 last:mb-0">{node.children}</li>
        },
        link({ node }) {
          return (
            <a href={node.url} className="text-blue-600 underline hover:text-blue-800" target={node.target || "_self"}>
              {node.children}
            </a>
          )
        },
      }}
    />
  )
}
