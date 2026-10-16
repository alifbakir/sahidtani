import React, { useEffect, useState } from 'react';
import { Download, Share, X } from 'lucide-react';

/**
 * Kartu ajakan memasang Sahid Tani sebagai aplikasi (PWA).
 *
 * TIDAK DIPAKAI LAGI: pemilik toko meminta pop-up ini tidak muncul saat orang
 * membuka website, jadi komponen ini tidak dipasang di App.tsx. Untuk
 * menghidupkannya kembali: import di App.tsx lalu pasang
 * `<PwaInstall mode={isAdminArea ? 'admin' : 'toko'} />`.
 *
 * Cara kerjanya kalau dipakai: Chrome/Edge/Android memunculkan event
 * `beforeinstallprompt`; event itu ditahan supaya tidak muncul bilah bawaan
 * browser, lalu dipakai lagi saat pengunjung menekan tombol "Pasang".
 * Safari (iOS) tidak mendukung event tersebut, jadi di sana yang ditampilkan
 * adalah petunjuk manual: Bagikan → Tambah ke Layar Utama.
 */

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PwaInstallProps {
  /** Aplikasi mana yang ditawarkan: toko (pembeli) atau admin (pengelola). */
  mode?: 'toko' | 'admin';
}

const KONTEN = {
  toko: {
    kunciTolak: 'sahidTaniTolakPasang',
    ikon: '/icons/pwa-192x192.png',
    judul: 'Pasang aplikasi Sahid Tani',
    keterangan: 'Buka katalog lebih cepat dari layar utama, tanpa perlu unduh dari toko aplikasi.',
    posisi: 'inset-x-3 bottom-24 md:inset-x-auto md:right-6 md:bottom-6 md:w-80',
  },
  admin: {
    kunciTolak: 'sahidTaniTolakPasangAdmin',
    ikon: '/icons/admin-192x192.png',
    judul: 'Pasang aplikasi admin',
    keterangan:
      'Ikon terpisah di layar utama yang langsung membuka /admin — tanpa mengetik alamatnya.',
    posisi: 'inset-x-3 bottom-4 md:inset-x-auto md:right-6 md:bottom-6 md:w-80',
  },
} as const;

/** Sudah dibuka sebagai aplikasi terpasang? */
function sudahTerpasang(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(display-mode: standalone)').matches) return true;
  // iOS memakai properti non-standar ini.
  return (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
}

/** iOS/iPadOS: Chrome & Firefox di sana tetap memakai mesin WebKit. */
function penggunaIos(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
}

const PwaInstall: React.FC<PwaInstallProps> = ({ mode = 'toko' }) => {
  const isi = KONTEN[mode];
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [tampil, setTampil] = useState(false);
  const [caraIos, setCaraIos] = useState(false);

  useEffect(() => {
    setTampil(false);
    setCaraIos(false);
    setPrompt(null);

    if (sudahTerpasang()) return;
    if (localStorage.getItem(isi.kunciTolak) === '1') return;

    const onPrompt = (event: Event) => {
      event.preventDefault();
      setPrompt(event as BeforeInstallPromptEvent);
      setTampil(true);
    };
    const onTerpasang = () => {
      setTampil(false);
      setPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onTerpasang);

    // iOS tidak pernah mengirim beforeinstallprompt — tampilkan petunjuk
    // manual setelah pengunjung agak lama berada di halaman.
    let timer: number | undefined;
    if (penggunaIos()) {
      timer = window.setTimeout(() => {
        setCaraIos(true);
        setTampil(true);
      }, 8000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onTerpasang);
      if (timer) window.clearTimeout(timer);
    };
  }, [isi.kunciTolak]);

  const tutup = () => {
    setTampil(false);
    // Jangan terus-menerus mengganggu orang yang sudah menolak.
    localStorage.setItem(isi.kunciTolak, '1');
  };

  const pasang = async () => {
    if (!prompt) return;
    await prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === 'accepted') setTampil(false);
    else tutup();
    setPrompt(null);
  };

  if (!tampil) return null;

  return (
    <div
      className="fixed inset-x-3 bottom-24 z-40 md:inset-x-auto md:right-6 md:bottom-6 md:w-80"
      role="dialog"
      aria-label="Pasang aplikasi Sahid Tani"
    >
      <div className="card card-masuk flex items-start gap-3 p-4">
        <img
          src="/icons/pwa-192x192.png"
          alt=""
          width={44}
          height={44}
          className="h-11 w-11 shrink-0 rounded-xl border border-line object-contain"
        />

        <div className="min-w-0 flex-1">
          <p className="text-sm font-extrabold text-ink">Pasang aplikasi Sahid Tani</p>

          {caraIos ? (
            <p className="mt-1 text-xs leading-relaxed text-inksoft">
              Buka menu <Share className="inline h-3.5 w-3.5 align-[-2px]" /> <b>Bagikan</b> di
              Safari, lalu pilih <b>Tambah ke Layar Utama</b>.
            </p>
          ) : (
            <p className="mt-1 text-xs leading-relaxed text-inksoft">
              Buka katalog lebih cepat dari layar utama, tanpa perlu unduh dari toko aplikasi.
            </p>
          )}

          {!caraIos && (
            <button onClick={pasang} className="btn btn-primary btn-sm mt-3">
              <Download className="h-4 w-4" /> Pasang sekarang
            </button>
          )}
        </div>

        <button onClick={tutup} className="icon-btn -mr-1 -mt-1 h-8 w-8" aria-label="Tutup">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default PwaInstall;
