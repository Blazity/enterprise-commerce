import { Box, Text } from "ink"
import chalk from "chalk"

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
  const bar = chalk.green(fullBar.repeat(filledWidth) + emptyBar.repeat(emptyWidth))

  return (
    <Box>
      <Text>
        {bar} {percentage}%
      </Text>
    </Box>
  )
}
