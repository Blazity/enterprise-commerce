import { Box, Newline, Text, useFocus, useFocusManager } from "ink"
import { UncontrolledTextInput } from "ink-text-input"
import { terminalColors } from "../helpers/terminal-colors"
import { useEffect } from "react"

import { TextWithHorizontalPadding } from "./TextWithHorizontalPadding"
import { ComponentWithId } from "../types"

type QuestionTextInputProps = {
  question?: string
  defaultValue?: string
  nextFocusId?: string
  helpText?: string
  secretInput?: boolean
  onEnter?: (value: string) => void
} & ComponentWithId

export function QuestionTextInput({ question, nextFocusId, secretInput, id, helpText, defaultValue, onEnter }: QuestionTextInputProps) {
  const { isFocused } = useFocus({ id, autoFocus: true })
  const { focus } = useFocusManager()

  useEffect(() => {
    focus(id)
  }, [])

  const handleSubmit = (value: string) => {
    if (value === "") {
      if (defaultValue) {
        onEnter(defaultValue)
        if (nextFocusId) {
          focus(nextFocusId)
        }
        return
      }
      return
    }

    onEnter(value)
    if (nextFocusId) {
      focus(nextFocusId)
    }
  }

  return (
    <Box paddingBottom={1} width={70} display="flex" flexDirection="column">
      {helpText ? (
        <Text color={"white"} dimColor>
          {helpText}
        </Text>
      ) : null}
      <Box>
        <Box marginRight={1}>
          <TextWithHorizontalPadding backgroundColor={terminalColors.blazity} color={terminalColors.textOnBrightBackground} bold>
            {question}
            {":"}
          </TextWithHorizontalPadding>
        </Box>
        <UncontrolledTextInput mask={secretInput ? "*" : undefined} focus={isFocused} onSubmit={handleSubmit} placeholder={defaultValue} />
      </Box>
    </Box>
  )
}
