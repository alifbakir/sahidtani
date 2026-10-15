import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Tags,
  AlertTriangle,
  Star,
  Loader2,
  Plus,
  ArrowRight,
  Camera,
  EyeOff,
  ArrowUpRight,
} from 'lucide-react';
import { fetchProducts, fetchCategories, FALLBACK_IMAGE } from '../../lib/api';
import { formatRupiah } from '../../lib/utils';
import { fotoProduk } from '../../lib/image';
import type { Product, Category } from '../../types';

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const [productList, categoryList] = await Promise.all([fetchProducts(), fetchCategories()]);
        if (!active) return;
        setProducts(productList);
        setCategories(categoryList);
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : 'Gagal memuat data.');
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-9 w-52" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-36" />
          ))}
        </div>
        <div className="skeleton h-56" />
        <div className="flex items-center gap-3 text-sm text-inksoft">
          <Loader2 className="h-4 w-4 animate-spin text-brand" /> Memuat data katalog…
        </div>
      </div>
    );
  }

  const outOfStock = products.filter((p) => p.stock === 0);
  // Foto kosong terdeteksi dari gambar cadangan yang dipasang lapisan data.
  const tanpaFoto = products.filter((p) => p.images.length === 0 || p.images[0] === FALLBACK_IMAGE);
  const unavailable = products.filter((p) => !p.isAvailable);
  const featured = products.filter((p) => p.isFeatured);

  const stats = [
    { label: 'Total Produk', value: products.length, icon: Package, tone: 'bg-brandsoft text-brand' },
    { label: 'Kategori', value: categories.length, icon: Tags, tone: 'bg-infosoft text-info' },
    { label: 'Stok 0', value: outOfStock.length, icon: AlertTriangle, tone: 'bg-warnsoft text-warn' },
    { label: 'Tampil di Beranda', value: featured.length, icon: Star, tone: 'bg-accentsoft text-accent' },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      {/* ---------------------------------------------------- HEADER */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="display text-2xl text-ink md:text-3xl">Ringkasan</h1>
          <p className="mt-1 text-sm text-inksoft">Kondisi katalog Sahid Tani saat ini.</p>
        </div>
        <Link to="/admin/produk/baru" className="btn btn-primary">
          <Plus className="h-4 w-4" /> Tambah Produk
        </Link>
      </div>

      {error && (
        <div className="alert bg-dangersoft text-danger">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span className="text-xs md:text-sm">{error}</span>
        </div>
      )}

      {/* ------------------------------------------------------ STAT */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="panel p-4 md:p-5">
            <span className={`grid h-10 w-10 place-items-center rounded-2xl ${stat.tone}`}>
              <stat.icon className="h-5 w-5" />
            </span>
            <div className="mt-4 text-3xl font-black leading-none text-ink">{stat.value}</div>
            <div className="mt-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-inksoft md:text-[11px]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ---------------------------------------------------- AKSI CEPAT */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            to: '/admin/produk',
            icon: Package,
            title: 'Kelola produk',
            desc: 'Ubah harga, stok, dan status tampil tiap produk.',
          },
          {
            to: '/admin/kategori',
            icon: Tags,
            title: 'Kelola kategori',
            desc: 'Kategori dipakai sebagai tombol filter di katalog.',
          },
          {
            to: '/admin/produk/baru',
            icon: Plus,
            title: 'Produk baru',
            desc: 'Tambah bibit baru lengkap dengan foto dan panduan tanam.',
          },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="card group flex items-start gap-4 p-4 transition-colors hover:border-brand md:p-5"
          >
            <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-2xl bg-surface2 text-brand">
              <item.icon className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-1.5 text-sm font-extrabold text-ink">
                {item.title}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-60" />
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-inksoft">{item.desc}</span>
            </span>
          </Link>
        ))}
      </div>

      {/* -------------------------------------------------- PERLU DIBERESI */}
      {tanpaFoto.length > 0 && (
        <section className="panel p-0">
          <div className="border-b border-line px-5 py-4 md:px-6">
            <h2 className="panel-title">
              <Camera className="h-4 w-4 text-promo" /> Foto belum ada ({tanpaFoto.length} produk)
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-inksoft">
              Produk ini masih memakai logo sebagai gambar. Buka produknya, unggah foto asli, lalu
              simpan.
            </p>
          </div>
          <ul>
            {tanpaFoto.map((product) => (
              <li key={product.id} className="row row-hover">
                <img
                  src={fotoProduk(product.images[0] ?? FALLBACK_IMAGE, 160)}
                  alt=""
                  className="h-11 w-11 flex-shrink-0 rounded-xl bg-surface2 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-ink">{product.name}</div>
                  <div className="text-xs text-inksoft">{product.category || 'Tanpa kategori'}</div>
                </div>
                <Link
                  to={`/admin/produk/${product.id}`}
                  className="btn btn-outline btn-sm flex-shrink-0"
                >
                  Unggah <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {outOfStock.length > 0 && (
        <section className="panel p-0">
          <div className="border-b border-line px-5 py-4 md:px-6">
            <h2 className="panel-title">
              <AlertTriangle className="h-4 w-4 text-warn" /> Produk dengan stok 0
            </h2>
            <p className="mt-1 text-xs text-inksoft">
              Pembeli tidak bisa memesan produk ini sampai stoknya diisi.
            </p>
          </div>
          <ul>
            {outOfStock.slice(0, 8).map((product) => (
              <li key={product.id} className="row row-hover">
                <img
                  src={fotoProduk(product.images[0] ?? FALLBACK_IMAGE, 160)}
                  alt=""
                  className="h-11 w-11 flex-shrink-0 rounded-xl bg-surface2 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-bold text-ink">{product.name}</div>
                  <div className="text-xs text-inksoft">
                    {product.category || 'Tanpa kategori'} · {formatRupiah(product.price)}
                  </div>
                </div>
                <Link
                  to={`/admin/produk/${product.id}`}
                  className="btn btn-outline btn-sm flex-shrink-0"
                >
                  Atur stok <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {unavailable.length > 0 && (
        <p className="flex items-center gap-2 text-xs text-inksoft">
          <EyeOff className="h-4 w-4 flex-shrink-0" />
          {unavailable.length} produk sedang ditandai tidak tersedia dan disembunyikan dari katalog.
        </p>
      )}
    </div>
  );
};

export default AdminDashboard;
