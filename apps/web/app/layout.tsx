import "./globals.css"
import "@enterprise-commerce/design-system/styles.css"

import { Header } from "components/ui/Header"
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
