import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Loader2, Check, X, Pencil, AlertCircle, Tags, CheckCircle2 } from 'lucide-react';
import { fetchCategories } from '../../lib/api';
import {
  createCategory,
  updateCategory,
  deleteCategory,
  fetchCategoryProductCounts,
} from '../../lib/admin';
import type { Category } from '../../types';

const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [counts, setCounts] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);

  const [newName, setNewName] = useState('');

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const [categoryList, productCounts] = await Promise.all([
        fetchCategories(),
        fetchCategoryProductCounts(),
      ]);
      setCategories(categoryList);
      setCounts(productCounts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat kategori.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const handleAdd = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newName.trim()) return;

    setBusy(true);
    setError('');
    setNotice('');
    try {
      await createCategory(newName);
      setNewName('');
      setNotice('Kategori berhasil ditambahkan.');
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menambah kategori.');
    } finally {
      setBusy(false);
    }
  };

  const startEdit = (category: Category) => {
    setEditingId(category.id);
    setEditName(category.name);
  };

  const handleUpdate = async (id: number) => {
    if (!editName.trim()) return;

    setBusy(true);
    setError('');
    setNotice('');
    try {
      await updateCategory(id, editName);
      setEditingId(null);
      setNotice('Kategori berhasil diperbarui.');
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memperbarui kategori.');
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (category: Category) => {
    const used = counts[category.id] ?? 0;
    const message =
      used > 0
        ? `Hapus kategori "${category.name}"? ${used} produk di dalamnya tidak terhapus, hanya kehilangan kategorinya.`
        : `Hapus kategori "${category.name}"?`;

    if (!window.confirm(message)) return;

    setBusy(true);
    setError('');
    setNotice('');
    try {
      await deleteCategory(category.id);
      setNotice(`Kategori "${category.name}" dihapus.`);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menghapus kategori.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-5 md:space-y-6">
      {/* ---------------------------------------------------- HEADER */}
      <div>
        <h1 className="display text-2xl text-ink md:text-3xl">Kategori</h1>
        <p className="mt-1 text-sm text-inksoft">
          Kategori yang tampil sebagai tombol filter di halaman produk. Urutannya otomatis A–Z,
          tidak perlu diatur.
        </p>
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

      {/* --------------------------------------------- TAMBAH KATEGORI */}
      <form onSubmit={handleAdd} className="panel space-y-4">
        <h2 className="panel-title">
          <Plus className="h-4 w-4 text-brand" /> Tambah Kategori
        </h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <label htmlFor="kategori-baru" className="field-label">
              Nama kategori
            </label>
            <input
              id="kategori-baru"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Misalnya Rambutan"
              className="field"
            />
          </div>
          <button
            type="submit"
            disabled={busy || !newName.trim()}
            className="btn btn-primary flex-shrink-0 sm:self-end"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Tambah
          </button>
        </div>
      </form>

      {/* ------------------------------------------------ DAFTAR KATEGORI */}
      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton h-20" />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="panel py-14 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-surface2 text-inksoft">
            <Tags className="h-7 w-7" />
          </span>
          <p className="mt-4 text-sm text-inksoft">
            Belum ada kategori. Tambahkan lewat formulir di atas.
          </p>
        </div>
      ) : (
        <ul className="panel overflow-hidden p-0">
          {categories.map((category) => (
            <li key={category.id} className="row flex-wrap md:flex-nowrap">
              {editingId === category.id ? (
                <>
                  <div className="min-w-0 flex-1">
                    <label className="field-label">Nama kategori</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="field"
                    />
                  </div>
                  <div className="flex items-center gap-1 md:self-end md:pb-1">
                    <button
                      onClick={() => void handleUpdate(category.id)}
                      disabled={busy}
                      className="icon-btn h-9 w-9 bg-brandsoft text-brand hover:bg-brand hover:text-onbrand"
                      title="Simpan"
                      aria-label="Simpan kategori"
                    >
                      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="icon-btn h-9 w-9 bg-surface2/60"
                      title="Batal"
                      aria-label="Batal mengubah"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl bg-brandsoft text-brand">
                    <Tags className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-bold text-ink">{category.name}</div>
                    <div className="mt-0.5 text-xs text-inksoft">
                      /{category.slug} · {counts[category.id] ?? 0} produk
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-1">
                    <button
                      onClick={() => startEdit(category)}
                      className="icon-btn h-9 w-9 bg-surface2/60 hover:bg-surface2"
                      title="Ubah kategori"
                      aria-label={`Ubah ${category.name}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => void handleDelete(category)}
                      disabled={busy}
                      className="icon-btn h-9 w-9 bg-surface2/60 text-danger hover:bg-dangersoft hover:text-danger"
                      title="Hapus kategori"
                      aria-label={`Hapus ${category.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      <p className="flex items-start gap-2 text-xs leading-relaxed text-inksoft">
        <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
        Menghapus kategori tidak menghapus produknya. Produk tersebut menjadi tanpa kategori dan
        tetap muncul di katalog.
      </p>
    </div>
  );
};

export default AdminCategories;
