import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        design: './design.html',
        metaAds: './meta-ads.html',
        offers: './offers.html',
        videoEditing: './video-editing.html',
      },
    },
  },
})

