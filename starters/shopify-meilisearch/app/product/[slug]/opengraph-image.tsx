/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { ImageResponse } from "next/og"
import { removeOptionsFromUrl } from "utils/product-options-utils"
import { env } from "env.mjs"
import { getProduct } from "lib/meilisearch"

export const revalidate = 86400

export const dynamic = "force-static"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image({ params: { slug } }: { params: { slug: string } }) {
  const interRegular = fetch(new URL(`${env.LIVE_URL}/fonts/Inter-Regular.ttf`)).then((res) => res.arrayBuffer())
  const interBold = fetch(new URL(`${env.LIVE_URL}/fonts/Inter-Bold.ttf`)).then((res) => res.arrayBuffer())

  const product = await getProduct(removeOptionsFromUrl(slug))

  return new ImageResponse(
    (
      <div
        style={{
          border: "10px solid black",
          display: "flex",
          height: "100%",
          width: "100%",
          fontWeight: 400,
          background: "white",
        }}
      >
        <div
          style={{
            left: 120,
            top: 40,
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
            top: 490,
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

        <div
          style={{
            height: "145px",
            overflow: "hidden",
            maxWidth: "450px",
            fontWeight: 400,
            fontSize: "48px",
            lineHeight: 1,
            position: "absolute",
            left: 600,
            top: 40,
            letterSpacing: "-0.05em",
          }}
        >
          {product?.title}
        </div>

        <div
          style={{
            height: "180px",
            overflow: "hidden",
            maxWidth: "500px",
            fontWeight: 400,
            fontSize: "21px",
            position: "absolute",
            left: 600,
            color: "#565656",
            top: 230,
          }}
        >
          {product?.description}
        </div>
        <div style={{ fontSize: "70px", fontWeight: 900, lineHeight: 1, position: "absolute", left: 600, bottom: 60, textAlign: "left", letterSpacing: "-0.05em" }}>
          {product?.priceRange.minVariantPrice.amount + " " + product?.priceRange.minVariantPrice.currencyCode}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: await interRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "Inter",
          data: await interBold,
          style: "normal",
          weight: 900,
        },
      ],
    }
  )
}
