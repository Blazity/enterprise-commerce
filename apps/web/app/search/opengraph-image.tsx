/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { ImageResponse } from "next/og"

export const runtime = "edge"

export const revalidate = 3600

export const dynamic = "force-static"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image({ params: { slug } }: { params: { slug: string } }) {
  const interRegular = fetch(new URL("../../public/fonts/Inter-Regular.ttf", import.meta.url)).then((res) => res.arrayBuffer())
  const interBold = fetch(new URL("../../public/fonts/Inter-Bold.ttf", import.meta.url)).then((res) => res.arrayBuffer())

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
        xd
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
