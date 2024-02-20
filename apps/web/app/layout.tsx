import "./globals.css"
import "@enterprise-commerce/design-system/styles.css"

import { Header } from "components/Header"
import { Navbar } from "components/Navbar"
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {/* <Header /> */}
        {children}
      </body>
    </html>
  )
}
