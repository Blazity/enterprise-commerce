import { type ChangeEvent, type KeyboardEvent, useState } from "react"

import { Button } from "components/ui/button-old"
import { Input, InputProps } from "components/ui/input"
import { Label } from "components/ui/label"

interface PriceFacetProps {
  minPrice: number | null
  maxPrice: number | null
  setFacet: (facet: { minPrice: number | null; maxPrice: number | null }) => void
}

export const PriceFacet = ({ minPrice, maxPrice, setFacet }: PriceFacetProps) => {
  const [minInput, setMinInput] = useState(minPrice?.toString() ?? null)
  const [maxInput, setMaxInput] = useState(maxPrice?.toString() ?? null)

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      applyPrices()
    }
  }

  const applyPrices = () => {
    const minValue = minInput === "" ? null : Number(minInput)
    const maxValue = maxInput === "" ? null : Number(maxInput)

    const finalMin = minValue !== null && !isNaN(minValue) ? minValue : null
    const finalMax = maxValue !== null && !isNaN(maxValue) ? maxValue : null

    if (finalMin !== null && finalMax !== null) {
      if (finalMin > finalMax) {
        setMaxInput("")
        setFacet({
          minPrice: finalMin,
          maxPrice: null,
        })
        return
      }
    }

    setFacet({
      minPrice: finalMin,
      maxPrice: finalMax,
    })
  }

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>, field: "min" | "max") => {
    const value = e.target.value

    if (field === "min") {
      const newMin = value === "" ? null : Number(value)
      setMinInput(value)

      if (newMin !== null && maxInput !== "" && newMin > Number(maxInput)) {
        setMaxInput("")
      }
    } else {
      const newMax = value === "" ? null : Number(value)
      setMaxInput(value)

      if (newMax !== null && minInput !== "" && newMax < Number(minInput)) {
        setMinInput("")
      }
    }
  }

  return (
    <div className="flex flex-col gap-1 py-1">
      <div className="flex gap-2 lg:flex-col">
        <PriceInput
          id="min-price"
          label="Min price"
          value={minInput ?? ""}
          onChange={(e) => handlePriceChange(e, "min")}
          onKeyDown={handleKeyDown}
        />

        <PriceInput
          id="max-price"
          label="Max price"
          value={maxInput ?? ""}
          onChange={(e) => handlePriceChange(e, "max")}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="flex gap-2 pt-2">
        <Button
          className="w-full border-none bg-gray-50 text-xs font-medium hover:underline"
          onClick={() => {
            setMinInput(null)
            setMaxInput(null)
            setFacet({
              minPrice: null,
              maxPrice: null,
            })
          }}
        >
          Reset
        </Button>
        <Button className="w-full border-none bg-gray-200 text-xs  font-medium hover:bg-gray-300" onClick={applyPrices}>
          Apply
        </Button>
      </div>
    </div>
  )
}

interface PriceInputProps extends InputProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  label: string
}

function PriceInput({ value, onChange, label, ...rest }: PriceInputProps) {
  return (
    <Label className="flex w-full min-w-[90px] flex-col gap-2">
      {label}
      <Input
        placeholder="10.0"
        className="block h-auto w-full rounded-md border border-neutral-300 bg-white px-2.5 py-1.5 text-[14px] text-black focus:border-primary focus:ring-primary"
        type="number"
        value={value}
        inputMode="numeric"
        onChange={onChange}
        {...rest}
      />
    </Label>
  )
}
