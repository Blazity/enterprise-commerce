import { decrypt, type FlagOverridesType } from "@vercel/flags"
import { env } from "env.mjs"
import { cookies } from "next/headers"

type Flags = Record<Partial<"isVercelAnalyticsEnabled" | "isGoogleTagManagerEnabled" | "isSpeedInsightsEnabled">, boolean>

export async function getVercelFlagOverrides(): Promise<Flags | null> {
  const overridesCookieValue = cookies().get("vercel-flag-overrides")?.value
  const overrides = overridesCookieValue ? ((await decrypt<FlagOverridesType>(overridesCookieValue)) as Flags) : null

  return {
    isVercelAnalyticsEnabled: overrides?.isVercelAnalyticsEnabled ?? env.IS_VERCEL_ANALYTICS_ENABLED === "true",
    isGoogleTagManagerEnabled: overrides?.isGoogleTagManagerEnabled ?? env.IS_GTM_ENABLED === "true",
    isSpeedInsightsEnabled: overrides?.isSpeedInsightsEnabled ?? env.IS_SPEED_INSIGHTS_ENABLED === "true",
  }
}
