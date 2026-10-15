import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Kalau watching bikin layar berkedip, jalankan dev dengan DISABLE_HMR=true.
    hmr: process.env.DISABLE_HMR !== 'true',
  },
});
