import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "components/ui/carousel"
import { ProductCard } from "components/product-card"
import { getSimilarProducts } from "lib/meilisearch"

interface SimilarProductsSectionProps {
  slug: string
  collectionHandle: string | undefined
}

export async function SimilarProductsSection({ slug, collectionHandle }: SimilarProductsSectionProps) {
  const items = await getSimilarProducts(slug, collectionHandle)

  return (
    <section className="my-10">
      <Carousel opts={{ skipSnaps: true }}>
        <CarouselPrevious className="absolute -left-20 top-[40%] hidden xl:flex" />
        <h2 className="mb-10 text-[26px] font-medium tracking-[-0.78px]">You might also like</h2>

        <CarouselContent>
          {items.map((product, idx) => (
            <CarouselItem className="basis-1/2 md:basis-1/4" key={"featured_" + product.id + idx}>
              <ProductCard prefetch {...product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="absolute -right-20 top-[40%] hidden xl:flex" />
      </Carousel>
    </section>
  )
}
