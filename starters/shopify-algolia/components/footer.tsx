import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="text-muted-foreground border-t bg-white">
      <div className="mx-auto max-w-container-md px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-primary text-lg font-semibold">Newsletter</h3>
            <p>Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="space-y-2 sm:max-w-md">
              <Input type="email" placeholder="Enter your email" aria-label="Email for newsletter" />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </div>
          </div>
          <div className="flex justify-center gap-24 sm:justify-end">
            <div className="space-y-4">
              <h3 className="text-primary text-lg font-semibold">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/search" className="transition-colors hover:text-orange-500" prefetch={false}>
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/category/electronics" className="transition-colors hover:text-orange-500" prefetch={false}>
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link href="/category/fashion" className="transition-colors hover:text-orange-500" prefetch={false}>
                    Fashion
                  </Link>
                </li>
                <li>
                  <Link href="/category/Retro" className="transition-colors hover:text-orange-500" prefetch={false}>
                    Retro
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-primary text-lg font-semibold">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:contact@blazity.com" className="transition-colors hover:text-orange-500">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="https://discord.gg/fyWtyNKmfiX" className="transition-colors hover:text-orange-500">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-muted-foreground/20 mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/blazity" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <FacebookIcon className="size-6" />
              </a>
              <a href="https://twitter.com/blazity" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <TwitterIcon className="size-6" />
              </a>
              <a href="https://instagram.com/blazitysoftware" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <InstagramIcon className="size-6 text-white" />
              </a>
              <a href="https://www.youtube.com/channel/UCYDeWaSWiOHn_lUHY-u1VYw/videos" className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
                <YoutubeIcon className="size-6 text-white" />
              </a>
              <a href="https://www.linkedin.com/company/blazity" className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
                <LinkedinIcon className="size-6" />
              </a>
            </div>
            <div className="text-sm">© {new Date().getFullYear()} Blazity Enterprise Commerce.</div>
          </div>
          <div className="mt-4 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <Link
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary mt-4 flex items-center space-x-2 transition-colors"
              prefetch={false}
            >
              <svg height="20" viewBox="0 0 283 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="currentColor"
                  d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM248.72 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM200.24 34c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9V5h9zM36.95 0L73.9 64H0L36.95 0zm92.38 5l-27.71 48L73.91 5H84.3l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10V51h-9V17h9v9.2c0-5.08 5.91-9.2 13.2-9.2z"
                />
              </svg>
              <span>Powered by Vercel</span>
            </Link>
            <Link
              href="https://v0.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="focus:ring-ring mb-4 inline-flex w-fit items-center whitespace-nowrap rounded-full border border-transparent bg-black px-2.5 py-0.5 text-xs font-semibold text-white transition-colors hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
              prefetch={false}
            >
              Designed with v0
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  )
}
