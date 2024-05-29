import { env } from "env.mjs"

export function authenticate(req: Request) {
  const authHeader = req.headers.get("authorization")
  return authHeader === `Bearer ${env.CRON_SECRET}`
}
