/**
 * Migrasi sekali jalan: pindahkan 48 produk dan seluruh fotonya dari
 * src/data.ts + folder public/ ke Supabase (tabel products / categories /
 * product_images + Storage bucket "produk").
 *
 * Cara jalan:  npm run seed
 * Aman dijalankan berulang kali (upsert berdasarkan slug produk).
 */
import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { products } from '../src/data';
import { slugify } from '../src/lib/utils';

dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = 'produk';

/** Produk yang tampil di beranda versi lama, dipertahankan setelah migrasi. */
const FEATURED_IDS = [4, 5, 7, 24];

/**
 * data.ts tidak punya kolom stok. Kalau migrasi menulis 0, seluruh katalog
 * langsung tampil "Stok Habis" di web, jadi pakai angka wajar sebagai awal.
 */
const DEFAULT_STOCK = 20;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('\n❌ .env.local belum diisi.');
  console.error('   Butuh VITE_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY.\n');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

function contentTypeFor(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.webp') return 'image/webp';
  return 'application/octet-stream';
}

async function ensureCategories(): Promise<Map<string, number>> {
  const names = Array.from(new Set(products.map((p) => p.category)));
  const map = new Map<string, number>();

  for (const [index, name] of names.entries()) {
    const { data, error } = await supabase
      .from('categories')
      .upsert({ name, slug: slugify(name), sort_order: index + 1 }, { onConflict: 'slug' })
      .select('id')
      .single();

    if (error) throw new Error(`kategori "${name}": ${error.message}`);
    map.set(name, (data as { id: number }).id);
  }

  return map;
}

async function uploadImages(productName: string, images: string[]): Promise<string[]> {
  const folder = slugify(productName);
  const urls: string[] = [];

  for (const [index, imagePath] of images.entries()) {
    const localPath = path.join(process.cwd(), 'public', imagePath.replace(/^\//, ''));

    if (!fs.existsSync(localPath)) {
      console.warn(`\n   ⚠️  file tidak ditemukan, dilewati: ${imagePath}`);
      continue;
    }

    const ext = path.extname(localPath).toLowerCase() || '.jpg';
    const objectPath = `${folder}/${String(index + 1).padStart(2, '0')}${ext}`;

    const { error } = await supabase.storage.from(BUCKET).upload(objectPath, fs.readFileSync(localPath), {
      contentType: contentTypeFor(localPath),
      cacheControl: '31536000',
      upsert: true,
    });

    if (error) throw new Error(`upload ${imagePath}: ${error.message}`);

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(objectPath);
    urls.push(data.publicUrl);
  }

  return urls;
}

async function main(): Promise<void> {
  console.log(`\n🚚 Migrasi ${products.length} produk ke ${SUPABASE_URL}\n`);

  const categoryIds = await ensureCategories();
  console.log(`✅ ${categoryIds.size} kategori siap\n`);

  let success = 0;
  const failed: string[] = [];

  for (const product of products) {
    process.stdout.write(`→ ${product.name} ... `);

    try {
      const urls = await uploadImages(product.name, product.images);

      const { data, error } = await supabase
        .from('products')
        .upsert(
          {
            name: product.name,
            slug: slugify(product.name),
            price: product.price,
            category_id: categoryIds.get(product.category) ?? null,
            rating: product.rating,
            stock: DEFAULT_STOCK,
            is_available: true,
            is_featured: FEATURED_IDS.includes(product.id),
            sort_order: product.id,
            description: product.description,
            fruit_features: product.fruitFeatures,
            plant_features: product.plantFeatures,
            planting_guide: product.plantingGuide,
            care_guide: product.careGuide,
          },
          { onConflict: 'slug' },
        )
        .select('id')
        .single();

      if (error) throw new Error(error.message);

      const productId = (data as { id: number }).id;

      await supabase.from('product_images').delete().eq('product_id', productId);

      if (urls.length > 0) {
        const { error: imageError } = await supabase
          .from('product_images')
          .insert(urls.map((url, index) => ({ product_id: productId, url, sort_order: index })));

        if (imageError) throw new Error(imageError.message);
      }

      console.log(`ok (${urls.length} foto)`);
      success += 1;
    } catch (error) {
      console.log('GAGAL');
      failed.push(`${product.name}: ${error instanceof Error ? error.message : 'penyebab tidak diketahui'}`);
    }
  }

  console.log('\n────────────────────────────────');
  console.log(`Berhasil : ${success}/${products.length} produk`);
  if (failed.length > 0) {
    console.log(`Gagal    : ${failed.length}`);
    failed.forEach((line) => console.log(`   - ${line}`));
  }
  console.log('\nLangkah berikutnya: npm run dev, lalu buka /admin\n');
}

main().catch((error) => {
  console.error('\n❌ Migrasi berhenti:', error instanceof Error ? error.message : error);
  process.exit(1);
});
