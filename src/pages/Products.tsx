import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Search, AlertCircle, Sprout, X, SlidersHorizontal } from 'lucide-react';
import { fetchCategories, fetchProducts } from '../lib/api';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';
import { useMeta } from '../hooks/useMeta';
import { Product, Category } from '../types';
import { hargaJual } from '../lib/utils';
import { gulirKe } from '../lib/gulir';
import { useFlipGrid } from '../lib/useFlipGrid';

interface ProductsProps {
  onAddToCart: (product: Product) => void;
}

type Urutan = 'unggulan' | 'murah' | 'mahal' | 'rating';

const opsiUrutan: { id: Urutan; label: string }[] = [
  { id: 'unggulan', label: 'Unggulan' },
  { id: 'murah', label: 'Termurah' },
  { id: 'mahal', label: 'Termahal' },
  { id: 'rating', label: 'Rating' },
];

const Products: React.FC<ProductsProps> = ({ onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [urutan, setUrutan] = useState<Urutan>('unggulan');

  useMeta({
    judul: 'Katalog Bibit Buah — Sahid Tani Salatiga',
    deskripsi:
      'Daftar lengkap bibit buah Sahid Tani: durian bawor, alpukat aligator, mangga, jeruk, dan lainnya. Lihat harga dan stok terbaru.',
  });

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const [productList, categoryList] = await Promise.all([fetchProducts(), fetchCategories()]);
        if (!active) return;
        setProducts(productList);
        setCategories(categoryList);
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : 'Gagal memuat produk.');
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  // Produk yang ditandai tidak tersedia disembunyikan dari katalog.
  const visibleProducts = useMemo(() => products.filter((p) => p.isAvailable), [products]);

  const categoryNames = useMemo(() => {
    const fromDatabase = categories.map((c) => c.name);
    const names =
      fromDatabase.length > 0
        ? fromDatabase
        : Array.from(new Set(visibleProducts.map((p) => p.category))).filter(Boolean);
    return ['Semua', ...names];
  }, [categories, visibleProducts]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const hasil = visibleProducts.filter((product) => {
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q);
      const matchesCategory = selectedCategory === 'Semua' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    const diurutkan = [...hasil];
    if (urutan === 'murah') diurutkan.sort((a, b) => hargaJual(a) - hargaJual(b));
    if (urutan === 'mahal') diurutkan.sort((a, b) => hargaJual(b) - hargaJual(a));
    if (urutan === 'rating') diurutkan.sort((a, b) => b.rating - a.rating);
    return diurutkan;
  }, [visibleProducts, searchQuery, selectedCategory, urutan]);

  // Saat urutan berubah, kartu meluncur ke posisi barunya (lihat useFlipGrid).
  const gridRef = useFlipGrid<HTMLDivElement>([filteredProducts]);

  /**
   * Ganti kategori/pencarian/urutan membuat daftar hasil jadi lebih pendek.
   * Kalau pembeli sedang menggulir jauh ke bawah, posisi gulirnya tertinggal di
   * dasar halaman (yang terlihat footer, bukan hasil filter). Karena itu gulir
   * dikembalikan ke baris pertama hasil, tepat di bawah bar filter yang lengket.
   */
  const barFilterRef = useRef<HTMLDivElement>(null);
  const hasilRef = useRef<HTMLElement>(null);
  const renderPertama = useRef(true);

  useEffect(() => {
    if (renderPertama.current) {
      renderPertama.current = false;
      return;
    }

    const bar = barFilterRef.current;
    const hasil = hasilRef.current;
    if (!bar || !hasil) return;

    // Tinggi navbar sebenarnya (diisi Navbar.tsx) supaya hasil filter tidak
    // tersembunyi di balik navbar.
    const navTinggi =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-tinggi'),
      ) || 64;
    const batasAtas =
      hasil.getBoundingClientRect().top + window.scrollY - bar.offsetHeight - navTinggi - 8;
    if (window.scrollY > batasAtas) gulirKe(batasAtas);
  }, [selectedCategory, searchQuery, urutan]);

  const adaFilter = searchQuery.trim() !== '' || selectedCategory !== 'Semua' || urutan !== 'unggulan';

  const resetFilter = () => {
    setSearchQuery('');
    setSelectedCategory('Semua');
    setUrutan('unggulan');
  };

  return (
    <div>
      {/* ------------------------------------------------------- HEADER */}
      <section className="border-b border-line bg-surface pb-8 pt-[calc(var(--nav-tinggi)+1.25rem)] md:pb-12 md:pt-36">
        <div className="shell">
          <span className="eyebrow">
            <Sprout className="h-3.5 w-3.5" /> Katalog bibit
          </span>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h1 className="display text-[1.9rem] leading-tight text-ink md:text-5xl">
                Pilih bibit <span className="text-brand">unggul</span> untuk kebunmu
              </h1>
              <p className="mt-3 text-sm text-inksoft md:text-base">
                Semua bibit diseleksi langsung dari nursery kami di Salatiga.
              </p>
            </div>
            <span className="badge border border-line bg-canvas text-inksoft">
              {loading ? 'Memuat…' : `${filteredProducts.length} produk`}
            </span>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- FILTER */}
      {/* Pencarian & urutan ikut tergulir bersama halaman; hanya baris kategori
          yang lengket. Dulu seluruh bar (191px = 23% layar HP) ikut lengket
          sehingga katalog sendiri hampir tidak kebagian layar. */}
      <div className="border-b border-line bg-canvas">
        <div className="shell py-3">
          <div className="flex items-center gap-2">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-inksoft" />
              <input
                type="search"
                placeholder="Cari bibit, misalnya durian bawor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="field pl-11 pr-11"
                aria-label="Cari produk"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Hapus pencarian"
                  className="absolute right-2.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-inksoft hover:bg-surface2 hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="relative w-36 flex-shrink-0 sm:w-56">
              <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-inksoft sm:block" />
              <select
                value={urutan}
                onChange={(e) => setUrutan(e.target.value as Urutan)}
                aria-label="Urutkan produk"
                className="field cursor-pointer appearance-none pl-4 pr-8 font-bold sm:pl-11 sm:pr-9"
              >
                {opsiUrutan.map((opsi) => (
                  <option key={opsi.id} value={opsi.id}>
                    {opsi.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-inksoft sm:right-4">
                ▾
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Baris kategori: satu-satunya bagian filter yang lengket (≈52px di HP). */}
      <div
        ref={barFilterRef}
        style={{ top: 'var(--nav-tinggi)' }}
        className="sticky z-30 border-b border-line bg-canvas/95 backdrop-blur-xl"
      >
        <div className="shell pb-2.5 pt-3">
          {/* HP: digeser ke samping. Desktop: dibungkus ke baris berikutnya supaya
              semua kategori kelihatan tanpa perlu digeser. */}
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            {categoryNames.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`chip ${selectedCategory === category ? 'chip-active' : ''}`}
                aria-pressed={selectedCategory === category}
              >
                {category}
              </button>
            ))}
            {adaFilter && (
              <button onClick={resetFilter} className="chip border-dashed text-inksoft">
                <X className="h-3.5 w-3.5" /> Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------- GRID */}
      <section ref={hasilRef} className="shell py-8 md:py-12">
        {loading ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="card overflow-hidden">
                <div className="skeleton aspect-square rounded-none" />
                <div className="space-y-3 p-4">
                  <div className="skeleton h-3 w-1/3" />
                  <div className="skeleton h-4 w-full" />
                  <div className="skeleton h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="card mx-auto max-w-lg p-8 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-promosoft text-promo">
              <AlertCircle className="h-7 w-7" />
            </span>
            <h2 className="mt-5 text-lg font-extrabold text-ink">Gagal memuat produk</h2>
            <p className="mt-2 text-sm text-inksoft">{error}</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div
            ref={gridRef}
            className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                index={index}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="card mx-auto max-w-lg p-8 text-center md:p-12">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-surface2 text-brand">
                <Search className="h-7 w-7" />
              </span>
              <h2 className="mt-5 text-xl font-extrabold text-ink">Produk tidak ditemukan</h2>
              <p className="mt-2 text-sm text-inksoft">
                Coba kata kunci lain, atau pilih kategori yang berbeda.
              </p>
              <button onClick={resetFilter} className="btn btn-primary mt-6">
                Tampilkan semua bibit
              </button>
            </div>
          </Reveal>
        )}
      </section>
    </div>
  );
};

export default Products;
