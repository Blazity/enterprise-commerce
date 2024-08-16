import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  darkMode: "class",
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      keyframes: {
        slideInLeft: {
          "0%": { marginLeft: "-283px", visibility: "visible" },
          "100%": { marginLeft: "0px" },
        },
        slideOutLeft: {
          "0%": { marginLeft: "0px" },
          "100%": { marginLeft: "-283px", visibility: "hidden" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        bounceOnce: {
          "0%": {
            transform: "scale(1)",
          },
          "100%": {
            transform: "scale(1)",
          },
          "30%": {
            transform: "scale(1.2)",
          },
          "60%": {
            transform: "scale(0.8)",
          },
          "80%": {
            transform: "scale(1.1)",
          },
        },
      },
      animation: {
        slideOutLeft: "slideOutLeft 0.3s ease-out forwards",
        slideInLeft: "slideInLeft 0.3s ease-in forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "single-bounce": "bounceOnce 0.5s ease-out",
        wiggle: "wiggle .2s ease-out",
      },
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      fontFamily: {
        body: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      borderWidth: {
        DEFAULT: "1px",
        0: "0",
        2: "2px",
        3: "3px",
        4: "4px",
        6: "6px",
        8: "8px",
      },
      minHeight: {
        ...defaultTheme.height,
      },
      maxWidth: {
        ...defaultTheme.width,
        "container-lg": "1440px",
        "container-md": "1280px",
        "container-sm": "1024px",
      },
      minWidth: {
        ...defaultTheme.width,
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
}
export default config
