import { Alert, AlertDescription, AlertTitle } from "components/Alert/Alert"
import { isDemoMode } from "utils/demoUtils"

export function DemoModeAlert() {
  if (!isDemoMode()) return null

  return (
    <Alert className="fixed inset-x-0 bottom-10 z-50 mx-auto max-w-[90%] bg-gradient-to-b from-yellow-200 to-yellow-500 md:bottom-auto md:right-4 md:top-10 md:m-0 md:ml-auto md:max-w-[350px]">
      <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
        <path d="M64 96c0-35.3 28.7-64 64-64H512c35.3 0 64 28.7 64 64V352H512V96H128V352H64V96zM0 403.2C0 392.6 8.6 384 19.2 384H620.8c10.6 0 19.2 8.6 19.2 19.2c0 42.4-34.4 76.8-76.8 76.8H76.8C34.4 480 0 445.6 0 403.2zM281 209l-31 31 31 31c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-48-48c-9.4-9.4-9.4-24.6 0-33.9l48-48c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9zM393 175l48 48c9.4 9.4 9.4 24.6 0 33.9l-48 48c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l31-31-31-31c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z" />
      </svg>
      <AlertTitle>Demo mode active</AlertTitle>
      <AlertDescription>
        <p>Filtering, searching, and adding to cart is disabled.</p>
        <div className="mt-2">
          To enable,{" "}
          <a className="underline" target="_blank" href="https://docs.commerce.blazity.com/setup#manual">
            setup environment variables
          </a>
        </div>
      </AlertDescription>
    </Alert>
  )
}
