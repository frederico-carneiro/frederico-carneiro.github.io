import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://kiko-art-dev.github.io',
  base: '/portfolio',
  output: 'static',
  build: {
    assets: 'assets'
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});
