import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

/**
 * Konfigurasi PWA Sahid Tani.
 *
 * Prinsipnya: pemasangan app harus ringan, jadi hanya berkas kecil (HTML, JS,
 * CSS, ikon, logo) yang dipra-cache saat service worker dipasang. Foto besar
 * (folder public/paket, public/projek, tentang*.jpg) dan foto produk dari
 * Supabase Storage baru disimpan ke cache saat memang dibuka.
 */
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        id: '/',
        name: 'Sahid Tani — Pusat Bibit Buah Unggul',
        short_name: 'Sahid Tani',
        description:
          'Bibit buah unggul dari Salatiga: durian, alpukat, mangga, jeruk, dan lainnya. Lihat katalog, harga, dan cara tanamnya.',
        lang: 'id',
        dir: 'ltr',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        display_override: ['standalone', 'minimal-ui'],
        orientation: 'portrait-primary',
        // Warna splash & bilah status mengikuti tema terang situs.
        background_color: '#f6f3ea',
        theme_color: '#156a3e',
        categories: ['shopping', 'business', 'lifestyle'],
        icons: [
          { src: '/icons/pwa-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icons/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          {
            src: '/icons/maskable-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/icons/maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        shortcuts: [
          { name: 'Katalog bibit', short_name: 'Katalog', url: '/produk' },
          { name: 'Hubungi kami', short_name: 'Kontak', url: '/kontak' },
        ],
      },
      workbox: {
        // Jangan pra-cache foto besar (jpg/jpeg) agar pemasangan tetap ringan.
        globPatterns: ['**/*.{js,css,html,ico,svg,woff,woff2,png}'],
        navigateFallback: '/index.html',
        // Panggilan API jangan pernah dijawab index.html.
        navigateFallbackDenylist: [/^\/api\//],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            // Foto produk dari Supabase Storage (termasuk endpoint pengecilan
            // /render/image). Sekali diunduh, foto langsung tampil walau
            // jaringan lambat atau mati.
            urlPattern:
              /^https:\/\/[a-z0-9-]+\.supabase\.co\/storage\/v1\/(render\/image|object)\//i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'foto-produk',
              expiration: {
                maxEntries: 150,
                maxAgeSeconds: 60 * 60 * 24 * 30,
                purgeOnQuotaError: true,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Data katalog (produk & kategori): selalu coba jaringan dulu,
            // salinan terakhir dipakai kalau koneksi gagal.
            urlPattern: /^https:\/\/[a-z0-9-]+\.supabase\.co\/rest\/v1\/(products|categories)\b/i,
            handler: 'NetworkFirst',
            method: 'GET',
            options: {
              cacheName: 'data-katalog',
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24,
                purgeOnQuotaError: true,
              },
              cacheableResponse: { statuses: [200] },
            },
          },
          {
            // Sisa foto (folder public: tentang, projek, paket, banner).
            urlPattern: /\.(?:jpg|jpeg|png|webp|avif)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'foto-halaman',
              expiration: {
                maxEntries: 80,
                maxAgeSeconds: 60 * 60 * 24 * 30,
                purgeOnQuotaError: true,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      // Service worker hanya aktif di build produksi, bukan saat `npm run dev`.
      devOptions: { enabled: false },
    }),
  ],
  server: {
    // Kalau watching bikin layar berkedip, jalankan dev dengan DISABLE_HMR=true.
    hmr: process.env.DISABLE_HMR !== 'true',
  },
});
