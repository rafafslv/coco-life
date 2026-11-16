import { defineConfig } from 'vite';
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/coco-life/' : '/',
  server: { host: '0.0.0.0' },
  build: {
    target: 'es2020',
    sourcemap: false,
    rollupOptions: {
      input: ['index.html', 'prototype-3d.html']
    }
  }
});
