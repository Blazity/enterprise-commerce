import { useState, useEffect, Fragment } from "react"
import { Text } from "ink"
import { terminalColors } from "@enterprise-commerce/tui/terminal-colors"

const SHOP_ART = [
  "           ┌───────────────┐  ",
  "           │  Commerce     │──┐  ",
  "           │   by Blazity  │  │  ",
  "           │      ┌──┐     │  │  ",
  "           │      │  │     │  │  ",
  "           │      │  │     │  │ ",
]

const DOOR_POSITION = 22
const STICKMAN = {
  head: " O",
  body: "/|\\",
  legs: "/ \\",
}
const STICKMAN_WIDTH = Math.max(STICKMAN.head.length, STICKMAN.body.length, STICKMAN.legs.length)
const START_POSITION = 0
const UPDATE_INTERVAL = 90

export function ShopAnimation() {
  const [position, setPosition] = useState(START_POSITION)

  useEffect(() => {
    const timer = setInterval(() => {
      setPosition((prevPosition) => {
        return prevPosition < DOOR_POSITION - STICKMAN_WIDTH ? prevPosition + 1 : prevPosition
      })
    }, UPDATE_INTERVAL)

    return () => clearInterval(timer)
  }, [])

  const renderStickmanPart = (lineIndex: number, part: string) => {
    const line = SHOP_ART[lineIndex]
    if (position < DOOR_POSITION - STICKMAN_WIDTH) {
      const updatedLine = line.substring(0, position) + part + line.substring(position + part.length)
      return <Text>{updatedLine}</Text>
    }
    return <Text>{line}</Text>
  }

  const renderScene = () => {
    return SHOP_ART.map((line, index) => <Fragment key={line}>{renderStickmanPatternMatching({ index, renderStickmanPart, line })}</Fragment>)
  }

  return <>{renderScene()}</>
}

type HighlightedTextLineProps = {
  line: string
  textToHighlight: string
}

function HighlightedTextLine({ line, textToHighlight }: HighlightedTextLineProps) {
  if (!line.includes(textToHighlight)) {
    return <Text>{line}</Text>
  }

  const lineParts = line.split(textToHighlight)

  return (
    <Text>
      {lineParts[0]}
      <Text bold color={terminalColors.blazity}>
        {textToHighlight}
      </Text>
      {lineParts[1]}
    </Text>
  )
}

type RenderStickmanPart = (lineIndex: number, part: string) => JSX.Element
type RenderStickmanPatternMatchingParams = {
  index: number
  renderStickmanPart: RenderStickmanPart
  line: string
}

function renderStickmanPatternMatching({ index, renderStickmanPart, line }: RenderStickmanPatternMatchingParams) {
  switch (index) {
    case 3:
      return renderStickmanPart(index, STICKMAN.head)
    case 4:
      return renderStickmanPart(index, STICKMAN.body)
    case 5:
      return renderStickmanPart(index, STICKMAN.legs)
    default:
      return <HighlightedTextLine line={line} textToHighlight="Blazity" />
  }
}
