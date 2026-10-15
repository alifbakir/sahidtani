import { supabase, isSupabaseConfigured, STORAGE_BUCKET } from './supabase';
import { resizeImage } from './image';
import { slugify } from './utils';
import type { Category, ProductInput } from '../types';

function requireClient(): void {
  if (!isSupabaseConfigured) {
    throw new Error(
      'Supabase belum dikonfigurasi. Isi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di .env.local, lalu jalankan ulang npm run dev.',
    );
  }
}

function toRow(input: ProductInput) {
  return {
    name: input.name.trim(),
    slug: input.slug,
    price: input.price,
    discount_price: input.discountPrice,
    category_id: input.categoryId,
    rating: input.rating,
    stock: input.stock,
    is_available: input.isAvailable,
    is_featured: input.isFeatured,
    sort_order: input.sortOrder,
    description: input.description,
    fruit_features: input.fruitFeatures,
    plant_features: input.plantFeatures,
    planting_guide: input.plantingGuide,
    care_guide: input.careGuide,
  };
}

// ---------------------------------------------------------------- foto

/** Kompres lalu upload ke Storage. Mengembalikan URL publik. */
export async function uploadProductImage(file: File, folder: string): Promise<string> {
  requireClient();

  const blob = await resizeImage(file);
  const safeFolder = slugify(folder) || 'umum';
  const path = `${safeFolder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;

  const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(path, blob, {
    contentType: 'image/jpeg',
    cacheControl: '31536000',
    upsert: false,
  });
  if (error) throw new Error(`Upload foto gagal: ${error.message}`);

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/** Ambil path di dalam bucket dari URL publik. null kalau foto lama di public/. */
export function storagePathFromUrl(url: string): string | null {
  const marker = `/storage/v1/object/public/${STORAGE_BUCKET}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(url.slice(index + marker.length));
}

/** Hapus foto dari Storage, tapi hanya kalau tidak dipakai produk lain. */
async function deleteStorageImageIfUnused(url: string): Promise<void> {
  const path = storagePathFromUrl(url);
  if (!path) return; // foto lama di folder public/, biarkan saja

  const { count } = await supabase
    .from('product_images')
    .select('id', { count: 'exact', head: true })
    .eq('url', url);

  if ((count ?? 0) > 0) return; // masih dipakai produk lain

  await supabase.storage.from(STORAGE_BUCKET).remove([path]);
}

/** Hapus foto yang baru saja diupload (dipakai saat admin membatalkan pilihan). */
export async function discardUploadedImage(url: string): Promise<void> {
  requireClient();
  await deleteStorageImageIfUnused(url);
}

async function replaceImages(productId: number, images: string[]): Promise<void> {
  const { error: deleteError } = await supabase
    .from('product_images')
    .delete()
    .eq('product_id', productId);
  if (deleteError) throw new Error(`Gagal memperbarui foto: ${deleteError.message}`);

  if (images.length === 0) return;

  const rows = images.map((url, index) => ({ product_id: productId, url, sort_order: index }));
  const { error: insertError } = await supabase.from('product_images').insert(rows);
  if (insertError) throw new Error(`Gagal menyimpan foto: ${insertError.message}`);
}

// ---------------------------------------------------------------- produk

export async function createProduct(input: ProductInput): Promise<number> {
  requireClient();

  const { images, ...rest } = input;
  const { data, error } = await supabase
    .from('products')
    .insert(toRow(rest as ProductInput))
    .select('id')
    .single();

  if (error) throw new Error(`Gagal menyimpan produk: ${error.message}`);

  const productId = (data as { id: number }).id;
  await replaceImages(productId, images);
  return productId;
}

export async function updateProduct(
  id: number,
  input: ProductInput,
  previousImages: string[],
): Promise<void> {
  requireClient();

  const { images, ...rest } = input;
  const { error } = await supabase
    .from('products')
    .update(toRow(rest as ProductInput))
    .eq('id', id);
  if (error) throw new Error(`Gagal memperbarui produk: ${error.message}`);

  await replaceImages(id, images);

  const removed = previousImages.filter((url) => !images.includes(url));
  for (const url of removed) {
    await deleteStorageImageIfUnused(url);
  }
}

export async function deleteProduct(id: number): Promise<void> {
  requireClient();

  const { data: imageRows } = await supabase
    .from('product_images')
    .select('url')
    .eq('product_id', id);

  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw new Error(`Gagal menghapus produk: ${error.message}`);

  for (const row of (imageRows ?? []) as { url: string }[]) {
    await deleteStorageImageIfUnused(row.url);
  }
}

export async function toggleProductAvailability(id: number, next: boolean): Promise<void> {
  requireClient();
  const { error } = await supabase.from('products').update({ is_available: next }).eq('id', id);
  if (error) throw new Error(`Gagal mengubah status: ${error.message}`);
}

/** Ubah stok saja, tanpa membuka form produk. */
export async function updateProductStock(id: number, stock: number): Promise<void> {
  requireClient();
  const { error } = await supabase.from('products').update({ stock }).eq('id', id);
  if (error) throw new Error(`Gagal menyimpan stok: ${error.message}`);
}

// ---------------------------------------------------------------- kategori

export async function createCategory(name: string, sortOrder: number): Promise<void> {
  requireClient();
  const { error } = await supabase
    .from('categories')
    .insert({ name: name.trim(), slug: slugify(name), sort_order: sortOrder });
  if (error) throw new Error(`Gagal menambah kategori: ${error.message}`);
}

export async function updateCategory(
  id: number,
  name: string,
  sortOrder: number,
): Promise<void> {
  requireClient();
  const { error } = await supabase
    .from('categories')
    .update({ name: name.trim(), slug: slugify(name), sort_order: sortOrder })
    .eq('id', id);
  if (error) throw new Error(`Gagal memperbarui kategori: ${error.message}`);
}

/** Produk di dalam kategori ini tidak ikut terhapus, kategorinya jadi kosong. */
export async function deleteCategory(id: number): Promise<void> {
  requireClient();
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) throw new Error(`Gagal menghapus kategori: ${error.message}`);
}

export async function fetchCategoryProductCounts(): Promise<Record<number, number>> {
  if (!isSupabaseConfigured) return {};

  const { data, error } = await supabase.from('products').select('category_id');
  if (error) throw new Error(`Gagal menghitung produk: ${error.message}`);

  const counts: Record<number, number> = {};
  for (const row of (data ?? []) as { category_id: number | null }[]) {
    if (row.category_id === null) continue;
    counts[row.category_id] = (counts[row.category_id] ?? 0) + 1;
  }
  return counts;
}

export type { Category };
