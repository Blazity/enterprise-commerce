"use client"

import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { useIntersectionObserver } from "@uidotdev/usehooks"
import dynamic from "next/dynamic"
import { getCombination, getOptionsFromUrl } from "utils/productOptionsUtils"
import { AddToCartButtonSkeleton, FaqSectionSkeleton, VariantsSectionSkeleton } from "./PageSkeleton"

const VariantsSection = dynamic(() => import("views/Product/VariantsSection").then((mod) => mod.VariantsSection), { loading: VariantsSectionSkeleton })
const AddToCartButton = dynamic(() => import("views/Product/AddToCartButton").then((module) => module.AddToCartButton), { loading: AddToCartButtonSkeleton })
const FaqSection = dynamic(() => import("views/Product/FaqSection").then((module) => module.FaqSection), { loading: FaqSectionSkeleton })

export function DetailsSection({ product, slug }: { product: PlatformProduct; slug: string }) {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  })

  const { color, size } = getOptionsFromUrl(slug)
  const hasOnlyOneVariant = product.variants.length <= 1
  const combination = getCombination(product, color, size)

  const variantsSectionMarkup = entry?.isIntersecting ? <VariantsSection flatOptions={product.flatOptions} variants={product.variants} /> : null

  return (
    <div ref={ref} className="w-full">
      {hasOnlyOneVariant ? null : variantsSectionMarkup}
      {entry?.isIntersecting ? <AddToCartButton className="my-8" combination={combination} /> : null}
      {entry?.isIntersecting ? <FaqSection className="mt-12" /> : null}
    </div>
  )
}
