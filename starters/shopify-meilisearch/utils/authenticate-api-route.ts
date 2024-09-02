import { env } from "env.mjs"
import { timingSafeEqual } from "node:crypto"

export function authenticate(req: Request) {
  const authHeader = req.headers.get("authorization")

  if (!authHeader) return false

  const a = Buffer.from(authHeader, "utf-8")
  const b = Buffer.from(`Bearer ${env.CRON_SECRET}`, "utf-8")

  if (a.length !== b.length) return false

  return timingSafeEqual(a, b)
}
