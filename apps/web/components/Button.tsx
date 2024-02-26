import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "utils/cn"

const buttonVariants = cva("inline-flex border border-black rounded-md text-center overflow-hidden group relative", {
  variants: {
    variant: {
      primary: "hover:text-white text-black bg-white",
      secondary: "hover:text-black text-white bg-black",
      ghost: "hover:bg-accent hover:text-accent-foreground border-0 bg-transparent",
    },
    size: {
      default: "px-10 py-2 text-[11px]",
      lg: "px-6 py-3 text-[13px]",
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, children, isAnimated = true, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
      {isAnimated ? <div className={cn(overlayVariants({ variant }))} /> : null}
      <span className="relative">{children}</span>
    </Comp>
  )
})

Button.displayName = "Button"

export { Button, buttonVariants }
