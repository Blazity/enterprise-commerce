"use client"

import { PlatformProduct } from "@enterprise-commerce/core/platform/types"
import { useIntersectionObserver } from "@uidotdev/usehooks"
import dynamic from "next/dynamic"
import { getCombination, getOptionsFromUrl } from "utils/productOptionsUtils"
import { AddToCartButtonSkeleton, FaqSectionSkeleton, VariantsSectionSkeleton } from "./PageSkeleton"
import { useRef } from "react"

const VariantsSection = dynamic(() => import("views/Product/VariantsSection").then((mod) => mod.VariantsSection), { loading: VariantsSectionSkeleton })
const AddToCartButton = dynamic(() => import("views/Product/AddToCartButton").then((module) => module.AddToCartButton), { loading: AddToCartButtonSkeleton })
const FaqSection = dynamic(() => import("views/Product/FaqSection").then((module) => module.FaqSection), { loading: FaqSectionSkeleton })

export function DetailsSection({ product, slug }: { product: PlatformProduct; slug: string }) {
  const hasLoaded = useRef(false)
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  })

  const { color, size } = getOptionsFromUrl(slug)
  const hasOnlyOneVariant = product.variants.length <= 1
  const combination = getCombination(product, color, size)

  if (!hasLoaded.current && entry?.isIntersecting) {
    hasLoaded.current = true
  }

  const variantsSectionMarkup = hasLoaded.current ? <VariantsSection flatOptions={product.flatOptions} variants={product.variants} /> : null

  return (
    <div ref={ref} className="w-full">
      {hasOnlyOneVariant ? null : variantsSectionMarkup}
      {hasLoaded.current ? <AddToCartButton className="my-8" combination={combination} /> : null}
      {hasLoaded.current ? <FaqSection className="mt-12" /> : null}
    </div>
  )
}
