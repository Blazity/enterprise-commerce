"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "components/ui/accordion"
import { cn } from "utils/cn"

const ACCORDIONS = {
  "Product Details": (
    <ul>
      <li>* 20L capacity</li>
      <li>* 700W output power</li>
      <li>* 6 power levels</li>
      <li>* 30 minuter timer</li>
      <li>* Cooking end signal</li>
    </ul>
  ),
  "Size and Fit": (
    <p>
      Est veniam qui aute nisi occaecat ad non velit anim commodo sit proident. Labore sint officia nostrud eu est fugiat nulla velit sint commodo. Excepteur sit ut anim pariatur
      minim adipisicing dolore sit dolore cupidatat. Amet reprehenderit ipsum aute minim incididunt adipisicing est.
    </p>
  ),
  "Free Delivery and Returns": (
    <p>
      Aliqua Lorem ullamco officia cupidatat cupidatat. Nostrud occaecat ex in Lorem. Et occaecat adipisicing do aliquip duis aliquip enim culpa nulla. Nulla quis aute ex eu est
      ullamco enim incididunt fugiat proident laboris. Laboris sint ad et nostrud velit fugiat fugiat proident enim sit irure elit. Ut amet elit labore cupidatat id consectetur
      sint fugiat esse excepteur pariatur. Tempor pariatur dolor eiusmod proident ad incididunt officia labore fugiat consectetur. Sunt veniam officia officia eiusmod minim
      incididunt est sit esse excepteur non cupidatat voluptate ea. Do excepteur sunt nostrud eu do id nisi dolore laboris ea ullamco magna eu. Eiusmod irure dolore amet velit
      laboris excepteur cupidatat est cupidatat minim ut anim id. Deserunt velit ex exercitation consequat quis magna pariatur laboris elit minim eiusmod anim.
    </p>
  ),
  "Supplier Information": (
    <p>
      Aliqua ut ex irure eu officia dolore velit et occaecat pariatur excepteur nostrud ad. Ea reprehenderit sint culpa excepteur adipisicing ipsum esse excepteur officia culpa
      adipisicing nostrud. Nulla Lorem voluptate tempor officia id mollit do est amet dolor nulla. Sint sunt consequat non in reprehenderit Lorem velit enim cillum enim. Consequat
      occaecat exercitation consequat nisi veniam. Ipsum est reprehenderit cupidatat nulla minim anim deserunt consequat ipsum anim ea tempor.
    </p>
  ),
}

export function FaqSection({ className }: { className?: string }) {
  return (
    <Accordion type="multiple" className={cn("w-full", className)} defaultValue={["Product Details"]}>
      {Object.entries(ACCORDIONS).map(([title, content]) => (
        <AccordionItem value={title} key={title}>
          <AccordionTrigger className="py-4 text-base font-bold">{title}</AccordionTrigger>
          <AccordionContent>{content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
