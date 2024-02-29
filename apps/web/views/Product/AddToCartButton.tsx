import { Button } from "components/Button"
import { cn } from "utils/cn"

export function AddToCartButton({ className }: { className?: string }) {
  return (
    <Button variant="secondary" size="xl" isAnimated={false} className={cn("w-fit rounded-xl transition-transform hover:scale-105 hover:text-white", className)}>
      Add to Cart
    </Button>
  )
}
