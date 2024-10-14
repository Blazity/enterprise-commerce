import { Button } from "components/Button/Button"
import { Input, InputProps } from "components/Input/Input"
import { Label } from "components/Label/Label"
import { type ChangeEvent, type KeyboardEvent, useState } from "react"

interface PriceFacetProps {
  initMin: number | null
  initMax: number | null
  setFacet: (facet: { minPrice: number | null; maxPrice: number | null }) => void
}

export const PriceFacet = ({ initMin, initMax, setFacet }: PriceFacetProps) => {
  const [minPrice, setMinPrice] = useState(initMin)
  const [maxPrice, setMaxPrice] = useState(initMax)

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setFacet({ minPrice, maxPrice })
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-4 lg:flex-col">
        <PriceInput
          id="min-price"
          label="Min price"
          value={minPrice || undefined}
          onChange={(e) => {
            setMinPrice(+e.target.value)
          }}
          onKeyDown={handleKeyDown}
        />

        <PriceInput
          id="max-price"
          label="Max price"
          value={maxPrice || undefined}
          onChange={(e) => {
            setMaxPrice(+e.target.value)
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
      <Button
        className="ml-auto mt-2"
        onClick={() => {
          setFacet({ minPrice, maxPrice })
        }}
      >
        Apply
      </Button>
    </div>
  )
}

interface PriceInputProps extends InputProps {
  value: number | undefined
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  label: string
}

function PriceInput({ value, onChange, label, ...rest }: PriceInputProps) {
  return (
    <Label className="flex w-full min-w-[90px] flex-col gap-2">
      {label}
      <Input
        placeholder="10.0"
        className="block h-auto w-full rounded-md border border-neutral-300 bg-neutral-100 px-2.5 py-1.5 text-[14px] text-black focus:border-blue-500 focus:ring-blue-500"
        type="number"
        value={value}
        onChange={onChange}
        {...rest}
      />
    </Label>
  )
}
