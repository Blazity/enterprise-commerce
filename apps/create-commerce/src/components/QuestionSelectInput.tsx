import { Box, Text, useFocus, useFocusManager } from "ink"
import SelectInput from "ink-select-input"
import { terminalColors } from "@enterprise-commerce/tui/terminal-colors"
import { useEffect } from "react"

import { TextWithHorizontalPadding } from "./TextWithHorizontalPadding"
import { ComponentWithId } from "../types"

type SelectItem = { label: string; value: string }

type QuestionSelectInputProps = {
  question: string
  defaultValue?: string
  items: SelectItem[]
  nextFocusId?: string
  onEnter: (value: string) => void
} & ComponentWithId

export function QuestionSelectInput({
  question,
  items,
  nextFocusId,
  id,
  defaultValue,
  onEnter,
}: QuestionSelectInputProps) {
  const { isFocused } = useFocus({ id, autoFocus: true })
  const { focus } = useFocusManager()

  useEffect(() => {
    focus(id)
  }, [])

  const handleSubmit = (selectedItem: SelectItem) => {
    onEnter(selectedItem.value)
    if (nextFocusId) {
      focus(nextFocusId)
      return
    }
  }

  return (
    <Box padding={1}>
      <Box marginRight={1}>
        <TextWithHorizontalPadding
          backgroundColor={terminalColors.blazity}
          color={terminalColors.textOnBrightBackground}
          bold
        >
          {question}
          {":"}
        </TextWithHorizontalPadding>
      </Box>
      <SelectInput
        initialIndex={items.findIndex((item) => item.value === defaultValue)}
        isFocused={isFocused}
        items={items}
        onSelect={handleSubmit}
      />
    </Box>
  )
}
