#!/usr/bin/env node

import * as commander from "commander"
import { render } from "ink"
import { getPackageManager, getSystemUserName } from "./helpers/system"

import { App } from "./app"
import { Sync } from "./commands/sync"
import { Feature } from "./commands/feature"

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

  process.exit(0)
})

program
  .command("sync")
  .alias("s")
  .description("migrate all of your products to Shopify and enable incremental migration for future product updates")
  .action(() => {
    render(<Sync />)
  })

// const featureCommand = program
//   .command("feature")
//   .description("manage (toggle/list) product features")
//   .alias("f")
//   .alias("feat")
//   .action(() => {
//     render(<Feature />)
//   })

program.parse()
