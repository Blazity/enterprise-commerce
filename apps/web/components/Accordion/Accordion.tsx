"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import * as React from "react"
import { cn } from "utils/cn"
import { ChevronIcon } from "../Icons/ChevronIcon"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Item>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>>(
  ({ className, ...props }, ref) => <AccordionPrimitive.Item ref={ref} className={cn("py-2", className)} {...props} />
)
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>>(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header asChild className="flex w-full">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn("flex flex-1 items-center justify-between border-b bg-white transition-all [&[data-state=open]>div>svg]:rotate-180", className)}
        {...props}
      >
        <div className="flex w-full items-center justify-between">
          {children}
          <ChevronIcon className="size-3 shrink-0 text-black transition-transform duration-200" />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
)
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Content>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>>(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm transition-all"
      {...props}
    >
      <div className={cn("py-6 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
)
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
