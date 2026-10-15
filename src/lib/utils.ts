/** "Bibit Durian Bawor" -> "bibit-durian-bawor" */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function formatRupiah(value: number): string {
  return `Rp ${Number(value || 0).toLocaleString('id-ID')}`;
}

/** Angka dari input form; kosong / bukan angka jadi 0. */
export function toNumber(value: string | number, fallback = 0): number {
  const n = typeof value === 'number' ? value : Number(String(value).replace(/[^\d.-]/g, ''));
  return Number.isFinite(n) ? n : fallback;
}

/** Harga promo hanya dipakai kalau memang lebih murah dari harga normal. */
export function adaDiskon(produk: { price: number; discountPrice?: number | null }): boolean {
  const promo = produk.discountPrice ?? null;
  return promo !== null && promo > 0 && promo < produk.price;
}

/** Harga yang benar-benar dibayar pembeli. */
export function hargaJual(produk: { price: number; discountPrice?: number | null }): number {
  return adaDiskon(produk) ? (produk.discountPrice as number) : produk.price;
}

/** Besar potongan dalam persen, dibulatkan. 0 kalau tidak ada diskon. */
export function diskonPersen(produk: { price: number; discountPrice?: number | null }): number {
  if (!adaDiskon(produk)) return 0;
  return Math.round(((produk.price - (produk.discountPrice as number)) / produk.price) * 100);
}
