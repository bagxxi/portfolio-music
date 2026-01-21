import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";

// Load environment variables for both dev and build
const { PUBLIC_JAMENDO_CLIENT_ID } = loadEnv(
  process.env.NODE_ENV || 'development',
  process.cwd(),
  ''
);

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte(), react()],
  output: 'static',
  vite: {
    define: {
      // Force Vite to replace this at build time for client-side code
      // This ensures the API key is available in React components with client:load
      'import.meta.env.PUBLIC_JAMENDO_CLIENT_ID': JSON.stringify(
        PUBLIC_JAMENDO_CLIENT_ID || process.env.PUBLIC_JAMENDO_CLIENT_ID || ''
      )
    }
  }
});