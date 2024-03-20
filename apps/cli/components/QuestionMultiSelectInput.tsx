import { Box, Text, useInput } from "ink"
import { useState, useEffect, useRef } from "react"
import { TextWithHorizontalPadding } from "./TextWithHorizontalPadding"
import { terminalColors } from "../helpers/terminal-colors"

type SelectItem = { label: string; value: string }

type QuestionMultiSelectInputProps = {
  helperText?: string
  items: SelectItem[]
  initialValues?: Record<string, boolean>
  onEnter: (value: Record<string, boolean>) => void
}

export function QuestionMultiSelectInput({ items, onEnter, helperText, initialValues }: QuestionMultiSelectInputProps) {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])
  const [cursor, setCursor] = useState(0)
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (initialValues && isInitialMount.current) {
      const initialSelectedIndexes = items.reduce((acc: number[], item, index) => {
        if (initialValues[item.value]) {
          acc.push(index)
        }
        return acc
      }, [])
      setSelectedIndexes(initialSelectedIndexes)
      isInitialMount.current = false
    }
  }, [items, initialValues])

  useInput((input, key) => {
    if (input === " ") {
      const newSelectedIndexes = selectedIndexes.includes(cursor) ? selectedIndexes.filter((index) => index !== cursor) : [...selectedIndexes, cursor]
      setSelectedIndexes(newSelectedIndexes)
    } else if (key.upArrow) {
      setCursor((prev) => (prev > 0 ? prev - 1 : items.length - 1))
    } else if (key.downArrow) {
      setCursor((prev) => (prev < items.length - 1 ? prev + 1 : 0))
    } else if (key.return) {
      onEnter(Object.fromEntries(items.map((item, itemIndex) => [item.value, selectedIndexes.includes(itemIndex)])))
      // Do not reset selectedIndexes here to prevent resetting to initial values after submission
    }
  })

  return (
    <Box flexDirection="column" paddingBottom={1}>
      {helperText && (
        <Box width={70}>
          <Text color="white" dimColor>
            {helperText}
          </Text>
        </Box>
      )}
      {items.map((item, index) => {
        const isSelected = selectedIndexes.includes(index)
        const isHovered = cursor === index

        return (
          <Box key={item.value}>
            <Box marginRight={1}>
              <TextWithHorizontalPadding backgroundColor={isSelected ? "green" : "red"} color="white" bold paddingX={1}>
                {isSelected ? "ENABLED" : "DISABLED"}
              </TextWithHorizontalPadding>
            </Box>
            <Box>
              <TextWithHorizontalPadding backgroundColor={isHovered ? terminalColors.blazity : "black"} color="white" paddingX={1} bold>
                {item.label}
              </TextWithHorizontalPadding>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}
