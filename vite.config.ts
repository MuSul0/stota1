import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['pg'], // pg wird im Browser nicht benötigt
  },
  define: {
    global: {}, // Für pg Kompatibilität
  },
});