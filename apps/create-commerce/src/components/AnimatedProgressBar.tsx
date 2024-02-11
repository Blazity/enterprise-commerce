import { Box, Text } from "ink"

type ProgressBarProps = {
  progress: number
  width?: number
}

export function AnimatedProgressBar({ progress, width = 30 }: ProgressBarProps) {
  const fullBar = "█"
  const emptyBar = "░"
  const percentage = Math.min(Math.max(progress, 0), 100)
  const filledWidth = Math.round((percentage / 100) * width)
  const emptyWidth = width - filledWidth

  return (
    <Box>
      <Text color="green">{fullBar.repeat(filledWidth) + emptyBar.repeat(emptyWidth)}</Text>
      <Text> </Text>
      <Text>{Math.round(percentage)}%</Text>
    </Box>
  )
}
