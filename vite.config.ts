import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import type { ViteUserConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node'
  }
} as ViteUserConfig);
