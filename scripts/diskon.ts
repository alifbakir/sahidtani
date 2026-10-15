/**
 * Atur harga promo (diskon) untuk semua produk sekaligus.
 *
 *   npm run diskon             -> pratinjau potongan 10%
 *   npm run diskon -- 10       -> tulis potongan 10% ke semua produk
 *   npm run diskon -- 15       -> ganti jadi 15%
 *   npm run diskon -- 0        -> hapus semua diskon (harga promo dikosongkan)
 *
 * Tambahkan --dry untuk melihat rencananya tanpa menulis ke database.
 * Diskon per produk tetap bisa diubah satu-satu lewat panel admin
 * (Admin -> Produk -> Ubah -> kolom "Harga Promo").
 */
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('\n❌ .env.local belum diisi.');
  console.error('   Butuh VITE_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY.\n');
  process.exit(1);
}

const args = process.argv.slice(2);
const dryRun = args.includes('--dry');
const persenArg = args.find((a) => !a.startsWith('--'));
const persen = persenArg === undefined ? 10 : Number(persenArg);

if (!Number.isFinite(persen) || persen < 0 || persen >= 100) {
  console.error('\n❌ Potongan harus angka 0-99. Contoh: npm run diskon -- 10\n');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

/**
 * Harga promo = potong `persen`, dibulatkan ke bawah ke ratusan supaya
 * angkanya enak dibaca (mis. 85.000 -> 76.500). Potongan jadi sedikit
 * lebih besar dari persen yang diminta, tidak pernah lebih kecil.
 */
function hargaPromo(price: number, potongan: number): number | null {
  if (potongan === 0) return null;

  let promo = Math.floor((price * (100 - potongan)) / 100 / 100) * 100;
  if (promo <= 0) promo = Math.floor((price * (100 - potongan)) / 100);
  if (promo >= price) promo = price - 1;

  return promo > 0 && promo < price ? promo : null;
}

async function main(): Promise<void> {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, price, discount_price')
    .order('sort_order', { ascending: true })
    .order('id', { ascending: true });

  if (error) throw new Error(error.message);

  const rows = (data ?? []) as {
    id: number;
    name: string;
    price: number;
    discount_price: number | null;
  }[];

  const label = persen === 0 ? 'hapus semua diskon' : `potongan ${persen}%`;
  console.log(`\n${rows.length} produk | ${label} | mode: ${dryRun ? 'pratinjau' : 'tulis'}\n`);

  const gagal: string[] = [];
  let sukses = 0;
  let berubah = 0;

  for (const row of rows) {
    const promo = hargaPromo(row.price, persen);
    const realisasi = promo === null ? '-' : (((row.price - promo) / row.price) * 100).toFixed(1);
    const tanda = row.discount_price === promo ? '=' : promo === null ? '-' : '~';

    console.log(
      `${tanda} #${row.id} ${row.name.slice(0, 36).padEnd(36)} Rp ${String(row.price).padStart(7)} -> ${
        promo === null ? 'tanpa diskon' : `Rp ${String(promo).padStart(7)} (-${realisasi}%)`
      }`,
    );

    if (row.discount_price === promo) {
      sukses += 1;
      continue;
    }

    berubah += 1;
    if (dryRun) {
      sukses += 1;
      continue;
    }

    const { error: patchError } = await supabase
      .from('products')
      .update({ discount_price: promo })
      .eq('id', row.id);

    if (patchError) gagal.push(`#${row.id} ${row.name}: ${patchError.message}`);
    else sukses += 1;
  }

  console.log('\n────────────────────────────────');
  console.log(`Sukses  : ${sukses}/${rows.length}`);
  console.log(`Diubah  : ${berubah}`);
  if (gagal.length > 0) {
    console.log(`Gagal   : ${gagal.length}`);
    gagal.forEach((line) => console.log(`   - ${line}`));
  }
  if (dryRun) console.log('\nIni baru pratinjau. Jalankan tanpa --dry untuk menulis.\n');
  else console.log('\nHarga coret langsung tampil di katalog (refresh halaman web-nya).\n');
}

main().catch((error) => {
  console.error('\n❌ Berhenti:', error instanceof Error ? error.message : error);
  process.exit(1);
});
