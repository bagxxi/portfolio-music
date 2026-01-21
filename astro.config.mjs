import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte(), react()],
  output: 'static',
  vite: {
    define: {
      // Force Vite to replace this at build time for client-side code
      'import.meta.env.PUBLIC_JAMENDO_CLIENT_ID': JSON.stringify(process.env.PUBLIC_JAMENDO_CLIENT_ID || '')
    }
  }
});