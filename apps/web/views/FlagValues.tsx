import { encrypt, FlagValuesType } from "@vercel/flags"
import { FlagValues as VercelFlagValues } from "@vercel/flags/react"
import { Suspense } from "react"
import { getVercelFlagOverrides } from "utils/getVercelFlagOverrides"

async function ConfidentialFlagValues({ values }: { values: FlagValuesType }) {
  const encryptedFlagValues = await encrypt(values)
  return <VercelFlagValues values={encryptedFlagValues} />
}

export async function FlagValues() {
  const flags = await getVercelFlagOverrides()

  return (
    <Suspense fallback={null}>
      <ConfidentialFlagValues values={flags!} />
    </Suspense>
  )
}
