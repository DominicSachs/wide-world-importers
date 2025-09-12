/// <reference types="vitest" />
import angular from '@analogjs/vite-plugin-angular';
import { defineConfig } from 'vite';
import tsconfig from "./tsconfig.json";
import path from "path";

const alias = Object.fromEntries(
    // For Each Path in tsconfig.json
    Object.entries(tsconfig.compilerOptions.paths).map(([key, [value]]) => [
        // Remove the "/*" from the key and resolve the path
        key.replace("/*", ""),
        // Remove the "/*" from the value Resolve the relative path
        path.resolve(__dirname, value.replace("/*", ""))
    ])
);

export default defineConfig(({ mode }) => {
  return {
    plugins: [angular()],
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
    },
    resolve: {
      alias
    }
  };
});
