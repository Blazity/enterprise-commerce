import { AccordionContent, AccordionItem, AccordionTrigger } from "components/Accordion/Accordion"
import { Checkbox } from "components/Checkbox/Checkbox"
import { Label } from "components/Label/Label"

interface FacetProps {
  id: string
  title: string
  distribution: Record<string, number> | undefined
  isChecked: (value: string) => boolean
  onCheckedChange: (checked: boolean, value: string) => void
}

export function Facet({ id, title, distribution, isChecked, onCheckedChange }: FacetProps) {
  const distributionsEntries = Object.entries(distribution || {})

  const hasNoResults = distributionsEntries.length === 0

  return (
    <AccordionItem value={id}>
      <AccordionTrigger className="py-2 text-base">{title}</AccordionTrigger>
      <AccordionContent>
        {hasNoResults ? (
          <p className="text-[14px] text-neutral-500">No {title.toLowerCase()} found</p>
        ) : (
          <div className="grid gap-2">
            {distributionsEntries.map(([value], index) => (
              <Label key={value + index} className="flex items-center gap-2 font-normal">
                <Checkbox name={value} checked={isChecked(value)} onCheckedChange={(checked) => onCheckedChange(!!checked, value)} />
                {value}
              </Label>
            ))}
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  )
}
