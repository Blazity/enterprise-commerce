#!/usr/bin/env node

import { render } from "ink"
import { getPackageManager, getUserName } from "@enterprise-commerce/tui/helpers/system"

import { App } from "./app"

async function main() {
  const systemUserName = await getUserName()
  const packageManager = getPackageManager()
  render(<App systemUserName={systemUserName} packageManager={packageManager} />)
}

main()
