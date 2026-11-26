import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    env: { TZ: 'Europe/Rome' },
    // Full-app render tests run in parallel workers and can exceed the 5s default.
    testTimeout: 15000,
  },
})
