import { defineConfig } from 'astro/config';

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
  }
});
