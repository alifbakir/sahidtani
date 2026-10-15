import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

/** Ikuti pilihan pengguna, kalau belum pernah memilih ikuti setelan sistem. */
function bacaTemaAwal(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const tersimpan = localStorage.getItem(STORAGE_KEY);
    if (tersimpan === 'dark') return true;
    if (tersimpan === 'light') return false;
  } catch {
    // localStorage bisa diblokir; abaikan saja
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Tema terang/gelap untuk seluruh aplikasi (toko maupun panel admin).
 * Kelas .dark dipasang di <html> supaya token warna di index.css ikut berubah.
 */
export function useTheme() {
  const [isDark, setIsDark] = useState(bacaTemaAwal);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    try {
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    } catch {
      // gagal menyimpan bukan masalah besar
    }
  }, [isDark]);

  // Ikut berubah kalau tema diganti di tab lain.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY || !event.newValue) return;
      setIsDark(event.newValue === 'dark');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggle = useCallback(() => setIsDark((v) => !v), []);

  return { isDark, toggle };
}
