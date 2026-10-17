/**
 * Membuat berkas tambahan setelah `vite build`:
 *
 * 1. robots.txt + sitemap.xml  → memberi tahu Google halaman mana saja yang ada.
 * 2. dist/produk/<id>/index.html → salinan halaman toko dengan judul, deskripsi,
 *    gambar, harga, dan data terstruktur untuk produk itu.
 *
 * Kenapa harus dibuat saat build: WhatsApp, Facebook, dan Google TIDAK
 * menjalankan JavaScript. Kalau tag-nya hanya disetel dari React, mereka cuma
 * melihat judul toko yang sama untuk semua halaman. Halaman hasil salinan ini
 * tetap memuat aplikasi React seperti biasa, jadi pembeli tidak melihat bedanya.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const SITUS = 'https://www.sahidtani.web.id';
const AKAR = process.cwd();
const DIST = path.join(AKAR, 'dist');
const STORAGE_PUBLIC = '/storage/v1/object/public/';

/** Halaman tetap yang selalu ada di sitemap. */
const HALAMAN_TETAP = [
  { jalur: '/', prioritas: '1.0' },
  { jalur: '/produk', prioritas: '0.9' },
  { jalur: '/tentang', prioritas: '0.5' },
  { jalur: '/kontak', prioritas: '0.5' },
];

