import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 900, // Adjust chunk size warning limit
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const parts = id.split('node_modules/');
            if (parts.length > 1) {
              const module = parts[1].split('/')[0];

              // Group specific libraries like three.js and d3 into one vendor chunk
              if (module === 'three' || module === 'd3') {
                return 'vendor'; // These libraries are bundled together
              }

              // Return the module name to split other libraries into their own chunks
              return module;
            }
          }
        },
      },
    },
  },
});
