/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { env } from "env.mjs"
import { ImageResponse } from "next/og"

export const revalidate = 86400
export const dynamic = "force-static"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image() {
  const interRegular = fetch(new URL(`${env.LIVE_URL}/fonts/Inter-Regular.ttf`)).then((res) => res.arrayBuffer())
  const interBold = fetch(new URL(`${env.LIVE_URL}/fonts/Inter-Bold.ttf`)).then((res) => res.arrayBuffer())

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
            color: "#252525",
            left: 120,
            right: 120,
            width: "960px",
            top: 270,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            border: "4px solid black",
            height: "160px",
            borderRadius: "999px",
          }}
        >
          <svg width="64" height="64" style={{ marginLeft: "64px" }} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.1861 6.02831C2.77933 2.38683 6.51233 0.010673 10.6565 0.000137011C15.1229 -0.0222505 19.0944 2.70089 20.4867 6.74049C21.8789 10.7801 20.374 15.2133 16.7616 17.7136C13.1492 20.214 8.25463 20.2103 4.64645 17.7044L1.42917 20.7668C1.10206 21.0777 0.572137 21.0777 0.245027 20.7668C-0.0816758 20.4554 -0.0816758 19.951 0.245027 19.6397L3.36177 16.673C0.450468 13.8657 -0.407125 9.66979 1.1861 6.02831ZM2.67985 12.9396C4.01756 16.008 7.16636 18.0064 10.6565 18.0021V17.9596C15.3934 17.9539 19.2388 14.3126 19.2694 9.80395C19.274 6.48185 17.1744 3.48468 13.9508 2.21138C10.7272 0.938088 7.0151 1.63972 4.54719 3.9888C2.07927 6.33788 1.34214 9.87122 2.67985 12.9396Z"
              fill="#323232"
            />
          </svg>

          <p style={{ fontSize: "48px", marginLeft: "48px", maxWidth: "700px", maxHeight: "50px", overflow: "hidden" }}>Search products...</p>

          <svg style={{ marginLeft: "auto", marginRight: "64px" }} width="55.5" height="19.5" viewBox="0 0 37 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.56">
              <rect x="0.256836" y="4.81604" width="7.6979" height="7.6979" rx="3.84895" fill="#595959" />
              <rect x="14.2092" y="0.48584" width="7.6979" height="7.6979" rx="3.84895" fill="#9C9C9C" />
              <rect x="28.4825" y="4.81604" width="7.6979" height="7.6979" rx="3.84895" fill="#595959" />
            </g>
          </svg>
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
