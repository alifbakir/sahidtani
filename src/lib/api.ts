import { supabase, isSupabaseConfigured } from './supabase';
import { products as seedProducts } from '../data';
import { slugify } from './utils';
import type { Product, Category, SeedProduct } from '../types';

/** Foto cadangan kalau produk belum punya gambar sama sekali. */
export const FALLBACK_IMAGE = '/LOGONOBG.png';

/** Produk yang tampil di beranda saat masih memakai data statis. */
const SEED_FEATURED_IDS = [4, 5, 7, 24];

/**
 * src/data.ts tidak menyimpan stok. Saat dipakai sebagai cadangan tampilan,
 * jangan tandai semua produk habis — anggap stoknya tersedia.
 */
const SEED_DEFAULT_STOCK = 20;

interface ProductRow {
  id: number;
  name: string;
  slug: string;
  price: number;
  discount_price: number | null;
  category_id: number | null;
  rating: number | string;
  stock: number;
  is_available: boolean;
  is_featured: boolean;
  description: string;
  fruit_features: string;
  plant_features: string;
  planting_guide: string;
  care_guide: string;
  categories: { name: string } | null;
  product_images: { url: string; sort_order: number }[] | null;
}

interface CategoryRow {
  id: number;
  name: string;
  slug: string;
}

const PRODUCT_COLUMNS = [
  'id',
  'name',
  'slug',
  'price',
  'discount_price',
  'category_id',
  'rating',
  'stock',
  'is_available',
  'is_featured',
  'description',
  'fruit_features',
  'plant_features',
  'planting_guide',
  'care_guide',
  'categories(name)',
  'product_images(url, sort_order)',
].join(', ');

function mapProductRow(row: ProductRow): Product {
  const images = (row.product_images ?? [])
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((img) => img.url);

  // Harga promo diabaikan kalau nilainya tidak masuk akal (>= harga normal).
  const promo = row.discount_price;

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    price: row.price,
    discountPrice: promo !== null && promo > 0 && promo < row.price ? promo : null,
    images: images.length > 0 ? images : [FALLBACK_IMAGE],
    category: row.categories?.name ?? '',
    categoryId: row.category_id,
    rating: Number(row.rating),
    stock: row.stock,
    isAvailable: row.is_available,
    isFeatured: row.is_featured,
    description: row.description,
    fruitFeatures: row.fruit_features,
    plantFeatures: row.plant_features,
    plantingGuide: row.planting_guide,
    careGuide: row.care_guide,
  };
}

export function mapSeedProduct(p: SeedProduct): Product {
  return {
    id: p.id,
    name: p.name,
    slug: slugify(p.name),
    price: p.price,
    discountPrice: null,
    images: p.images.length > 0 ? p.images : [FALLBACK_IMAGE],
    category: p.category,
    categoryId: null,
    rating: p.rating,
    stock: SEED_DEFAULT_STOCK,
    isAvailable: true,
    isFeatured: SEED_FEATURED_IDS.includes(p.id),
    description: p.description,
    fruitFeatures: p.fruitFeatures,
    plantFeatures: p.plantFeatures,
    plantingGuide: p.plantingGuide,
    careGuide: p.careGuide,
  };
}

/**
 * Urutan katalog otomatis — admin tidak perlu mengisi nomor urut apa pun.
 *
 * 1. Produk unggulan (centang "Jadikan unggulan" di admin) paling depan.
 * 2. Sisanya dikelompokkan per kategori, A–Z.
 * 3. Produk yang stoknya masih ada didahulukan daripada yang habis.
 * 4. Nama produk A–Z sebagai penentu terakhir supaya urutan tidak berubah-ubah.
 *
 * Karena unggulan ditaruh paling depan, saat pembeli membuka satu kategori
 * produk unggulan di kategori itu otomatis muncul paling awal.
 */
export function urutkanProduk(daftar: Product[]): Product[] {
  return [...daftar].sort((a, b) => {
    if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;

    // Produk tanpa kategori ditaruh paling belakang, bukan paling depan.
    const kategoriA = a.category || '\uffff';
    const kategoriB = b.category || '\uffff';
    const bedaKategori = kategoriA.localeCompare(kategoriB, 'id');
    if (bedaKategori !== 0) return bedaKategori;

    const habisA = a.stock > 0 ? 0 : 1;
    const habisB = b.stock > 0 ? 0 : 1;
    if (habisA !== habisB) return habisA - habisB;
    return a.name.localeCompare(b.name, 'id');
  });
}

/** true kalau web masih memakai data statis (Supabase belum diisi). */
export function usingStaticData(): boolean {
  return !isSupabaseConfigured;
}

export async function fetchProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured) {
    return urutkanProduk(seedProducts.map(mapSeedProduct));
  }

  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_COLUMNS)
    .order('id', { ascending: true });

  if (error) throw new Error(`Gagal memuat produk: ${error.message}`);

  const rows = (data ?? []) as unknown as ProductRow[];
  if (rows.length === 0) return [];

  // Urutan tampil dihitung di sini, bukan di database: admin cukup mencentang
  // "Unggulan" dan katalog mengurutkan sendiri (lihat urutkanProduk).
  return urutkanProduk(rows.map(mapProductRow));
}

/** Terima id numerik maupun slug, supaya URL lama /produk/3 tetap jalan. */
export async function fetchProduct(idOrSlug: string): Promise<Product | null> {
  const numeric = Number(idOrSlug);
  const byId = Number.isInteger(numeric) && numeric > 0;

  if (!isSupabaseConfigured) {
    const found = seedProducts
      .map((p) => mapSeedProduct(p))
      .find((p) => (byId ? p.id === numeric : p.slug === idOrSlug));
    return found ?? null;
  }

  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_COLUMNS)
    .eq(byId ? 'id' : 'slug', byId ? numeric : idOrSlug)
    .maybeSingle();

  if (error) throw new Error(`Gagal memuat produk: ${error.message}`);
  if (!data) return null;

  return mapProductRow(data as unknown as ProductRow);
}

/** Kategori selalu tampil A–Z; tidak ada nomor urut yang perlu diatur admin. */
export async function fetchCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured) {
    const names = Array.from(new Set(seedProducts.map((p) => p.category))).sort((a, b) =>
      a.localeCompare(b, 'id'),
    );
    return names.map((name, index) => ({
      id: index + 1,
      name,
      slug: slugify(name),
    }));
  }

  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug')
    .order('name', { ascending: true });

  if (error) throw new Error(`Gagal memuat kategori: ${error.message}`);

  return ((data ?? []) as CategoryRow[]).map((row) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
  }));
}
