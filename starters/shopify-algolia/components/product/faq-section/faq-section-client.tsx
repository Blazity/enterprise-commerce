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
  return (
    <Accordion type="multiple" className={cn("w-full", className)} defaultValue={Array.isArray(defaultOpenSections) ? defaultOpenSections.map(nameToSlug) : [nameToSlug(defaultOpenSections ?? "")]}>
      {children}
    </Accordion>
  )
}

interface FaqAccordionItemProps {
  title: string
  children: React.ReactNode
}

export function FaqAccordionItem({ title, children }: FaqAccordionItemProps) {
  console.log(title, nameToSlug(title))
  return (
    <AccordionItem value={nameToSlug(title)} key={nameToSlug(title)}>
      <AccordionTrigger className="py-4 text-base font-bold">{title}</AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  )
}
