import { Button } from "components/Button/ButtonNew"
import Image from "next/image"
import Link from "next/link"
import { cn } from "utils/cn"

export function HeroSection({ title, className }: { title: string; className?: string }) {
  return (
    <div className={cn("max-w-container-sm mx-auto my-12 flex w-full flex-col-reverse items-center md:flex-row", className)}>
      <Image
        width={650}
        height={650}
        className="rounded-l-lg"
        sizes="(max-width: 768px) 80vw, 650px"
        alt="Homepage featured image"
        priority
        src="/hero.png"
        style={{
          color: "transparent",
          objectFit: "cover",
        }}
      />
      <div className="flex max-w-md flex-col items-center space-y-4 px-8 md:items-end md:space-y-8">
        <h1 className="text-center text-3xl font-semibold tracking-tight md:text-right md:text-4xl">{title}</h1>
        <p className="text-center text-lg md:text-right">From everyday essentials to rare gems, we’ve got something for everyone.</p>
        <Link href="/search" prefetch={false} aria-label="Search products">
          <Button size="lg" role="link" className="transition-transform hover:scale-105">
            Shop now
          </Button>
        </Link>
      </div>
    </div>
  )
}
