import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "utils/cn"

const buttonVariants = cva("inline-flex border border-black rounded-md text-center overflow-hidden group relative disabled:opacity-70 disabled:cursor-not-allowed", {
  variants: {
    variant: {
      primary: "hover:text-white text-black bg-white",
      secondary: "hover:text-black text-white bg-black",
      ghost: "hover:bg-accent hover:text-accent-foreground border-0 bg-transparent",
      outline: "bg-transparent",
    },
    size: {
      default: "px-10 py-2 text-[11px]",
      lg: "px-6 py-3 text-[13px]",
      xl: "px-10 py-2 md:px-20 md:py-4 md:text-[18px]",
      icon: "size-10",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
})

const overlayVariants = cva("absolute inset-0 w-0 transition-all duration-[250ms] ease-out group-hover:w-full", {
  variants: {
    variant: {
      primary: "bg-black text-white",
      secondary: "bg-white text-black",
      ghost: "bg-white text-black",
      outline: "bg-white text-black",
    },
    size: {},
  },
  defaultVariants: {
    variant: "primary",
  },
})

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isAnimated?: boolean
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, children, isAnimated = true, isLoading, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
      {isAnimated ? <div className={cn(overlayVariants({ variant }))} /> : null}
      <span className="relative">{children}</span>
      {isLoading ? (
        <div className="absolute right-4 top-0 flex h-full items-center justify-center">
          <span className="pointer-events-none  size-5 animate-spin rounded-full border-4 border-solid border-white border-t-transparent" />
        </div>
      ) : null}
    </Comp>
  )
})

Button.displayName = "Button"

export { Button, buttonVariants }
