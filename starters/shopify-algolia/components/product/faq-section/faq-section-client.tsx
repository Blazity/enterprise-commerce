"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "components/ui/accordion"
import { cn } from "utils/cn"
import { nameToSlug } from "utils/slug-name"

interface FaqSectionClientProps {
  className?: string
  defaultOpenSections?: string[] | string
  children: React.ReactNode
}

export function FaqSectionClient({ className, defaultOpenSections, children }: FaqSectionClientProps) {
  const defaultValues = Array.isArray(defaultOpenSections)
    ? defaultOpenSections
    : defaultOpenSections
      ? [defaultOpenSections]
      : ["product-details"]

  return (
    <Accordion type="multiple" className={cn("w-full", className)} defaultValue={defaultValues}>
      {children}
    </Accordion>
  )
}

interface FaqAccordionItemProps {
  title: string
  children: React.ReactNode
}

export function FaqAccordionItem({ title, children }: FaqAccordionItemProps) {
  return (
    <AccordionItem value={nameToSlug(title)} key={nameToSlug(title)}>
      <AccordionTrigger className="py-4 text-base font-bold">{title}</AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  )
}
