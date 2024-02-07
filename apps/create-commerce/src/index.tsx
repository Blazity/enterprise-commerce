#!/usr/bin/env node

import { render } from "ink"
import { getPackageManager, getSystemUserName } from "@enterprise-commerce/tui/helpers/system"

import { App } from "./app"

async function main() {
  const systemUserName = await getSystemUserName()
  const packageManager = getPackageManager()

  render(
    <App
      systemData={{
        systemUserName,
        packageManager,
      }}
    />
  )
}

main()
