import { useState, useEffect } from "react"
import { Box, Text } from "ink"
import chalk from "chalk"

export function AnimatedProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((currentProgress) => {
        const nextProgress = currentProgress + 1
        if (nextProgress > 100) {
          clearInterval(interval)
          return 100
        }
        return nextProgress
      })
    }, 100) 

    return () => clearInterval(interval) 
  }, [])

  return <ProgressBar progress={progress} />
}

type ProgressBarProps = {
  progress: number
  width?: number
}

function ProgressBar({ progress, width = 30 }: ProgressBarProps) {
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
