import { useEffect } from 'react';

interface MetaHalaman {
  /** Judul tab browser sekaligus judul di hasil pencarian Google. */
  judul: string;
  /** Ringkasan 1-2 kalimat; muncul di bawah judul pada hasil pencarian. */
  deskripsi?: string;
  /** Foto untuk kartu preview saat tautan dibagikan (1200x630). */
  gambar?: string;
  /** Alamat resmi halaman, supaya tidak dianggap duplikat oleh Google. */
  kanonis?: string;
}

const SITUS = 'https://www.sahidtani.web.id';

function pasangMeta(selector: string, buat: () => HTMLElement, atur: (el: HTMLElement) => void) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = buat();
    document.head.appendChild(el);
  }
  atur(el);
}

/**
 * Menyetel judul, deskripsi, dan penanda berbagi untuk halaman yang sedang
 * dibuka. Ini yang membuat tab browser dan hasil pencarian berbeda per
 * halaman; versi HTML mentahnya sudah disiapkan saat build oleh
 * scripts/prerender.mjs (untuk WhatsApp yang tidak menjalankan JavaScript).
 */
export function useMeta({ judul, deskripsi, gambar, kanonis }: MetaHalaman) {
  useEffect(() => {
    document.title = judul;

    if (deskripsi) {
      pasangMeta(
        'meta[name="description"]',
        () => {
          const el = document.createElement('meta');
          el.setAttribute('name', 'description');
          return el;
        },
        (el) => el.setAttribute('content', deskripsi),
      );
    }

    const properti: [string, string | undefined][] = [
      ['og:title', judul],
      ['og:description', deskripsi],
      ['og:image', gambar],
      ['og:url', kanonis],
      ['twitter:title', judul],
      ['twitter:description', deskripsi],
      ['twitter:image', gambar],
    ];

    for (const [nama, isi] of properti) {
      if (!isi) continue;
      pasangMeta(
        `meta[property="${nama}"], meta[name="${nama}"]`,
        () => {
          const el = document.createElement('meta');
          el.setAttribute(nama.startsWith('og:') ? 'property' : 'name', nama);
          return el;
        },
        (el) => el.setAttribute('content', isi),
      );
    }

    const alamat = kanonis ?? `${SITUS}${window.location.pathname}`;
    pasangMeta(
      'link[rel="canonical"]',
      () => {
        const el = document.createElement('link');
        el.setAttribute('rel', 'canonical');
        return el;
      },
      (el) => el.setAttribute('href', alamat),
    );
  }, [judul, deskripsi, gambar, kanonis]);
}

/** Foto produk dipotong 1200x630 — ukuran kartu preview WhatsApp/Facebook. */
export function fotoBagikan(url: string | undefined): string | undefined {
  if (!url) return undefined;
  const penanda = '/storage/v1/object/public/';
  if (!url.includes(penanda)) return `${SITUS}${url.startsWith('/') ? url : `/${url}`}`;

  const dasar = url.replace(penanda, '/storage/v1/render/image/public/');
  const pemisah = dasar.includes('?') ? '&' : '?';
  return `${dasar}${pemisah}width=1200&height=630&resize=cover&quality=80`;
}
