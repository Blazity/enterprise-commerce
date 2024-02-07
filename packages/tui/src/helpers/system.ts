import { isNil } from "remeda"
import { execa } from "execa"

export async function getUserName() {
  const [{ stdout: gitConfigUserName }, { stdout: systemUserName }] = await Promise.all([
    execa("git", ["config", "user.name"], { encoding: "utf8" }),
    execa("whoami", undefined, { encoding: "utf8" }),
  ])

  if (!isNil(gitConfigUserName)) {
    return getLegibleFirstName(gitConfigUserName)
  }

  if (!isNil(systemUserName)) {
    return getLegibleFirstName(systemUserName)
  }

  return "Commerce owner"
}

function getLegibleFirstName(fullName: string) {
  const [firstName] = fullName.split(" ")
  return capitalizeFirstCharacter(firstName)
}

function capitalizeFirstCharacter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function getPackageManager() {
  const userAgent = process.env.npm_config_user_agent || ""

  if (userAgent.startsWith("yarn")) {
    return "yarn" as const
  }

  if (userAgent.startsWith("pnpm")) {
    return "pnpm" as const
  }

  if (userAgent.startsWith("bun")) {
    return "bun" as const
  }

  return "npm" as const
}
