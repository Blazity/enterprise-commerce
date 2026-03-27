import { env } from "env.mjs"
import { Metadata } from "next"
import { sharedMetadata} from "./shared-metadata"

export const metadata: Metadata = {
  metadataBase: sharedMetadata.metadataBase,
  description: sharedMetadata.openGraph.description,
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
