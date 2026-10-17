/**
 * Kompres foto di browser sebelum diupload.
 * Ini penting: foto dari HP bisa 4-8 MB, sedangkan kuota gratis Supabase
 * hanya 1 GB storage dan 5 GB bandwidth. Setelah dikompres jadi ~150-400 KB.
 *
 * Foto HEIC/HEIF (bawaan kamera Samsung & iPhone) tidak bisa digambar ke
 * canvas oleh Chrome/Android, jadi dikonversi dulu ke JPG.
 */
export async function resizeImage(file: File, maxSize = 1600, quality = 0.82): Promise<Blob> {
  const heic = await berkasHeic(file);
  if (!heic && !file.type.startsWith('image/')) {
    throw new Error(`File "${file.name}" bukan gambar.`);
  }

  let image: HTMLImageElement;
  try {
    // Safari bisa membuka HEIC sendiri, jadi dicoba dulu — konverter libheif
    // (sekitar 0,8 MB) baru diunduh kalau browser memang tidak sanggup.
    image = await loadImage(file);
  } catch (err) {
    if (!heic) throw err;
    image = await loadImage(await ubahHeicKeJpeg(file));
  }
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

function loadImage(file: Blob & { name?: string }): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      const nama = file.name ?? 'foto';
      reject(new Error(`Gambar "${nama}" tidak bisa dibaca browser. Coba format JPG atau PNG.`));
    };
    image.src = objectUrl;
  });
}

/** Merek di dalam kotak 'ftyp' yang menandakan berkas HEIC/HEIF. */
const MEREK_HEIC = ['heic', 'heix', 'hevc', 'hevx', 'heim', 'heis', 'hevm', 'hevs', 'mif1', 'msf1'];

/**
 * Apakah berkas ini HEIC/HEIF? Diperiksa dari tipe MIME, nama berkas, lalu
 * 12 byte pertama (kotak 'ftyp') sebagai cadangan — sebagian HP mengirim tipe
 * MIME kosong atau nama berkas yang keliru.
 */
export async function berkasHeic(file: File): Promise<boolean> {
  const tipe = file.type.toLowerCase();
  if (tipe === 'image/heic' || tipe === 'image/heif' || tipe.startsWith('image/hei')) return true;
  if (/\.(heic|heif)$/i.test(file.name)) return true;

  try {
    const kepala = new Uint8Array(await file.slice(0, 12).arrayBuffer());
    if (kepala.length < 12) return false;
    const teks = (dari: number, sampai: number) =>
      String.fromCharCode(...kepala.slice(dari, sampai)).toLowerCase();
    return teks(4, 8) === 'ftyp' && MEREK_HEIC.includes(teks(8, 12));
  } catch {
    return false;
  }
}

/**
 * Ubah HEIC/HEIF jadi JPG memakai libheif (paket heic-to). Modul ini ~3 MB,
 * jadi baru diunduh saat admin benar-benar memilih foto HEIC.
 */
async function ubahHeicKeJpeg(file: File): Promise<Blob> {
  try {
    const { heicTo } = await import('heic-to');
    const hasil = await heicTo({ blob: file, type: 'image/jpeg', quality: 0.95 });
    if (!hasil || hasil.size === 0) throw new Error('hasil konversi kosong');
    return hasil;
  } catch {
    throw new Error(
      `Foto "${file.name}" berformat HEIC. Pengubah HEIC butuh internet sekali saja (sekitar 0,8 MB) dan gagal diunduh/dijalankan sekarang. ` +
        'Coba lagi saat sinyal bagus, atau ubah fotonya ke JPG lewat aplikasi Galeri di HP.',
    );
  }
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

/**
 * Foto utuh untuk pratinjau besar: hanya lebar yang diminta, jadi rasio asli
 * foto dipertahankan (tidak dipotong persegi seperti kartu produk). Dipakai
 * admin untuk memastikan foto yang diunggah memang benar.
 */
export function fotoProdukUtuh(url: string, lebar = 1400, kualitas = 85): string {
  if (!url.includes(STORAGE_PUBLIC) || url.includes('/render/image/')) return url;

  const dasar = url.replace(STORAGE_PUBLIC, '/storage/v1/render/image/public/');
  const pemisah = dasar.includes('?') ? '&' : '?';
  return `${dasar}${pemisah}width=${lebar}&quality=${kualitas}`;
}
