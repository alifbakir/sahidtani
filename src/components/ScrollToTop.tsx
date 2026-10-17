import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { gulirKe, gulirKeAtas } from '../lib/gulir';

/**
 * Posisi gulir terakhir tiap halaman. Dipakai supaya tombol "kembali" di
 * browser mengembalikan pembeli ke tempat semula di katalog, bukan ke atas.
 */
const posisiTerakhir = new Map<string, number>();

/**
 * Kembalikan posisi gulir setelah halaman baru selesai digambar. Katalog
 * memuat produk dari server, jadi tinggi halaman bisa belum cukup saat
 * pertama dicoba — diulang sampai posisinya tenang (maksimal 2,5 detik).
 * Begitu pembeli menggeser sendiri, upaya pemulihan dihentikan.
 */
function pulihkanPosisi(tujuan: number) {
  const mulai = performance.now();
  let berhenti = false;
  let tinggiTerakhir = -1;
  let stabil = 0;

  const hentikan = () => {
    berhenti = true;
  };
  const bersihkan = () => {
    window.removeEventListener('wheel', hentikan);
    window.removeEventListener('touchstart', hentikan);
    window.removeEventListener('keydown', hentikan);
  };
  window.addEventListener('wheel', hentikan, { passive: true });
  window.addEventListener('touchstart', hentikan, { passive: true });
  window.addEventListener('keydown', hentikan);

  const coba = () => {
    const lewat = performance.now() - mulai;
    if (berhenti || lewat > 2500) {
      bersihkan();
      return;
    }
    // Diulang terus, bukan berhenti saat posisi cocok: katalog yang baru
    // dimuat bisa bertambah tinggi setelahnya, dan posisi gulir bisa bergeser
    // sehingga pembeli mendarat di tempat salah.
    gulirKe(tujuan);

    const tinggi = document.documentElement.scrollHeight;
    const pas = Math.abs(window.scrollY - tujuan) <= 2;
    stabil = tinggi === tinggiTerakhir && pas ? stabil + 1 : 0;
    tinggiTerakhir = tinggi;
    // Baru berhenti setelah posisinya tenang cukup lama (≈160 ms) dan minimal
    // 500 ms berlalu, supaya daftar produk yang datang belakangan tidak
    // menggeser halaman lagi.
    if (stabil >= 10 && lewat > 500) {
      bersihkan();
      return;
    }

    // setTimeout, bukan requestAnimationFrame: rAF berhenti saat tab tidak
    // terlihat, sedangkan pemulihan posisi harus tetap jalan.
    window.setTimeout(coba, 16);
  };
  coba();
}

/**
 * Mengatur posisi gulir saat berpindah halaman:
 * - buka halaman baru (klik produk, menu, dsb) → langsung dari paling atas;
 * - tombol kembali browser → kembali ke posisi terakhir di halaman itu.
 */
const ScrollToTop = () => {
  const { pathname, state } = useLocation();
  const tipeNavigasi = useNavigationType();
  const halaman = useRef<{ path: string | null; y: number }>({ path: null, y: 0 });

  // Tautan "Kembali ke katalog" boleh meminta posisi gulir lama dipulihkan,
  // supaya pembeli kembali ke tempat semula di katalog.
  const mintaPulihkan = Boolean((state as { pulihkanGulir?: boolean } | null)?.pulihkanGulir);

  // Catat posisi gulir halaman yang sedang terbuka.
  // Posisi TIDAK ditulis saat efek dibersihkan: pada saat itu halaman sudah
  // digulirkan ke atas, jadi yang tercatat akan 0 dan posisi asli hilang.
  useEffect(() => {
    const catat = () => {
      if (halaman.current.path === pathname) halaman.current.y = window.scrollY;
    };
    catat();
    window.addEventListener('scroll', catat, { passive: true });
    // Pendengar scroll saja tidak cukup: di tab yang tidak terlihat browser
    // menahan event scroll, sehingga posisi terakhir tidak pernah tercatat.
    const pengintai = window.setInterval(catat, 300);
    return () => {
      window.removeEventListener('scroll', catat);
      window.clearInterval(pengintai);
    };
  }, [pathname]);

  useLayoutEffect(() => {
    // Muat pertama: biarkan browser yang menentukan (mis. membuka tautan
    // dengan #anchor atau memulihkan posisi setelah refresh).
    if (halaman.current.path === null) {
      halaman.current = { path: pathname, y: window.scrollY };
      return;
    }
    if (halaman.current.path === pathname) return;

    // Simpan posisi halaman yang ditinggalkan SEBELUM digulirkan ke atas.
    posisiTerakhir.set(halaman.current.path, halaman.current.y);
    halaman.current = { path: pathname, y: 0 };

    if (tipeNavigasi === 'POP' || mintaPulihkan) {
      const tujuan = posisiTerakhir.get(pathname);
      if (tujuan !== undefined && tujuan > 0) {
        pulihkanPosisi(tujuan);
        return;
      }
    }

    gulirKeAtas();
  }, [pathname, tipeNavigasi, mintaPulihkan]);

  return null;
};

export default ScrollToTop;
