import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  adapter: vercel(), // pages stay static unless they set prerender = false
  integrations: [react()],
  // The only POST is the review login form, which changes no state, and Astro's origin check
  // rejects it when the site is reached through a proxy or alias domain.
  security: { checkOrigin: false },
  build: { inlineStylesheets: 'always' },
  vite: { plugins: [tailwindcss()] },
});
