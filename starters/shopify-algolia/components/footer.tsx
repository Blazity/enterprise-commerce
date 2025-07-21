import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-white text-muted-foreground">
      <div className="mx-auto max-w-container-md px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Newsletter</h3>
            <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="space-y-2 sm:max-w-md">
              <Input type="email" placeholder="Enter your email" aria-label="Email for newsletter" />
              <Button
                type="submit"
                className="w-full transition-[transform,background] duration-200 hover:bg-black/85 active:scale-[0.99]"
              >
                Subscribe
              </Button>
            </div>
          </div>
          <div className="flex justify-center gap-24 sm:justify-end">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/search" className="transition-colors hover:text-gray-700" prefetch={false}>
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/category/electronics" className="transition-colors hover:text-gray-700" prefetch={false}>
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link href="/category/fashion" className="transition-colors hover:text-gray-700" prefetch={false}>
                    Fashion
                  </Link>
                </li>
                <li>
                  <Link href="/category/sports-and-outdoors" className="transition-colors hover:text-gray-700" prefetch={false}>
                  Sports &amp; Outdoors
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:contact@blazity.com" className="transition-colors hover:text-gray-700">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="https://discord.gg/fyWtyNKmfiX" className="transition-colors hover:text-gray-700">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-muted-foreground/20 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/blazity"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Facebook"
              >
                <FacebookIcon className="size-6" />
              </a>
              <a
                href="https://x.com/blazity"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="X.com"
              >
                <TwitterIcon className="size-6" />
              </a>
              <a
                href="https://instagram.com/blazitysoftware"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Instagram"
              >
                <InstagramIcon className="size-6 text-white" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCYDeWaSWiOHn_lUHY-u1VYw/videos"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="YouTube"
              >
                <YoutubeIcon className="-mt-1 size-8 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/company/blazity"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="YouTube"
              >
                <LinkedinIcon className="size-6" />
              </a>
            </div>
            <div className="text-sm">© {new Date().getFullYear()} Blazity Enterprise Commerce.</div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <Link
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground transition-colors hover:text-primary"
              prefetch={false}
            >
              <svg height="20" viewBox="0 0 283 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="currentColor"
                  d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM248.72 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM200.24 34c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9V5h9zM36.95 0L73.9 64H0L36.95 0zm92.38 5l-27.71 48L73.91 5H84.3l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10V51h-9V17h9v9.2c0-5.08 5.91-9.2 13.2-9.2z"
                />
              </svg>
              <span>Hosted on Vercel</span>
            </Link>
            <Link
              href="https://v0.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 inline-flex w-fit items-center whitespace-nowrap rounded-lg border border-transparent bg-black px-5 py-1 text-sm font-medium text-white transition-colors hover:bg-black/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              prefetch={false}
            >
              Designed with <V0Icon className="ml-1 size-5 fill-white" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="black"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function V0Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" strokeLinejoin="round" {...props}>
      <title>{"Logo v0"}</title>
      <path
        fillRule="evenodd"
        d="M9.503 5.5h3.75c.06 0 .117.004.174.012L9.512 9.427A1.262 1.262 0 0 1 9.5 9.25V5.5H8v3.75A2.75 2.75 0 0 0 10.75 12h3.75v-1.5h-3.75c-.06 0-.12-.004-.177-.012L14.49 6.57c.009.059.013.119.013.18v3.75h1.5V6.75A2.75 2.75 0 0 0 13.253 4h-3.75v1.5ZM0 5v.004l5.125 6.527c.616.784 1.876.348 1.876-.649V5h-1.5v4.58L1.904 5H0Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="black" {...props}>
      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
    </svg>
  )
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="black"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={1200} height={1227} viewBox="0 0 1200 1227" fill="none" {...props}>
      <path
        fill="black"
        d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
      />
    </svg>
  )
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={800}
      height={800}
      viewBox="0 0 461.001 461.001"
      {...props}
    >
      <path
        fill="black"
        d="M365.257 67.393H95.744C42.866 67.393 0 110.259 0 163.137v134.728c0 52.878 42.866 95.744 95.744 95.744h269.513c52.878 0 95.744-42.866 95.744-95.744V163.137c0-52.878-42.866-95.744-95.744-95.744zm-64.751 169.663-126.06 60.123c-3.359 1.602-7.239-.847-7.239-4.568V168.607c0-3.774 3.982-6.22 7.348-4.514l126.06 63.881c3.748 1.899 3.683 7.274-.109 9.082z"
      />
    </svg>
  )
}
