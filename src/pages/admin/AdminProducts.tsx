import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Loader2,
  Star,
  AlertCircle,
  Eye,
  EyeOff,
  Check,
  X,
  CheckCircle2,
  PackageSearch,
} from 'lucide-react';
import { fetchProducts, FALLBACK_IMAGE } from '../../lib/api';
import { deleteProduct, toggleProductAvailability, updateProductStock } from '../../lib/admin';
import { formatRupiah, toNumber, adaDiskon, hargaJual, diskonPersen } from '../../lib/utils';
import { fotoProduk } from '../../lib/image';
import type { Product } from '../../types';

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'semua' | 'tanpa-foto' | 'stok-0' | 'diskon' | 'disembunyikan'>('semua');
  const [busyId, setBusyId] = useState<number | null>(null);
  const [stockEdit, setStockEdit] = useState<{ id: number; value: string } | null>(null);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      setProducts(await fetchProducts());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat produk.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      const tanpaFoto = product.images.length === 0 || product.images[0] === FALLBACK_IMAGE;
      if (filter === 'tanpa-foto' && !tanpaFoto) return false;
      if (filter === 'stok-0' && product.stock !== 0) return false;
      if (filter === 'diskon' && !adaDiskon(product)) return false;
      if (filter === 'disembunyikan' && product.isAvailable) return false;
      if (!q) return true;
      return product.name.toLowerCase().includes(q) || product.category.toLowerCase().includes(q);
    });
  }, [products, query, filter]);

  const jumlah = useMemo(
    () => ({
      tanpaFoto: products.filter((p) => p.images.length === 0 || p.images[0] === FALLBACK_IMAGE).length,
      stok0: products.filter((p) => p.stock === 0).length,
      diskon: products.filter((p) => adaDiskon(p)).length,
      disembunyikan: products.filter((p) => !p.isAvailable).length,
    }),
    [products],
  );

  const filters: { id: typeof filter; label: string; jumlah: number }[] = [
    { id: 'semua', label: 'Semua', jumlah: products.length },
    { id: 'tanpa-foto', label: 'Belum ada foto', jumlah: jumlah.tanpaFoto },
    { id: 'stok-0', label: 'Stok 0', jumlah: jumlah.stok0 },
    { id: 'diskon', label: 'Sedang diskon', jumlah: jumlah.diskon },
    { id: 'disembunyikan', label: 'Disembunyikan', jumlah: jumlah.disembunyikan },
  ];

  const handleDelete = async (product: Product) => {
    const confirmed = window.confirm(
      `Hapus "${product.name}"? Produk beserta fotonya akan dihapus permanen.`,
    );
    if (!confirmed) return;

    setBusyId(product.id);
    setError('');
    try {
      await deleteProduct(product.id);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
      setNotice(`"${product.name}" berhasil dihapus.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menghapus produk.');
    } finally {
      setBusyId(null);
    }
  };

  const startStockEdit = (product: Product) => {
    setStockEdit({ id: product.id, value: String(product.stock) });
  };

  const saveStock = async (product: Product) => {
    if (!stockEdit) return;

    const next = Math.max(0, Math.round(toNumber(stockEdit.value)));
    if (next === product.stock) {
      setStockEdit(null);
      return;
    }

    setBusyId(product.id);
    setError('');
    try {
      await updateProductStock(product.id, next);
      setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, stock: next } : p)));
      setNotice(`Stok "${product.name}" diubah menjadi ${next}.`);
      setStockEdit(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menyimpan stok.');
    } finally {
      setBusyId(null);
    }
  };

  const handleToggle = async (product: Product) => {
    setBusyId(product.id);
    setError('');
    try {
      const next = !product.isAvailable;
      await toggleProductAvailability(product.id, next);
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, isAvailable: next } : p)),
      );
      setNotice(
        next
          ? `"${product.name}" kembali ditampilkan di katalog.`
          : `"${product.name}" disembunyikan dari katalog.`,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengubah status.');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-5 md:space-y-6">
      {/* ---------------------------------------------------- HEADER */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="display text-2xl text-ink md:text-3xl">Produk</h1>
          <p className="mt-1 text-sm text-inksoft">
            {loading ? 'Memuat katalog…' : `${products.length} produk di katalog.`}
          </p>
        </div>
        <Link to="/admin/produk/baru" className="btn btn-primary">
          <Plus className="h-4 w-4" /> Tambah Produk
        </Link>
      </div>

      {/* ---------------------------------------------------- FILTER */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-inksoft" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama produk atau kategori..."
            className="field pl-11"
          />
        </div>

        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 sm:flex-wrap">
          {filters.map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              aria-pressed={filter === item.id}
              className={`chip ${filter === item.id ? 'chip-active' : ''}`}
            >
              {item.label}
              <span
                className={`rounded-full px-1.5 text-[11px] ${
                  filter === item.id ? 'bg-black/15' : 'bg-surface2 text-inksoft'
                }`}
              >
                {item.jumlah}
              </span>
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="alert bg-dangersoft text-danger">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span className="text-xs md:text-sm">{error}</span>
        </div>
      )}
      {notice && (
        <div className="alert bg-successsoft text-success">
          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span className="text-xs md:text-sm">{notice}</span>
        </div>
      )}

      {/* ------------------------------------------------------ LIST */}
      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-24" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="panel py-14 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-surface2 text-inksoft">
            <PackageSearch className="h-7 w-7" />
          </span>
          <p className="mx-auto mt-4 max-w-sm text-sm text-inksoft">
            {products.length === 0
              ? 'Belum ada produk. Jalankan script seed dulu atau tambah produk baru.'
              : 'Tidak ada produk yang cocok dengan pencarian atau filter ini.'}
          </p>
          {products.length > 0 && (
            <button
              onClick={() => {
                setQuery('');
                setFilter('semua');
              }}
              className="btn btn-outline mt-5"
            >
              Tampilkan semua produk
            </button>
          )}
        </div>
      ) : (
        <ul className="panel overflow-hidden p-0">
          {filtered.map((product) => (
            <li key={product.id} className="row row-hover flex-wrap md:flex-nowrap">
              <Link
                to={`/admin/produk/${product.id}`}
                className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-surface2"
              >
                <img
                  src={fotoProduk(product.images[0] ?? FALLBACK_IMAGE, 160)}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </Link>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Link
                    to={`/admin/produk/${product.id}`}
                    className="truncate text-sm font-bold text-ink hover:text-brand"
                  >
                    {product.name}
                  </Link>
                  {product.isFeatured && (
                    <Star className="h-3.5 w-3.5 flex-shrink-0 fill-amber-400 text-amber-400" />
                  )}
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-inksoft">
                  <span>{product.category || 'Tanpa kategori'}</span>
                  <span className="text-line">·</span>
                  {adaDiskon(product) ? (
                    <span className="flex items-center gap-1">
                      <span className="line-through">{formatRupiah(product.price)}</span>
                      <span className="font-bold text-promo">{formatRupiah(hargaJual(product))}</span>
                    </span>
                  ) : (
                    <span>{formatRupiah(product.price)}</span>
                  )}
                  <span className="text-line">·</span>
                  {stockEdit?.id === product.id ? (
                    <span className="flex items-center gap-1">
                      <input
                        type="text"
                        inputMode="numeric"
                        autoFocus
                        value={stockEdit.value}
                        onChange={(e) => setStockEdit({ id: product.id, value: e.target.value })}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            void saveStock(product);
                          }
                          if (e.key === 'Escape') setStockEdit(null);
                        }}
                        className="w-16 rounded-lg border border-line bg-surface px-2 py-1 text-xs font-bold text-ink focus:border-brand focus:outline-none"
                        aria-label="Jumlah stok"
                      />
                      <button
                        type="button"
                        onClick={() => void saveStock(product)}
                        disabled={busyId === product.id}
                        title="Simpan stok"
                        className="grid h-7 w-7 place-items-center rounded-lg text-brand hover:bg-brandsoft disabled:opacity-40"
                      >
                        {busyId === product.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Check className="h-3.5 w-3.5" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setStockEdit(null)}
                        title="Batal"
                        className="grid h-7 w-7 place-items-center rounded-lg text-inksoft hover:bg-surface2"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => startStockEdit(product)}
                      title="Klik untuk ubah stok"
                      className="font-bold text-brand underline-offset-2 hover:underline"
                    >
                      stok {product.stock}
                    </button>
                  )}
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span
                    className={`badge ${
                      product.isAvailable
                        ? 'bg-successsoft text-success'
                        : 'bg-surface2 text-inksoft'
                    }`}
                  >
                    {product.isAvailable ? 'Tampil' : 'Disembunyikan'}
                  </span>
                  {adaDiskon(product) && (
                    <span className="badge bg-promosoft text-promo">
                      Diskon {diskonPersen(product)}%
                    </span>
                  )}
                  {product.stock === 0 && (
                    <span className="badge bg-warnsoft text-warn">Stok kosong</span>
                  )}
                </div>
              </div>

              <div className="flex w-full flex-shrink-0 items-center justify-end gap-1 border-t border-line pt-3 md:w-auto md:border-0 md:pt-0">
                <button
                  onClick={() => handleToggle(product)}
                  disabled={busyId === product.id}
                  title={product.isAvailable ? 'Sembunyikan dari katalog' : 'Tampilkan di katalog'}
                  aria-label={product.isAvailable ? 'Sembunyikan' : 'Tampilkan'}
                  className="icon-btn h-9 w-9 bg-surface2/60 hover:bg-surface2"
                >
                  {product.isAvailable ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
                <Link
                  to={`/admin/produk/${product.id}`}
                  title="Ubah produk"
                  aria-label={`Ubah ${product.name}`}
                  className="icon-btn h-9 w-9 bg-surface2/60 hover:bg-surface2"
                >
                  <Pencil className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => handleDelete(product)}
                  disabled={busyId === product.id}
                  title="Hapus produk"
                  aria-label={`Hapus ${product.name}`}
                  className="icon-btn h-9 w-9 bg-surface2/60 text-danger hover:bg-dangersoft hover:text-danger"
                >
                  {busyId === product.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminProducts;
