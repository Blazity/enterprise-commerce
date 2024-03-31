import { GoogleTagManager } from "@next/third-parties/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { env } from "env.mjs"
import { getVercelFlagOverrides } from "utils/getVercelFlagOverrides"

export async function ThirdParties() {
  const flags = await getVercelFlagOverrides()

  return (
    <>
      {flags?.isVercelAnalyticsEnabled ? <Analytics /> : null}
      {flags?.isSpeedInsightsEnabled && process.env.NODE_ENV === "production" ? <SpeedInsights /> : null}
      {flags?.isGoogleTagManagerEnabled ? <GoogleTagManager gtmId={env.GTM_ID} /> : null}
    </>
  )
}
