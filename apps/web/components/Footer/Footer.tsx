import Link from "next/link"

export function Footer() {
  return (
    <div className="bg-black text-white">
      <div className="max-w-container-md mx-auto flex w-full flex-col justify-between px-4 xl:px-0">
        <header className="flex justify-end gap-4 pt-8">
          <a rel="noreferrer" target="_blank" href={"https://www.facebook.com/blazity/"} aria-label="Facebook link">
            <FacebookIcon className="text-white" />
          </a>

          <a rel="noreferrer" target="_blank" href={"https://twitter.com/blazity"} aria-label="Twitter link">
            <TwitterIcon className="text-white" />
          </a>

          <a rel="noreferrer" target="_blank" href={"https://www.instagram.com/blazitysoftware/"} aria-label="Instagram link">
            <InstagramIcon className="text-white" />
          </a>

          <a rel="noreferrer" target="_blank" href={"https://www.linkedin.com/company/blazity"} aria-label="Linkedin link">
            <LinkedinIcon className="text-white" />
          </a>

          <a rel="noreferrer" target="_blank" href={"https://www.youtube.com/channel/UCYDeWaSWiOHn_lUHY-u1VYw/videos"} aria-label="Youtube link">
            <YoutubeIcon className="text-white" />
          </a>
        </header>
        <main className="py-32">
          <a href="https://v0.dev/" rel="noreferrer" target="_blank">
            <span className="focus:ring-ring mb-4 inline-flex w-fit items-center whitespace-nowrap rounded-full border border-transparent bg-white px-2.5 py-0.5 text-xs font-semibold text-black transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2">
              Designed with v0
            </span>
          </a>
          <p className="text-3xl font-bold">Missing feature? </p>
          <p className="mt-1 text-xl">
            <a className="p-1 underline" href="mailto:contact@blazity.com">
              Let us know
            </a>
            , we&apos;ll build it!
          </p>
        </main>
        <footer className="mt-auto flex flex-col items-center justify-between pb-8 text-neutral-300 md:flex-row">
          <span className="text-sm">2024 © Lorem Ipsum. All Rights Reserved.</span>
          <div className="mt-4 flex space-x-4 md:mt-0">
            <Link prefetch={false} className="text-sm hover:underline" href="/privacy-policy">
              Privacy and Cookie Policy
            </Link>
            <Link prefetch={false} className="text-sm hover:underline" href="/terms-conditions">
              Terms & Conditions
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function LinkedinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

function YoutubeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  )
}
