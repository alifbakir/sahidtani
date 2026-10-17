import { useEffect, useRef } from 'react';
import type { FC } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { fotoProdukUtuh } from '../lib/image';

interface ImageLightboxProps {
  /** Daftar URL foto yang bisa dilihat bergantian. */
  images: string[];
  /** Foto yang sedang dibuka. */
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  /** Keterangan kecil di atas foto, mis. "Foto 2 dari 4 · Bibit Durian Bawor". */
  title?: string;
}

/**
 * Pratinjau foto ukuran besar. Dipakai admin untuk memastikan foto yang
 * diunggah memang benar (tidak tertukar atau terpotong).
 *
 * Foto diminta tanpa pemotongan (hanya lebar) supaya kelihatan utuh, bukan
 * versi persegi yang dipakai kartu produk.
 */
const ImageLightbox: FC<ImageLightboxProps> = ({
  images,
  index,
  onIndexChange,
  onClose,
  title,
}) => {
  const mulaiSentuh = useRef<number | null>(null);
  const adaBanyak = images.length > 1;
  const url = images[index] ?? images[0];

  const pindah = (arah: number) => {
    const tujuan = index + arah;
    if (tujuan >= 0 && tujuan < images.length) onIndexChange(tujuan);
  };

  // Esc menutup, panah kiri/kanan berpindah foto.
  useEffect(() => {
    const tekan = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') pindah(1);
      if (event.key === 'ArrowLeft') pindah(-1);
    };
    window.addEventListener('keydown', tekan);
    return () => window.removeEventListener('keydown', tekan);
  });

  // Halaman di belakang tidak ikut tergulir selama pratinjau terbuka.
  useEffect(() => {
    const asal = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = asal;
    };
  }, []);

  if (!url) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pratinjau foto"
      onClick={onClose}
      onTouchStart={(event) => {
        mulaiSentuh.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (mulaiSentuh.current === null) return;
        const geser = event.changedTouches[0].clientX - mulaiSentuh.current;
        mulaiSentuh.current = null;
        if (Math.abs(geser) > 50) pindah(geser < 0 ? 1 : -1);
      }}
      className="fixed inset-0 z-[70] flex flex-col bg-deep/95 backdrop-blur-sm"
    >
      <div
        className="flex items-center justify-between gap-3 px-4 pb-2"
        style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
      >
        <span className="text-xs font-bold text-white/80">
          {title ?? 'Pratinjau foto'}
          {adaBanyak && ` · ${index + 1}/${images.length}`}
        </span>
        <button
          type="button"
          onClick={onClose}
          autoFocus
          aria-label="Tutup pratinjau"
          className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Klik di luar foto menutup; klik pada foto tidak. */}
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-3"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={fotoProdukUtuh(url, 1400)}
          alt={title ?? 'Foto produk'}
          className="max-h-full max-w-full rounded-xl object-contain"
          referrerPolicy="no-referrer"
          draggable={false}
        />

        {adaBanyak && (
          <>
            <button
              type="button"
              onClick={() => pindah(-1)}
              disabled={index === 0}
              aria-label="Foto sebelumnya"
              className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:pointer-events-none disabled:opacity-0"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => pindah(1)}
              disabled={index === images.length - 1}
              aria-label="Foto berikutnya"
              className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 disabled:pointer-events-none disabled:opacity-0"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      <div className="safe-bottom px-4 text-center text-[10px] text-white/50">
        {adaBanyak ? 'Geser, pakai panah, atau tekan Esc untuk menutup' : 'Tekan di luar foto atau Esc untuk menutup'}
      </div>
    </div>
  );
};

export default ImageLightbox;
