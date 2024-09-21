/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin"
import defaultTheme from "tailwindcss/defaultTheme"

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      extend: {
        transitionDelay: {
          "200ms": "2000ms",
        },
        transitionProperty: {
          translate: "transform",
          rotate: "transform",
        },
      },
      fontFamily: {
        sans: ["Urbanist", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "border": "hsl(var(--border))",
        "input": "hsl(var(--input))",
        "ring": "hsl(var(--ring))",
        "link": "hsl(var(--link))",
        "link-hover": "hsl(var(--link-hover))",
        "background": "hsl(var(--background))",
        "foreground": "hsl(var(--foreground))",
        "primary": {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        "secondary": {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100ch", // add required value here
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(function ({ addBase }) {
      addBase({
        html: { fontSize: "22px" },
      })
    }),
  ],
}
