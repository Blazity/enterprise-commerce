import { Button } from "components/Button/Button"
import Image from "next/image"
import Link from "next/link"

export function HeroSection({ title }: { title: string }) {
  return (
    <div className="max-w-container-lg mx-auto flex w-full flex-col-reverse justify-between lg:flex-row">
      <div className="shrink-1 flex basis-1/2 items-center justify-center bg-neutral-100 p-36">
        <Image width={400} height={400} sizes="400px" alt="Homepage featured image" priority src={"/default-product-image.svg"} />
      </div>
      <div className="flex basis-1/2 flex-col items-center justify-start gap-16 px-4 py-20 md:items-start md:p-36">
        <h1 className="text-center text-[23px]/[24px] tracking-tighter sm:text-[77px]/[79px] md:text-left">{title}</h1>
        <Link href="/search" prefetch={false}>
          <Button size="xl" variant="secondary" className="py-[28px] text-[23px]/[18px]">
            Shop Now
          </Button>
        </Link>
      </div>
    </div>
  )
}
