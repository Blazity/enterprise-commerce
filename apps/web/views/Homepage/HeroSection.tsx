import { Button } from "components/Button"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="max-w-container-lg mx-auto flex w-full flex-col-reverse justify-between lg:flex-row">
      <div className="shrink-1 flex basis-1/2 items-center justify-center bg-neutral-100 p-36">
        <Image width={400} height={400} sizes="400px" alt="Homepage featured image" priority src={"/default-product-image.svg"} />
      </div>
      <div className="flex basis-1/2 flex-col items-center justify-start gap-16 px-4 py-20 md:items-start md:p-36">
        <h1 className="text-center text-5xl font-bold tracking-tighter sm:text-7xl md:text-left md:text-8xl">Your daily trendsetting deals</h1>
        <Link href="/search" prefetch={false}>
          <Button size="xl" variant="secondary">
            Shop Now
          </Button>
        </Link>
      </div>
    </div>
  )
}
