import { AccordionContent, AccordionItem, AccordionTrigger } from "components/ui/accordion"
import { Checkbox } from "components/ui/checkbox"
import { Label } from "components/ui/label"

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
      <AccordionContent className="max-h-[250px] overflow-y-scroll">
        {hasNoResults ? (
          <p className="text-sm text-neutral-500">No {title.toLowerCase()} found</p>
        ) : (
          <div className="grid gap-2">
            {distributionsEntries.map(([value], index) => (
              <Label key={value + index} className="flex items-center gap-2">
                <Checkbox
                  name={value}
                  checked={isChecked(value)}
                  onCheckedChange={(checked) => onCheckedChange(!!checked, value)}
                />
                {value}
              </Label>
            ))}
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  )
}
