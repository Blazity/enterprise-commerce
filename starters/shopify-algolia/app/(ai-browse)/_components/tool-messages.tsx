import type { Message } from "ai"
import { AllowedTools } from "lib/ai/tools"
import { ProductResultsList, CategoriesResultsList } from "./results"

export const ToolsUI = ({ message }: { message: Message }) => {
  if (!message?.toolInvocations || message?.toolInvocations?.length < 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-4">
      {message.toolInvocations.map((toolInvocation) => {
        const { toolName, toolCallId, state } = toolInvocation

        if (state === "result") {
          return (
            <div key={toolCallId}>
              <ToolUI toolName={toolName as AllowedTools} result={toolInvocation.result} />
            </div>
          )
        }

        return (
          <div key={toolCallId}>
            <ToolUISkeleton toolName={toolName as AllowedTools} />
          </div>
        )
      })}
    </div>
  )
}

const ToolUI = ({ toolName, result = null }: { toolName: AllowedTools; result?: any }) => {
  switch (toolName) {
    case "searchProducts":
      return <ProductResultsList products={result} />

    case "searchCategories":
      return <CategoriesResultsList categories={result} />
    case "buildNavigationQuery":
      return null
    default:
      return (
        <div>
          Unknown tool - {toolName}:{JSON.stringify(result, null, 2)}
        </div>
      )
  }
}

const ToolUISkeleton = ({ toolName }: { toolName: AllowedTools }) => {
  switch (toolName) {
    case "searchProducts":
      return <div>i am product search tool skeleton</div>
    case "searchCategories":
      return <div>i am category search tool skeleton</div>
  }
}
