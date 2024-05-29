import { createHmac } from "crypto"

export function compareHmac({ body, hmac, secret, algorithm = "sha256" }: { body: string; hmac: string; secret: string; algorithm?: string }) {
  const hash = createHmac(algorithm, secret).update(body).digest("base64")

  return hmac === hash
}
