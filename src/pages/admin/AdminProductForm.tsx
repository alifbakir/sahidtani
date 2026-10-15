import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Loader2,
  Upload,
  X,
  Star,
  AlertCircle,
  CheckCircle2,
  Save,
  ImagePlus,
  Info,
} from 'lucide-react';
import { fetchCategories, fetchProduct, FALLBACK_IMAGE } from '../../lib/api';
import {
  createProduct,
  updateProduct,
  uploadProductImage,
  discardUploadedImage,
} from '../../lib/admin';
import { slugify, toNumber } from '../../lib/utils';
import { fotoProduk } from '../../lib/image';
import type { Category, ProductInput } from '../../types';

const emptyForm: ProductInput = {
  name: '',
  slug: '',
  price: 0,
  discountPrice: null,
  categoryId: null,
  rating: 5,
  stock: 0,
  isAvailable: true,
  isFeatured: false,
  sortOrder: 0,
  description: '',
  fruitFeatures: '',
  plantFeatures: '',
  plantingGuide: '',
  careGuide: '',
  images: [],
};

const AdminProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<ProductInput>(emptyForm);
  const [priceText, setPriceText] = useState('0');
  const [promoText, setPromoText] = useState('');
  const [stockText, setStockText] = useState('0');
  const [ratingText, setRatingText] = useState('5');
  const [sortText, setSortText] = useState('0');
  const [slugTouched, setSlugTouched] = useState(false);

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const originalImages = useRef<string[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const categoryList = await fetchCategories();
        if (active) setCategories(categoryList);
      } catch {
        // kategori gagal dimuat bukan alasan untuk memblokir form
      }

      if (!isEdit) {
        setLoading(false);
        return;
      }

      try {
        const product = await fetchProduct(String(id));
        if (!active) return;
        if (!product) {
          setError('Produk tidak ditemukan.');
          return;
        }

        originalImages.current = product.images;
        setForm({
          name: product.name,
          slug: product.slug,
          price: product.price,
          discountPrice: product.discountPrice,
          categoryId: product.categoryId,
          rating: product.rating,
          stock: product.stock,
          isAvailable: product.isAvailable,
          isFeatured: product.isFeatured,
          sortOrder: product.sortOrder,
          description: product.description,
          fruitFeatures: product.fruitFeatures,
          plantFeatures: product.plantFeatures,
          plantingGuide: product.plantingGuide,
          careGuide: product.careGuide,
          images: product.images,
        });
        setPriceText(String(product.price));
        setPromoText(product.discountPrice === null ? '' : String(product.discountPrice));
        setStockText(String(product.stock));
        setRatingText(String(product.rating));
        setSortText(String(product.sortOrder));
        setSlugTouched(true);
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : 'Gagal memuat produk.');
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [id, isEdit]);

  // Pratinjau diskon, supaya admin tahu besar potongannya sebelum menyimpan.
  const priceAngka = toNumber(priceText);
  const promoAngka = promoText.trim() === '' ? null : toNumber(promoText.trim());
  const promoValid =
    promoAngka === null || (priceAngka > 0 && promoAngka > 0 && promoAngka < priceAngka);
  const potonganPersen =
    promoAngka !== null && promoValid && priceAngka > 0
      ? Math.round(((priceAngka - promoAngka) / priceAngka) * 100)
      : 0;
  const pesanPromo = (() => {
    if (promoAngka === null) return 'Kosongkan kalau produk tidak sedang diskon.';
    if (priceAngka <= 0) return 'Isi harga normal dulu.';
    if (promoAngka <= 0) return 'Harga promo harus lebih dari 0.';
    if (promoAngka >= priceAngka) return 'Harga promo harus lebih murah dari harga normal.';
    return `Pembeli hemat ${potonganPersen}% (Rp ${(priceAngka - promoAngka).toLocaleString('id-ID')}). Harga normal akan dicoret di katalog.`;
  })();

  const update = <K extends keyof ProductInput>(key: K, value: ProductInput[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleNameChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      name: value,
      slug: slugTouched ? prev.slug : slugify(value),
    }));
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setError('');
    try {
      const folder = slugify(form.name) || 'umum';
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        uploaded.push(await uploadProductImage(file, folder));
      }
      setForm((prev) => ({ ...prev, images: [...prev.images, ...uploaded] }));
      setNotice(`${uploaded.length} foto berhasil diunggah.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload foto gagal.');
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = '';
    }
  };

  const removeImage = async (url: string) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((img) => img !== url) }));

    // Foto yang baru diupload di sesi ini langsung dibuang dari Storage.
    // Foto lama dibersihkan saat tombol Simpan ditekan.
    if (!originalImages.current.includes(url)) {
      try {
        await discardUploadedImage(url);
      } catch {
        // gagal hapus di Storage tidak menghalangi admin
      }
    }
  };

  const makeCover = (url: string) => {
    setForm((prev) => ({
      ...prev,
      images: [url, ...prev.images.filter((img) => img !== url)],
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setNotice('');

    const name = form.name.trim();
    if (!name) {
      setError('Nama produk wajib diisi.');
      return;
    }

    const price = toNumber(priceText);
    if (price <= 0) {
      setError('Harga harus lebih dari 0.');
      return;
    }

    const promoMentah = promoText.trim();
    const discountPrice = promoMentah === '' ? null : toNumber(promoMentah);
    if (discountPrice !== null && (discountPrice <= 0 || discountPrice >= price)) {
      setError('Harga promo harus lebih dari 0 dan lebih murah dari harga normal.');
      return;
    }

    const payload: ProductInput = {
      ...form,
      name,
      slug: form.slug.trim() || slugify(name),
      price,
      discountPrice,
      stock: toNumber(stockText),
      rating: Math.min(5, Math.max(0, toNumber(ratingText, 5))),
      sortOrder: toNumber(sortText),
    };

    setSaving(true);
    try {
      if (isEdit) {
        await updateProduct(Number(id), payload, originalImages.current);
      } else {
        await createProduct(payload);
      }
      navigate('/admin/produk');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menyimpan produk.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="skeleton h-10 w-64" />
        <div className="skeleton h-64" />
        <div className="skeleton h-72" />
      </div>
    );
  }

  const labelCls = 'field-label';

  return (
    <form onSubmit={handleSubmit} className="space-y-5 pb-28 md:space-y-6 md:pb-6">
      {/* ---------------------------------------------------- HEADER */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Link to="/admin/produk" className="icon-btn mt-0.5 bg-surface2/60" aria-label="Kembali">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="display text-2xl text-ink md:text-3xl">
              {isEdit ? 'Ubah Produk' : 'Tambah Produk'}
            </h1>
            <p className="mt-1 text-sm text-inksoft">
              Perubahan langsung tampil di web setelah disimpan.
            </p>
          </div>
        </div>
        <button type="submit" disabled={saving || uploading} className="btn btn-primary hidden md:inline-flex">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? 'Menyimpan…' : 'Simpan Produk'}
        </button>
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

      {/* ---------------- FOTO ---------------- */}
      <section className="panel">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="panel-title">
            <ImagePlus className="h-4 w-4 text-brand" /> Foto Produk
          </h2>
          <span className="text-xs text-inksoft">
            {form.images.length > 0 ? `${form.images.length} foto` : 'Belum ada foto'}
          </span>
        </div>

        {form.images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {form.images.map((url, index) => (
              <div
                key={url}
                className="group relative overflow-hidden rounded-2xl border border-line bg-surface2"
              >
                <img
                  src={fotoProduk(url || FALLBACK_IMAGE, 320)}
                  alt={`Foto ${index + 1}`}
                  className="aspect-square w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => void removeImage(url)}
                  className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-deep/70 text-white transition-opacity hover:bg-deep md:opacity-0 md:group-hover:opacity-100"
                  title="Hapus foto"
                  aria-label={`Hapus foto ${index + 1}`}
                >
                  <X className="h-4 w-4" />
                </button>
                {index === 0 ? (
                  <span className="absolute bottom-2 left-2 badge bg-brand text-onbrand">
                    Foto utama
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => makeCover(url)}
                    className="absolute bottom-2 left-2 badge bg-surface/90 text-ink backdrop-blur-sm transition-opacity md:opacity-0 md:group-hover:opacity-100"
                  >
                    <Star className="h-3 w-3" /> Jadikan utama
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => void handleFiles(e.target.files)}
        />
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          disabled={uploading}
          className="mt-4 flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-line py-8 text-inksoft transition-colors hover:border-brand hover:text-brand disabled:opacity-60"
        >
          {uploading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Upload className="h-6 w-6" />}
          <span className="text-xs font-bold">
            {uploading ? 'Mengunggah & mengompres foto…' : 'Ketuk untuk pilih foto (bisa banyak sekaligus)'}
          </span>
          <span className="text-[10px] text-inkfaint">
            Foto otomatis dikompres ke maksimal 1600px supaya hemat kuota
          </span>
        </button>
      </section>

      {/* ---------------- DATA UTAMA ---------------- */}
      <section className="panel space-y-5">
        <h2 className="panel-title">
          <Info className="h-4 w-4 text-brand" /> Data Utama
        </h2>

        <div>
          <label htmlFor="nama-produk" className={labelCls}>
            Nama Produk
          </label>
          <input
            id="nama-produk"
            type="text"
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="field"
            placeholder="Bibit Durian Bawor"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="harga" className={labelCls}>
              Harga (Rp)
            </label>
            <input
              id="harga"
              type="text"
              inputMode="numeric"
              value={priceText}
              onChange={(e) => setPriceText(e.target.value)}
              className="field"
              placeholder="85000"
            />
          </div>
          <div>
            <label htmlFor="kategori" className={labelCls}>
              Kategori
            </label>
            <select
              id="kategori"
              value={form.categoryId === null ? '' : String(form.categoryId)}
              onChange={(e) => update('categoryId', e.target.value === '' ? null : Number(e.target.value))}
              className="field cursor-pointer"
            >
              <option value="">Tanpa kategori</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="promo" className={labelCls}>
            Harga Promo (opsional)
          </label>
          <input
            id="promo"
            type="text"
            inputMode="numeric"
            value={promoText}
            onChange={(e) => setPromoText(e.target.value)}
            className="field"
            placeholder="misalnya 65000"
          />
          <p className={`field-hint ${promoValid ? '' : '!text-danger'}`}>{pesanPromo}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="stok" className={labelCls}>
              Stok
            </label>
            <input
              id="stok"
              type="text"
              inputMode="numeric"
              value={stockText}
              onChange={(e) => setStockText(e.target.value)}
              className="field"
            />
          </div>
          <div>
            <label htmlFor="rating" className={labelCls}>
              Rating (0-5)
            </label>
            <input
              id="rating"
              type="text"
              inputMode="decimal"
              value={ratingText}
              onChange={(e) => setRatingText(e.target.value)}
              className="field"
            />
          </div>
          <div>
            <label htmlFor="urutan" className={labelCls}>
              Urutan Tampil
            </label>
            <input
              id="urutan"
              type="text"
              inputMode="numeric"
              value={sortText}
              onChange={(e) => setSortText(e.target.value)}
              className="field"
            />
          </div>
        </div>

        <div>
          <label htmlFor="slug" className={labelCls}>
            Alamat URL (slug)
          </label>
          <input
            id="slug"
            type="text"
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              update('slug', slugify(e.target.value));
            }}
            className="field"
            placeholder="bibit-durian-bawor"
          />
          <p className="field-hint">Alamat halaman produk: /produk/{form.slug || 'slug-produk'}</p>
        </div>

        <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:gap-8">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={form.isAvailable}
              onChange={(e) => update('isAvailable', e.target.checked)}
              className="h-5 w-5 rounded-md accent-[#156a3e]"
            />
            <span className="text-sm font-bold text-ink">Tampilkan di katalog</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) => update('isFeatured', e.target.checked)}
              className="h-5 w-5 rounded-md accent-[#156a3e]"
            />
            <span className="text-sm font-bold text-ink">Tampilkan di beranda (unggulan)</span>
          </label>
        </div>
      </section>

      {/* ---------------- DESKRIPSI ---------------- */}
      <section className="panel space-y-5">
        <h2 className="panel-title">
          <Info className="h-4 w-4 text-brand" /> Deskripsi &amp; Panduan
        </h2>

        <div>
          <label htmlFor="deskripsi" className={labelCls}>
            Deskripsi Produk
          </label>
          <textarea
            id="deskripsi"
            rows={4}
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            className="field"
            placeholder="Pepaya unggulan yang populer di Indonesia..."
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="ciri-buah" className={labelCls}>
              Ciri-Ciri Buah
            </label>
            <textarea
              id="ciri-buah"
              rows={3}
              value={form.fruitFeatures}
              onChange={(e) => update('fruitFeatures', e.target.value)}
              className="field"
            />
          </div>
          <div>
            <label htmlFor="ciri-tanaman" className={labelCls}>
              Ciri-Ciri Tanaman
            </label>
            <textarea
              id="ciri-tanaman"
              rows={3}
              value={form.plantFeatures}
              onChange={(e) => update('plantFeatures', e.target.value)}
              className="field"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="cara-tanam" className={labelCls}>
              Cara Menanam
            </label>
            <textarea
              id="cara-tanam"
              rows={3}
              value={form.plantingGuide}
              onChange={(e) => update('plantingGuide', e.target.value)}
              className="field"
            />
          </div>
          <div>
            <label htmlFor="perawatan" className={labelCls}>
              Perawatan
            </label>
            <textarea
              id="perawatan"
              rows={3}
              value={form.careGuide}
              onChange={(e) => update('careGuide', e.target.value)}
              className="field"
            />
          </div>
        </div>
      </section>

      {/* ------------- BILAH SIMPAN (lengket di HP) ------------- */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/95 px-4 py-3 backdrop-blur-xl safe-bottom md:static md:inset-auto md:z-auto md:rounded-3xl md:border md:border-line md:bg-surface md:px-5 md:py-4 md:shadow-[var(--shadow-soft)]">
        <div className="flex items-center gap-3">
          <Link to="/admin/produk" className="btn btn-ghost flex-1 md:flex-none">
            Batal
          </Link>
          <button type="submit" disabled={saving || uploading} className="btn btn-primary flex-1">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? 'Menyimpan…' : 'Simpan Produk'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AdminProductForm;
