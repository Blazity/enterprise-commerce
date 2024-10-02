import { NextRequest, NextResponse } from "next/server"
import { verifyAccess, type ApiData } from "@vercel/flags"

export async function GET(request: NextRequest) {
  const access = await verifyAccess(request.headers.get("Authorization"))
  if (!access) return NextResponse.json(null, { status: 401 })

  const apiData = {
    definitions: {
      isVercelAnalyticsEnabled: {
        description: "Controls whether the new feature is visible",
        options: [
          { value: false, label: "Off" },
          { value: true, label: "On" },
        ],
      },
      isGoogleTagManagerEnabled: {
        description: "Controls whether the new feature is visible",
        options: [
          { value: false, label: "Off" },
          { value: true, label: "On" },
        ],
      },
      isSpeedInsightsEnabled: {
        description: "Controls whether the new feature is visible",
        options: [
          { value: false, label: "Off" },
          { value: true, label: "On" },
        ],
      },
    },
  } as ApiData

  return NextResponse.json<ApiData>(apiData)
}
