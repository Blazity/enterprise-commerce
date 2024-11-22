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
          const { result } = toolInvocation

          return (
            <div key={toolCallId}>
              <ToolUI toolName={toolName as AllowedTools} result={result} />
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
    case "productSearchTool":
      return <ProductResultsList products={result} />

    case "categorySearchTool":
      return <CategoriesResultsList categories={result} />
    default:
      return (
        <div>
          Unknown tool:
          {JSON.stringify(result, null, 2)}
        </div>
      )
  }
}

const ToolUISkeleton = ({ toolName }: { toolName: AllowedTools }) => {
  switch (toolName) {
    case "productSearchTool":
      return <div>i am product search tool skeleton</div>
    case "categorySearchTool":
      return <div>i am category search tool skeleton</div>
  }
}
