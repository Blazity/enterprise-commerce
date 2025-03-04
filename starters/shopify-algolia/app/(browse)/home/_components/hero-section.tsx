import { Button } from "components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { cn } from "utils/cn"

export function HeroSection({ title, className }: { title: string; className?: string }) {
  return (
    <div className={cn("mx-auto my-12 flex w-full max-w-container-md flex-col-reverse items-center lg:flex-row lg:justify-center", className)}>
      <div className="shrink">
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
      </div>
      <div className="flex max-w-lg shrink-0 flex-col items-center space-y-4 px-8 lg:items-start lg:space-y-8">
        <h1 className="text-center text-3xl font-semibold tracking-tight lg:text-left lg:text-4xl">{"Shop the best Deals on Top Brands & Unique Finds"}</h1>
        <p className="text-center text-lg lg:text-left">{title}</p>
        <Link href="/search" prefetch={false} aria-label="Search products">
          <Button size="lg" role="link" className="transition-transform hover:scale-105">
            Shop now
          </Button>
        </Link>
      </div>
    </div>
  )
}
