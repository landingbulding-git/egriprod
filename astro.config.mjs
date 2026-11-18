import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  adapter: vercel(), // pages stay static unless they set prerender = false
  integrations: [react()],
  build: { inlineStylesheets: 'always' },
  vite: { plugins: [tailwindcss()] },
});
