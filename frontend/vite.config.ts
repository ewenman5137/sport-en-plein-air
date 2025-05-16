import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Remplace par l'URL de ton backend local
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // garde le /api
      },
    },
  },
});
