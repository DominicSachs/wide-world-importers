/// <reference types="vitest" />
import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  return {
    plugins: [angular(), tsconfigPaths()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      reporters: ['default'],
      coverage: {
        provider: 'v8',
        reportOnFailure: true,
        reporter: ['json', 'html'],
        include: ['src/app/**/*.ts'],
        exclude: [
        ]
      }
    },
    define: {
      'import.meta.vitest': mode !== 'production'
    }
  };
});
