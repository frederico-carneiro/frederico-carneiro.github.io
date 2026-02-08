import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://frederico-carneiro.github.io',
  base: '/',
  output: 'static',

  build: {
    assets: 'assets'
  },

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },

  integrations: [sitemap({
    filter: (page) => !page.includes('/ruiner-2')
  })]
});