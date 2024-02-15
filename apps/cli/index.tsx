#!/usr/bin/env node

import * as commander from "commander"
import { render } from "ink"
import { getPackageManager, getSystemUserName } from "./helpers/system"

import { App } from "./app"
import { Sync } from "./sync"

const program = new commander.Command()

program.helpOption(false)

program.name("@next-i18n/cli").description("Next.js Translation CLI").version("0.0.0")

program.command("index", { isDefault: true, hidden: true }).action(async () => {
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
})

program
  .command("sync")
  .description("migrate all of your products to Shopify and enable incremental migration for future product updates")
  .action(() => {
    render(<Sync />)
  })

program.parse()
