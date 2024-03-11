import { Box, Text, useInput } from "ink"
import { useState } from "react"
import { TextWithHorizontalPadding } from "./TextWithHorizontalPadding"
import { terminalColors } from "../helpers/terminal-colors"

type SelectItem = { label: string; value: string }

type QuestionMultiSelectInputProps = {
  question: string
  helperText?: string
  items: SelectItem[]
  onEnter: (value: string[]) => void
}

export function QuestionMultiSelectInput({ question, items, onEnter, helperText }: QuestionMultiSelectInputProps) {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])
  const [cursor, setCursor] = useState(0)

  useInput((input, key) => {
    if (input === " ") {
      const newSelectedIndexes = selectedIndexes.includes(cursor) ? selectedIndexes.filter((index) => index !== cursor) : [...selectedIndexes, cursor]
      setSelectedIndexes(newSelectedIndexes)
    } else if (key.upArrow) {
      setCursor((prev) => (prev > 0 ? prev - 1 : items.length - 1))
    } else if (key.downArrow) {
      setCursor((prev) => (prev < items.length - 1 ? prev + 1 : 0))
    } else if (key.return) {
      onEnter(selectedIndexes.map((index) => items[index].value))
    }
  })

  return (
    <Box flexDirection="column" padding={1}>
      <TextWithHorizontalPadding backgroundColor={terminalColors.blazity} color={terminalColors.textOnBrightBackground} bold>
        {question}
      </TextWithHorizontalPadding>
      {helperText ? (
        <Box width={70}>
          <Text color="white" dimColor>
            {helperText}
          </Text>
        </Box>
      ) : null}
      {items.map((item, index) => {
        const isSelected = selectedIndexes.includes(index)
        const isHovered = cursor === index

        return (
          <Box key={item.value}>
            <Box>
              <TextWithHorizontalPadding backgroundColor={isSelected ? "greenBright" : "redBright"} color={terminalColors.textOnBrightBackground} bold paddingX={1}>
                {isSelected ? "ENABLED" : "DISABLED"}
              </TextWithHorizontalPadding>
            </Box>
            <Box>
              <TextWithHorizontalPadding backgroundColor={isHovered ? terminalColors.blazity : "black"} paddingX={1} bold>
                {item.label}
              </TextWithHorizontalPadding>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}
