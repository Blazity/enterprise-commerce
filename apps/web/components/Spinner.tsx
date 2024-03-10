import { cn } from "utils/cn"

export function Spinner({ className }: { className?: string }) {
  return <div className={cn("pointer-events-none size-5 animate-spin rounded-full border-4 border-solid border-blue-200 border-t-transparent", className)} />
}
