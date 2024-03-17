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

export default async function Image() {
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
        <svg
          style={{ fontSize: "80px", textAlign: "center", fontWeight: "bold", left: "50%", transform: "translateX(-50%) scale(3.0)", top: 120 }}
          width="105"
          height="34"
          viewBox="0 0 105 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M47.4443 13.7778V12.9444L47.7221 12.6667H48.5554L51.611 15.7222L54.6666 12.6667H55.4999L55.7777 12.9444V13.7778L52.7221 16.8333L55.7777 19.8889V20.7222L55.4999 21H54.6666L51.611 17.9444L48.5554 21H47.7221L47.4443 20.7222V19.8889L50.4999 16.8333L47.4443 13.7778Z"
            fill="#484848"
          />
          <path
            d="M10.7353 7.0319C10.7353 7.0319 16.001 9.35153 19.1112 12.7021C22.2214 16.0527 23.3392 21.7298 19.1112 25.2023C14.8832 28.6749 10.3805 25.9925 8.46844 23.7901C6.55636 21.5877 3.43914 14.764 3.43914 14.764L6.37039 16.0527L0 3.03699L11.915 9.867L10.7353 7.0319Z"
            fill="#FF5F1F"
          />
          <path
            d="M25.3333 20.1859C25.3333 25.4833 21.08 29.7777 15.8333 29.7777C10.5866 29.7777 6.33333 25.4833 6.33333 20.1859C6.33333 14.8885 10.5866 10.5942 15.8333 10.5942C21.08 10.5942 25.3333 14.8885 25.3333 20.1859Z"
            fill="#FF5F1F"
          />
          <path d="M89.3704 4.44446L102.168 26.6111H76.5724L89.3704 4.44446Z" fill="black" />
        </svg>
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
