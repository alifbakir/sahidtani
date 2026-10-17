/**
 * Gulir halaman tanpa animasi.
 *
 * `html { scroll-behavior: smooth }` di index.css membuat `window.scrollTo`
 * DAN penyetelan `scrollTop` ikut beranimasi (behavior "auto" mengikuti nilai
 * scroll-behavior). Akibatnya saat pindah halaman pembeli melihat halaman
 * produk "menggulir sendiri" dari tengah. Karena itu scroll-behavior-nya
 * dimatikan sesaat lewat inline style, gulir dijalankan, lalu dikembalikan.
 */
function tanpaAnimasi(aksi: () => void) {
  const html = document.documentElement;
  const asal = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';
  aksi();
  html.style.scrollBehavior = asal;
}

/** Langsung tampil dari paling atas halaman. */
export function gulirKeAtas() {
  gulirKe(0);
}

/** Langsung lompat ke posisi gulir tertentu. */
export function gulirKe(posisi: number) {
  const atas = Math.max(0, posisi);
  tanpaAnimasi(() => {
    window.scrollTo({ top: atas, left: 0, behavior: 'instant' });
    // Cadangan kalau browser ini belum mengenal 'instant'.
    document.documentElement.scrollTop = atas;
    document.body.scrollTop = atas;
  });
}
