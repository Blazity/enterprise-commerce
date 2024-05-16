"use server"

import { reviewsClient } from "clients/reviews"
import type { ProductReviewBody } from "@enterprise-commerce/reviews"

import { headers } from "next/headers"

export const submitReview = async (payload: Omit<ProductReviewBody, "ip_addr">) => {
  try {
    const ipAddress = headers().get("x-forwarded-for") || null
    await reviewsClient.createProductReview({ ...payload, ip_addr: ipAddress })
  } catch (err) {
    throw new Error(err)
  }
}
