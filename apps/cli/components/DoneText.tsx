import { Alert } from "@inkjs/ui"
import { Box, useApp } from "ink"
import { useEffect } from "react"

export function DoneText() {
  const { exit } = useApp()

  useEffect(() => {
    exit()
    process.exit(0)
  }, [])

  return (
    <Box width={11}>
      <Alert variant="success">Done!</Alert>
    </Box>
  )
}
