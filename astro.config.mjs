import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import react from "@astrojs/react";

// Load environment variables for both dev and build
const envFromFile = loadEnv(
  process.env.NODE_ENV || 'development',
  process.cwd(),
  ''
);

// Use env file value OR system env variable (for GitHub Actions/Hostinger)
const JAMENDO_API_KEY = envFromFile.PUBLIC_JAMENDO_CLIENT_ID || process.env.PUBLIC_JAMENDO_CLIENT_ID || '';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte(), react()],
  output: 'static',
  vite: {
    define: {
      // Force Vite to replace this at build time for client-side code
      'import.meta.env.PUBLIC_JAMENDO_CLIENT_ID': JSON.stringify(JAMENDO_API_KEY)
    }
  }
});