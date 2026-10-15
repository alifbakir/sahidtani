export interface Product {
  id: number;
  name: string;
  slug: string;
  /** Harga normal (harga sebelum diskon). */
  price: number;
  /** Harga promo; null kalau produk tidak sedang diskon. */
  discountPrice: number | null;
  images: string[];
  category: string;
  categoryId: number | null;
  rating: number;
  stock: number;
  isAvailable: boolean;
  isFeatured: boolean;
  sortOrder: number;
  description: string;
  fruitFeatures: string;
  plantFeatures: string;
  plantingGuide: string;
  careGuide: string;
}

/**
 * Bentuk produk lama yang masih tersimpan di src/data.ts.
 * Dipakai sebagai sumber seed (scripts/seed.ts) dan sebagai cadangan
 * tampilan kalau Supabase belum dikonfigurasi.
 */
export interface SeedProduct {
  id: number;
  name: string;
  price: number;
  images: string[];
  category: string;
  rating: number;
  description: string;
  fruitFeatures: string;
  plantFeatures: string;
  plantingGuide: string;
  careGuide: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  sortOrder: number;
  productCount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

/** Data yang dikirim form admin saat menyimpan produk. */
export interface ProductInput {
  name: string;
  slug: string;
  price: number;
  discountPrice: number | null;
  categoryId: number | null;
  rating: number;
  stock: number;
  isAvailable: boolean;
  isFeatured: boolean;
  sortOrder: number;
  description: string;
  fruitFeatures: string;
  plantFeatures: string;
  plantingGuide: string;
  careGuide: string;
  images: string[];
}
