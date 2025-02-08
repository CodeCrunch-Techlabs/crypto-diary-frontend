/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // environment: 'node',
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],  // Setup file (optional but recommended)
    include: ['**/__tests__/**/*.{test,spec}.{js,ts,jsx,tsx}', '**/?(*.){test,spec}.{js,ts,jsx,tsx}'],
    // ^ you can adjust the "include" glob patterns as desired
    coverage: {
      provider: "istanbul",
      reporter: ["text", "html"],
    },
  },
});
