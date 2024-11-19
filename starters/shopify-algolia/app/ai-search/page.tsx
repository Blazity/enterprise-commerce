import { SidebarTrigger } from "components/ui/sidebar"
import { Suspense } from "react"
import { CategoriesResultsList, ProductResultsList } from "./_components/results"

export default function AiSearchPage() {
  return (
    <div className="p-4">
      <SidebarTrigger className="mb-4" />
      <h1 className="mb-4 text-2xl font-bold text-foreground">AI-Assisted Shopping</h1>
      <p className="mb-4 text-foreground/80">
        Use the chat interface on the left to interact with our AI shopping assistant. You can ask for product recommendations, compare items, or get help with your purchase.
      </p>
      <div className="grid grid-cols-1 gap-20">
        <Suspense>
          <CategoriesResultsList />
        </Suspense>
        <Suspense>
          <ProductResultsList />
        </Suspense>
      </div>
    </div>
  )
}
