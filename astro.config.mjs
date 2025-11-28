// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';

// https://astro.build/config

export default defineConfig({
  vite: {
    // @ts-ignore
    plugins: tailwindcss(),
    resolve: {
      alias: {
        "@assets": "./src/assets",
      },
    },
  },

  // this thing below is for adapting to express
  // output: 'server',
  // adapter: node({
  //   mode: 'middleware',  // enables using Astro as middleware in Express
  // }),
  //until here

  integrations: [react()],
});