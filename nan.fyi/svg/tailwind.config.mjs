/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin"
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
        sans: ['Urbanist', ...defaultTheme.fontFamily.sans],
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
		},
	},
	plugins: [
		plugin(function ({ addBase }) {
      addBase({
        html: { fontSize: "22px" },
      })
    }),
	],
}
