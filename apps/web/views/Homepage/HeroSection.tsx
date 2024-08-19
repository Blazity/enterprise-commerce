import { Button } from "components/Button/Button"
import Image from "next/image"
import { cn } from "utils/cn"

export function HeroSection({ title, className }: { title: string; className?: string }) {
  return (
    <div className={cn("max-w-container-xl mx-auto flex w-full flex-col-reverse justify-between lg:flex-row", className)}>
      <div className="shrink-1 flex basis-1/2 items-center justify-center bg-neutral-100 p-36">
        <Image width={400} height={400} sizes="400px" alt="Homepage featured image" priority src={"/default-product-image.svg"} />
      </div>
      <div className="flex basis-1/2 flex-col items-center justify-start gap-16 px-4 py-20 md:items-start md:p-36">
        <h1 className="text-center text-[32px]/[32px] tracking-tighter sm:text-[77px]/[79px] md:text-left">{title}</h1>
        <a href="https://git.new/commerce" rel="noreferrer" target="_blank">
          <Button size="xl" variant="secondary" className="py-[10px] text-[21px] md:py-[28px] md:text-[23px]">
            See on GitHub
          </Button>
        </a>
      </div>
    </div>
  )
}
