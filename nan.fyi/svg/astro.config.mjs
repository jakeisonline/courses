import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: "static",
  integrations: [mdx({
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "poimandres",
      },
    }),, react(), tailwind()]
});
