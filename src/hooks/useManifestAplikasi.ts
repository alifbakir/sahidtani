import { useEffect } from 'react';

/**
 * Ganti manifest PWA sesuai area yang sedang dibuka.
 *
 * Toko dan panel admin sengaja jadi dua aplikasi terpisah: manifest toko punya
 * id/start_url "/", sedangkan manifest admin punya id/start_url "/admin".
 * Chrome memakai id itu untuk membedakan aplikasi, jadi keduanya bisa dipasang
 * berdampingan dan muncul sebagai dua ikon di layar utama.
 *
 * Tag <link rel="manifest"> diisi oleh vite-plugin-pwa saat build, jadi di sini
 * kita hanya menukar nilainya saat masuk/keluar area admin, lalu dikembalikan
 * seperti semula.
 */
export function useManifestAplikasi(href: string): void {
  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>('link[rel="manifest"]');
    if (!link) return;

    const hrefAsli = link.getAttribute('href') ?? '/manifest.webmanifest';
    const ikon = document.querySelector<HTMLLinkElement>('link[rel="apple-touch-icon"]');
    const ikonAsli = ikon?.getAttribute('href') ?? '/icons/apple-touch-icon.png';
    const judul = document.querySelector<HTMLMetaElement>('meta[name="apple-mobile-web-app-title"]');
    const judulAsli = judul?.getAttribute('content') ?? 'Sahid Tani';

    link.setAttribute('href', href);

    if (href === '/admin.webmanifest') {
      ikon?.setAttribute('href', '/icons/admin-apple-touch-icon.png');
      judul?.setAttribute('content', 'Sahid Tani Admin');
    }

    return () => {
      link.setAttribute('href', hrefAsli);
      ikon?.setAttribute('href', ikonAsli);
      judul?.setAttribute('content', judulAsli);
    };
  }, [href]);
}
