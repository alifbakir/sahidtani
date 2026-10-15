/**
 * Kompres foto di browser sebelum diupload.
 * Ini penting: foto dari HP bisa 4-8 MB, sedangkan kuota gratis Supabase
 * hanya 1 GB storage dan 5 GB bandwidth. Setelah dikompres jadi ~150-400 KB.
 */
export async function resizeImage(file: File, maxSize = 1600, quality = 0.82): Promise<Blob> {
  if (!file.type.startsWith('image/')) {
    throw new Error(`File "${file.name}" bukan gambar.`);
  }

  const image = await loadImage(file);
  const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Browser ini tidak mendukung pengompresan gambar.');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(image, 0, 0, width, height);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/jpeg', quality),
  );
  if (!blob) throw new Error('Gagal mengompres gambar.');

  URL.revokeObjectURL(image.src);
  return blob;
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error(`Gambar "${file.name}" tidak bisa dibaca. Coba format JPG atau PNG.`));
    };
    image.src = objectUrl;
  });
}

export function fileSizeLabel(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Penanda URL publik Supabase Storage. */
const STORAGE_PUBLIC = '/storage/v1/object/public/';

/**
 * Foto produk dari Storage bisa 2-3 MB, padahal kartu produk hanya butuh
 * gambar kecil. Supabase menyediakan endpoint yang mengecilkan foto di sisi
 * server (sekali proses, lalu di-cache di CDN), jadi kita minta ukuran yang
 * memang dipakai saja.
 *
 * Foto yang bukan dari Storage (mis. /LOGONOBG.png di folder public) dan foto
 * yang sudah berbentuk URL transformasi dibiarkan apa adanya.
 */
export function fotoProduk(url: string, ukuran: number, kualitas = 72): string {
  if (!url.includes(STORAGE_PUBLIC) || url.includes('/render/image/')) return url;

  const dasar = url.replace(STORAGE_PUBLIC, '/storage/v1/render/image/public/');
  const pemisah = dasar.includes('?') ? '&' : '?';
  return `${dasar}${pemisah}width=${ukuran}&height=${ukuran}&resize=cover&quality=${kualitas}`;
}