function bacaEnv() {
  const env = {};
  const berkas = path.join(AKAR, '.env.production');
  if (!existsSync(berkas)) return env;

  const isi = readFileSync(berkas, 'utf8');
  for (const baris of isi.split(/\r?\n/)) {
    const bersih = baris.trim();
    if (!bersih || bersih.startsWith('#') || !bersih.includes('=')) continue;
    const pisah = bersih.indexOf('=');
    env[bersih.slice(0, pisah).trim()] = bersih.slice(pisah + 1).trim().replace(/^["']|["']$/g, '');
  }
  return env;
}

/** Foto produk yang dipotong 1200x630 — ukuran kartu preview WhatsApp/Facebook. */
function fotoBagikan(url) {
  if (!url || !url.includes(STORAGE_PUBLIC)) return `${SITUS}/LOGONOBG.png`;
  const dasar = url.replace(STORAGE_PUBLIC, '/storage/v1/render/image/public/');
  const pemisah = dasar.includes('?') ? '&' : '?';
  return `${dasar}${pemisah}width=1200&height=630&resize=cover&quality=80`;
}

function rupiah(nilai) {
  return `Rp ${Number(nilai).toLocaleString('id-ID')}`;
}

function potong(teks, maks) {
  const bersih = String(teks || '').replace(/\s+/g, ' ').trim();
  if (bersih.length <= maks) return bersih;
  return `${bersih.slice(0, maks - 1).trimEnd()}…`;
}

/** Melarikan teks untuk disisipkan ke HTML/atribut. */
function aman(teks) {
  return String(teks ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Data toko untuk Google (LocalBusiness). Dipakai di halaman depan supaya
 *  pencarian "jual bibit buah unggul salatiga" mengenali ini toko di Salatiga. */
const DATA_TOKO = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Sahid Tani',
  alternateName: 'Sahid Tani — Pusat Bibit Buah Salatiga',
  description:
    'Toko bibit buah unggul di Salatiga: durian bawor, alpukat aligator, mangga, jeruk, dan puluhan varietas lain. Bibit hasil okulasi, siap kirim ke seluruh Indonesia.',
  url: SITUS,
  image: `${SITUS}/LOGONOBG.png`,
  logo: `${SITUS}/LOGONOBG.png`,
  telephone: '+6285878412411',
  priceRange: 'Rp',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jl. Plongkowati No.7, Tegalrejo, Kec. Argomulyo',
    addressLocality: 'Kota Salatiga',
    addressRegion: 'Jawa Tengah',
    postalCode: '50733',
    addressCountry: 'ID',
  },
  geo: { '@type': 'GeoCoordinates', latitude: -7.3424819, longitude: 110.5045028 },
  areaServed: { '@type': 'City', name: 'Salatiga' },
  sameAs: [
    'https://www.instagram.com/sahid.tani_/',
    'https://www.facebook.com/sahid.tani.12',
  ],
};

async function ambilProduk() {
  const env = bacaEnv();
  const url = env.VITE_SUPABASE_URL;
  const kunci = env.VITE_SUPABASE_ANON_KEY;
  if (!url || !kunci) throw new Error('VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY tidak ada di .env.production');

  const kueri =
    '/rest/v1/products?select=id,name,slug,price,discount_price,stock,is_available,description,' +
    'categories(name),product_images(url,sort_order)&order=sort_order&order=id';
  const balasan = await fetch(`${url}${kueri}`, {
    headers: { apikey: kunci, Authorization: `Bearer ${kunci}` },
  });
  if (!balasan.ok) throw new Error(`Supabase membalas ${balasan.status}: ${await balasan.text()}`);

  return (await balasan.json()).map((p) => {
    const foto = (p.product_images ?? [])
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((f) => f.url);
    const promo = p.discount_price;
    const harga = promo && promo > 0 && promo < p.price ? promo : p.price;
    return {
      id: p.id,
      nama: p.name,
      slug: p.slug,
      harga,
      hargaNormal: p.price,
      stok: p.stock,
      tersedia: p.is_available,
      deskripsi: p.description,
      kategori: p.categories?.name ?? '',
      foto: foto[0] ?? '',
    };
  });
}

/** Sisipkan judul, deskripsi, gambar, dan data terstruktur ke kerangka index.html. */
function sisipkanMeta(template, { judul, deskripsi, gambar, kanonis, dataTerstruktur }) {
  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${aman(judul)}</title>`);

  if (/<meta\s+name="description"[^>]*>/.test(html)) {
    html = html.replace(
      /<meta\s+name="description"[^>]*>/,
      `<meta name="description" content="${aman(deskripsi)}" />`,
    );
  } else {
    html = html.replace('</head>', `  <meta name="description" content="${aman(deskripsi)}" />\n  </head>`);
  }

  const tambahan = [
    `<link rel="canonical" href="${aman(kanonis)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Sahid Tani" />`,
    `<meta property="og:locale" content="id_ID" />`,
    `<meta property="og:title" content="${aman(judul)}" />`,
    `<meta property="og:description" content="${aman(deskripsi)}" />`,
    `<meta property="og:url" content="${aman(kanonis)}" />`,
    `<meta property="og:image" content="${aman(gambar)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${aman(judul)}" />`,
    `<meta name="twitter:description" content="${aman(deskripsi)}" />`,
    `<meta name="twitter:image" content="${aman(gambar)}" />`,
  ];

  if (dataTerstruktur) {
    tambahan.push(
      `<script type="application/ld+json">${JSON.stringify(dataTerstruktur).replace(/</g, '\\u003c')}</script>`,
    );
  }

  return html.replace('</head>', `  ${tambahan.join('\n  ')}\n  </head>`);
}

async function main() {
  if (!existsSync(path.join(DIST, 'index.html'))) {
    throw new Error('dist/index.html belum ada — jalankan `vite build` dulu.');
  }

  const template = await readFile(path.join(DIST, 'index.html'), 'utf8');
  let produk = [];
  try {
    produk = await ambilProduk();
    console.log(`prerender: ${produk.length} produk dari Supabase`);
  } catch (galat) {
    // Jangan gagalkan deploy hanya karena Supabase sedang tidak bisa dihubungi;
    // halaman produk akan memakai judul bawaan toko.
    console.warn('prerender: gagal mengambil produk —', galat.message);
  }

  // ---- Halaman produk -------------------------------------------------
  let dibuat = 0;
  for (const p of produk) {
    const judul = `${p.nama} — ${rupiah(p.harga)} | Sahid Tani Salatiga`;
    const stokTeks = p.tersedia && p.stok > 0 ? `Stok tersedia ${p.stok}.` : 'Stok sedang kosong.';
    const deskripsi = potong(
      `${p.nama}${p.kategori ? ` (${p.kategori})` : ''} dari Sahid Tani Salatiga. Harga ${rupiah(p.harga)}. ${stokTeks} ${p.deskripsi}`,
      158,
    );

    const kanonis = `${SITUS}/produk/${p.id}`;
    const dataTerstruktur = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p.nama,
      description: potong(p.deskripsi, 300),
      image: [fotoBagikan(p.foto)],
      sku: String(p.id),
      category: p.kategori || undefined,
      brand: { '@type': 'Brand', name: 'Sahid Tani' },
      offers: {
        '@type': 'Offer',
        url: kanonis,
        priceCurrency: 'IDR',
        price: p.harga,
        availability:
          p.tersedia && p.stok > 0
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
        seller: { '@type': 'Organization', name: 'Sahid Tani' },
      },
    };

    const html = sisipkanMeta(template, {
      judul,
      deskripsi,
      gambar: fotoBagikan(p.foto),
      kanonis,
      dataTerstruktur,
    });

    const folder = path.join(DIST, 'produk', String(p.id));
    await mkdir(folder, { recursive: true });
    await writeFile(path.join(folder, 'index.html'), html, 'utf8');
    dibuat += 1;
  }
  console.log(`prerender: ${dibuat} halaman produk dibuat`);

  // ---- Halaman tetap (judul & deskripsi bawaan) -----------------------
  const tetap = {
    '/': {
      judul: 'Jual Bibit Buah Unggul Salatiga — Sahid Tani',
      deskripsi:
        'Sahid Tani menjual bibit buah unggul di Salatiga: durian bawor, alpukat aligator, mangga, jeruk, dan puluhan varietas lain. Harga jelas, stok terbaru, siap kirim.',
      dataTerstruktur: DATA_TOKO,
    },
    '/produk': {
      judul: 'Katalog Bibit Buah — Sahid Tani Salatiga',
      deskripsi:
        'Daftar lengkap bibit buah Sahid Tani: durian bawor, alpukat aligator, mangga, jeruk, dan lainnya. Lihat harga dan stok terbaru.',
    },
    '/tentang': {
      judul: 'Tentang Sahid Tani — Pembibit Buah di Salatiga',
      deskripsi:
        'Sahid Tani membudidayakan bibit buah unggul di Salatiga dengan okulasi dan perawatan yang rapi, siap ditanam di pekarangan maupun kebun.',
    },
    '/kontak': {
      judul: 'Kontak & Lokasi Sahid Tani — Salatiga',
      deskripsi: 'Hubungi Sahid Tani lewat WhatsApp untuk tanya stok, harga, dan pengiriman bibit buah dari Salatiga.',
    },
  };

  for (const [jalur, meta] of Object.entries(tetap)) {
    const html = sisipkanMeta(template, {
      judul: meta.judul,
      deskripsi: meta.deskripsi,
      gambar: `${SITUS}/LOGONOBG.png`,
      kanonis: `${SITUS}${jalur}`,
      dataTerstruktur: meta.dataTerstruktur,
    });

    if (jalur === '/') {
      await writeFile(path.join(DIST, 'index.html'), html, 'utf8');
    } else {
      const folder = path.join(DIST, jalur.replace(/^\//, ''));
      await mkdir(folder, { recursive: true });
      await writeFile(path.join(folder, 'index.html'), html, 'utf8');
    }
  }

  // ---- robots.txt & sitemap.xml --------------------------------------
  await writeFile(
    path.join(DIST, 'robots.txt'),
    ['User-agent: *', 'Allow: /', 'Disallow: /admin', 'Disallow: /api/', '', `Sitemap: ${SITUS}/sitemap.xml`, ''].join('\n'),
    'utf8',
  );

  const urlSitemap = [
    ...HALAMAN_TETAP.map(
      (h) => `  <url><loc>${SITUS}${h.jalur}</loc><priority>${h.prioritas}</priority></url>`,
    ),
    ...produk.map(
      (p) => `  <url><loc>${SITUS}/produk/${p.id}</loc><priority>0.8</priority></url>`,
    ),
  ];

  await writeFile(
    path.join(DIST, 'sitemap.xml'),
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...urlSitemap,
      '</urlset>',
      '',
    ].join('\n'),
    'utf8',
  );

  console.log(`prerender: robots.txt + sitemap.xml (${urlSitemap.length} alamat)`);
}

main().catch((galat) => {
  console.error('prerender gagal:', galat);
  process.exit(1);
});
