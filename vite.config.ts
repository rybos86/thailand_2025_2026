import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/thailand_2025_2026/',
  define: {
    // Toto zabezpečí, že process.env.API_KEY nebude v prehliadači "undefined",
    // ale nahradí sa hodnotou z prostredia, v ktorom beží build (napr. GitHub Actions)
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
});