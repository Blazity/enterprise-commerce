import { Alert } from "@inkjs/ui"
import { Box, useApp } from "ink"
import { useEffect } from "react"

export function CriticalError({ message }: { message: string }) {
  const { exit } = useApp()

  useEffect(() => {
    exit()
    process.exit(0)
  }, [])

  return (
    <Box marginBottom={1}>
      <Alert variant="error">Critical Error Occured: {message}</Alert>
    </Box>
  )
}
