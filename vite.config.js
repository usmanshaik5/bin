import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const parts = id.split('node_modules/');
            if (parts.length > 1) {
              const module = parts[1].split('/')[0];
              // Group specific libraries together
              if (module === 'three' || module === 'd3') {
                return 'vendor'; // All three and d3 libraries go into one chunk
              }
              return module; // Other libraries are split into their own chunks
            }
          }
        },
      },
    },
  },
});
