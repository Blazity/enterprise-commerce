import { env } from "env.mjs"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const TOKEN_ENDPOINT = `${env.AZURE_AI_SPEECH_BASE_URL}/sts/v1.0/issueToken`

export async function GET() {
  try {
    const resp = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Ocp-Apim-Subscription-Key": `${env.AZURE_AI_SPEECH_KEY}`,
      },
    })

    if (!resp.ok) {
      throw new Error("Bad response from API", { cause: resp })
    }
    const token = await resp.text()
    return NextResponse.json({ token })
  } catch (error) {
    console.error("Error fetching Azure token:", error)
    return NextResponse.json({ error: "Failed to fetch flow token" }, { status: 500 })
  }
}
