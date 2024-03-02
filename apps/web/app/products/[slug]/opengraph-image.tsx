/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { getProduct } from "app/actions"
import { ImageResponse } from "next/og"
import { removeOptionsFromUrl } from "utils/productOptionsUtils"

export const runtime = "edge"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image({ params: { slug } }: { params: { slug: string } }) {
  const product = await getProduct(removeOptionsFromUrl(slug))

  const hasNoPriceRange = product?.priceRange.minVariantPrice.amount === product?.priceRange.maxVariantPrice.amount

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          fontWeight: 700,
          background: "white",
        }}
      >
        <div
          style={{
            left: 120,
            top: 60,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "380px",
            height: "430px",
            backgroundColor: "#eaeaea",
          }}
        >
          <img src={product?.featuredImage?.url} width={280} height={280} style={{ objectFit: "contain" }} />
        </div>
        <div
          style={{
            left: 120,
            top: 510,
            position: "absolute",
            display: "flex",
            width: "380px",
            height: "80px",
          }}
        >
          {product?.images
            ?.slice(0, 4)
            ?.map((image, idx) => (
              <img
                key={idx}
                style={{ marginLeft: idx !== 0 ? "10px" : "0px", backgroundColor: "#eaeaea", border: "1px solid black", padding: "5px" }}
                src={image.url}
                width={85}
                height={80}
              />
            ))}
        </div>

        <div style={{ maxWidth: "500px", fontSize: "48px", lineHeight: 1, position: "absolute", left: 600, top: 120, letterSpacing: "-0.05em" }}>{product?.title}</div>
        <div style={{ fontSize: "60px", fontWeight: "bold", lineHeight: 1, position: "absolute", left: 600, bottom: 120, textAlign: "left", letterSpacing: "-0.05em" }}>
          {product?.priceRange.minVariantPrice.amount + " " + product?.priceRange.minVariantPrice.currencyCode}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
