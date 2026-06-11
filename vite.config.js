import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split vendor chunks for better caching
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react/')) {
              return 'react-vendor';
            }
            if (id.includes('react-router-dom') || id.includes('@remix-run') || id.includes('turbo')) {
              return 'router';
            }
            if (id.includes('framer-motion') || id.includes('motion-')) {
              return 'motion';
            }
            if (id.includes('i18next') || id.includes('react-i18next')) {
              return 'i18n';
            }
          }
        },
      },
    },
  },
  // Enable SPA fallback for client-side routing
  preview: {
    port: 4173,
  },
});
