import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '~': resolve(__dirname),
      '@': resolve(__dirname),
      '~~': resolve(__dirname),
      '@@': resolve(__dirname),
      'assets': resolve(__dirname, 'assets'),
      'public': resolve(__dirname, 'public'),
      '~/assets': resolve(__dirname, 'assets'),
      '@/assets': resolve(__dirname, 'assets'),
    }
  },
  test: {
    environment: 'nuxt', 
    globals: true,
    css: true,
  }
})