import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        offers: './offers.html',
        metaAds: './meta-ads.html',
        design: './design.html',
        videoEditing: './video-editing.html',
      },
    },
  },
})

