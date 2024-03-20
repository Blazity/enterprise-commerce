import { isNil } from "remeda"
import { execa } from "execa"
import { existsSync, readFileSync } from "node:fs"
import path from "node:path"

export async function getSystemUserName() {
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

type FindAndReadEnvFileResult = {
  envFileContent: string
  envFilePath: string
}

export function findAndReadEnvFileSync(): FindAndReadEnvFileResult {
  let currentDirectory = process.cwd()
  const maxAttempts = 3

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const appsWebPath = path.join(currentDirectory, "apps/web")

    if (existsSync(appsWebPath)) {
      const envPath = path.join(appsWebPath, ".env.local")
      if (existsSync(envPath)) {
        return { envFileContent: readFileSync(envPath, "utf-8"), envFilePath: path.resolve(envPath) }
      } else {
        throw new Error(`.env file not found in ${appsWebPath}`)
      }
    }

    if (attempt === maxAttempts) {
      throw new Error(`Reached maximum directory traversal attempts without finding 'apps/web'.`)
    }

    currentDirectory = path.resolve(currentDirectory, "..")
  }

  throw new Error("Unexpected error")
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

function getLegibleFirstName(fullName: string) {
  const [firstName] = fullName.split(" ")
  return capitalizeFirstCharacter(firstName)
}

function capitalizeFirstCharacter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
