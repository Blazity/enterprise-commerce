import { cn } from "utils/cn"

export function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-plus", className)}
    >
      <path d="M5 12h14" className="origin-center transition-all" />
      <path d="M12 5v14" />
    </svg>
  )
}
