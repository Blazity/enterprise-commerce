import { type HeroSlide, HomepageCarousel } from "components/homepage-carousel"
import { cn } from "utils/cn"
import { getProduct } from "lib/algolia"
import { getCombinationByMultiOption, getImagesForCarousel } from "utils/visual-variant-utils"

interface HeroConfigItem {
  id: string
  imageUrl: string
  imageAlt: string
  title: string
  subtitle: string
  ctaText: string
  ctaHref: string
  productHandle: string
  variantOptions: Record<string, string>
}

const heroConfig: HeroConfigItem[] = [
  {
    id: "kayak",
    imageUrl: "/hero-images/kayak.jpg",
    imageAlt: "Person kayaking on calm waters",
    title: "Adventure Awaits",
    subtitle: "Gear up for your next outdoor expedition with premium equipment",
    ctaText: "Shop Outdoor Gear",
    ctaHref: "/category/outdoor-gear",
    productHandle: "rapidrush-inflatable-whitewater-kayak",
    variantOptions: { color: "brown" },
  },
  {
    id: "parfum",
    imageUrl: "/hero-images/parfum.jpg",
    imageAlt: "Elegant woman holding luxury perfume",
    title: "Signature Scents",
    subtitle: "Discover fragrances that capture your essence",
    ctaText: "Explore Perfumes",
    ctaHref: "/category/perfumes",
    productHandle: "midnight-serenade-eau-de-parfum",
    variantOptions: { concentration: "eaudeparfum", volume: "travel" },
  },
  {
    id: "lipstick",
    imageUrl: "/hero-images/lipstick.jpg",
    imageAlt: "Model showcasing vibrant lipstick",
    title: "Bold & Beautiful",
    subtitle: "Express yourself with our premium makeup collection",
    ctaText: "Shop Lip Makeup",
    ctaHref: "/category/lip-makeup",
    productHandle: "luxelips-velvet-matte-lipstick",
    variantOptions: { color: "red" },
  },
  {
    id: "speaker",
    imageUrl: "/hero-images/speaker.jpg",
    imageAlt: "Young man with portable speaker on skateboard",
    title: "Sound On The Go",
    subtitle: "Premium audio that moves with your lifestyle",
    ctaText: "Shop Speakers",
    ctaHref: "/category/speakers",
    productHandle: "titaniumwave-thunderblast-speaker",
    variantOptions: { color: "black", connectivity: "bluetooth", size: "large" },
  },
]

export async function HeroSection({ className }: { className?: string }) {
  const productPromises = heroConfig.map((config) => getProduct(config.productHandle).catch(() => null))
  const products = await Promise.all(productPromises)

  const heroSlides: HeroSlide[] = heroConfig.map((config, index) => {
    const product = products[index]
    if (!product) {
      return {
        ...config,
        product: undefined,
      }
    }

    const variant = getCombinationByMultiOption(product.variants, config.variantOptions)

    let featuredImage = product.featuredImage
    if (variant && product.images && product.images.length > 0) {
      const colorValue = config.variantOptions.color || Object.values(config.variantOptions)[0]
      const { images, activeIndex } = getImagesForCarousel(product.images, colorValue, "Color")
      if (activeIndex > 0 && images[activeIndex]) {
        featuredImage = images[activeIndex]
      }
    }

    const enhancedProduct = {
      ...product,
      featuredImage,
      selectedVariant: variant,
      minPrice: variant?.price?.amount || product.minPrice,
    }

    return {
      ...config,
      product: enhancedProduct,
    }
  })

  return (
    <div className={cn("mb-8 w-full sm:mb-12 lg:mb-16", className)}>
      <HomepageCarousel slides={heroSlides} />
    </div>
  )
}
