import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const akar = fileURLToPath(new URL('.', import.meta.url));

/**
 * vite-plugin-pwa menyuntikkan <link rel="manifest" href="/manifest.webmanifest">
 * (manifest toko) ke SETIAP berkas HTML. Untuk admin.html itu salah: halaman
 * admin harus menunjuk manifest admin, karena iOS memakai start_url dari
 * manifest halaman yang sedang dibuka saat "Tambah ke Layar Utama".
 * Plugin kecil ini membuang suntikan tersebut khusus dari admin.html, jadi
 * yang tersisa hanya manifest admin yang ditulis sendiri di berkas itu.
 */
const adminPakaiManifestSendiri = (): Plugin => ({
  name: 'admin-pakai-manifest-sendiri',
  enforce: 'post',
  transformIndexHtml: {
    order: 'post',
    handler(html, ctx) {
      if (!ctx.filename.endsWith('admin.html')) return html;
      return html.replace(
        /<link rel="manifest" href="\/manifest\.webmanifest"[^>]*>/g,
        '<!-- manifest toko sengaja dibuang di halaman admin -->',
      );
    },
  },
});

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
          {
            name: 'Katalog bibit',
            short_name: 'Katalog',
            url: '/produk',
            icons: [{ src: '/icons/pwa-192x192.png', sizes: '192x192' }],
          },
          {
            name: 'Panel admin',
            short_name: 'Admin',
            url: '/admin',
            icons: [{ src: '/icons/admin-192x192.png', sizes: '192x192' }],
          },
        ],
      },
      workbox: {
        // Jangan pra-cache foto besar (jpg/jpeg) agar pemasangan tetap ringan.
        // webmanifest ikut supaya manifest admin tetap ada saat offline.
        globPatterns: ['**/*.{js,css,html,ico,svg,woff,woff2,png,webmanifest}'],
        // Konverter HEIC (libheif, ~3 MB) TIDAK ikut dipra-cache saat pemasangan
        // app; ia diunduh hanya kalau admin memilih foto HEIC, lalu disimpan oleh
        // rute 'konverter-heic' di runtimeCaching bawah.
        globIgnores: ['**/heic-to-*.js'],
        navigateFallback: '/index.html',
        // Navigasi ke area admin TIDAK boleh dijawab index.html (manifest toko).
        // Alasannya: iOS memakai start_url manifest dari dokumen yang benar-benar
        // dilayani, jadi /admin harus tetap sampai ke server dan menerima
        // admin.html. Rute runtimeCaching pertama di bawah yang mengurusnya.
        navigateFallbackDenylist: [/^\/api\//, /^\/admin/],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            // Halaman admin: ambil admin.html asli dari server (manifest admin),
            // salinannya disimpan supaya panel tetap terbuka saat offline.
            urlPattern: ({ request, url }: { request: Request; url: URL }) =>
              request.mode === 'navigate' &&
              (url.pathname === '/admin' || url.pathname.startsWith('/admin/')),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'halaman-admin',
              networkTimeoutSeconds: 4,
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 7,
                purgeOnQuotaError: true,
              },
              cacheableResponse: { statuses: [200] },
            },
          },
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
            // Konverter HEIC (libheif). Sekali diunduh saat admin memilih foto
            // HEIC, lalu disimpan lama supaya unggahan berikutnya instan.
            urlPattern: /\/assets\/heic-to-[^/]+\.js$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'konverter-heic',
              expiration: {
                maxEntries: 4,
                maxAgeSeconds: 60 * 60 * 24 * 365,
                purgeOnQuotaError: true,
              },
              cacheableResponse: { statuses: [0, 200] },
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
    adminPakaiManifestSendiri(),
  ],
  build: {
    rollupOptions: {
      // Dua halaman terpisah: toko (index.html) dan panel admin (admin.html).
      input: {
        main: `${akar}index.html`,
        admin: `${akar}admin.html`,
      },
    },
  },
  server: {
    // Kalau watching bikin layar berkedip, jalankan dev dengan DISABLE_HMR=true.
    hmr: process.env.DISABLE_HMR !== 'true',
  },
});
