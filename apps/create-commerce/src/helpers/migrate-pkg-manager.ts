import { getPackageManager } from "@enterprise-commerce/tui/helpers/system"

import type { PackageJson } from "type-fest"
import { readFile, writeFile } from "fs/promises"
import { isNil } from "remeda"
import glob from "fast-glob"
import path from "path"

export type PackageManager = Exclude<ReturnType<typeof getPackageManager>, "bun">

type MigratePkgManagerParams = {
  to: PackageManager
}

export async function migrateCurrentDirectoryPackageManager({ to }: MigratePkgManagerParams) {
  const from = "yarn"

  if (to === from) {
    return
  }

  const packageJsonFiles = await glob("package.json", { ignore: ["node_modules"], absolute: true })

  const packageJsonWithoutRoot = packageJsonFiles.filter((packageJsonFilePath) => !packageJsonFilePath.includes(path.join(process.cwd(), "package.json")))

  const previousLockfiles = await glob(getSpecificPackageManagerLockfile(from), {
    ignore: ["node_modules"],
    absolute: true,
  })

  const isMonorepo = packageJsonWithoutRoot.length > 1

  if (!isMonorepo) {
    await Promise.all(packageJsonFiles.map((packageJsonFilePath) => updateWorkspaceDependencies(packageJsonFilePath, to)))
  }
}

type GetNewWorkspaceDependencyVersionParams = {
  previousVersion: string
  manager: PackageManager
}

async function updateWorkspaceDependencies(filePath: string, manager: PackageManager): Promise<void> {
  const content = await readFile(filePath, "utf8")
  const packageJson = JSON.parse(content) as PackageJson

  const dependenciesFields = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"] as const

  for (const field of dependenciesFields) {
    const currentField = packageJson[field]
    if (currentField) {
      for (const key in currentField) {
        const version = currentField[key]
        if (!isNil(version)) {
          currentField[key] = getNewWorkspaceDependencyVersion({
            previousVersion: version,
            manager,
          })
        }
      }
    }
  }

  await writeFile(filePath, JSON.stringify(packageJson, null, 2), "utf8")
}

function getNewWorkspaceDependencyVersion({ previousVersion, manager }: GetNewWorkspaceDependencyVersionParams) {
  if (previousVersion === "*" && manager === "pnpm") {
    return "workspace:*"
  }

  return "*"
}

function getSpecificPackageManagerLockfile(packageManager: PackageManager) {
  switch (packageManager) {
    case "npm":
      return "package-lock.json"
    case "pnpm":
      return "pnpm-lock.yaml"
    case "yarn":
      return "yarn.lock"
  }
}
