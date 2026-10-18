import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingCart,
  Info,
  Leaf,
  Sprout,
  Droplets,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Phone,
  ShieldCheck,
  Truck,
  ArrowRight,
} from 'lucide-react';
import { fetchProduct, fetchProducts } from '../lib/api';
import { hargaJual, diskonPersen } from '../lib/utils';
import { fotoProduk } from '../lib/image';
import { useMeta, fotoBagikan } from '../hooks/useMeta';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';

interface ProductDetailProps {
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [lainnya, setLainnya] = useState<Product[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeTab, setActiveTab] = useState<'deskripsi' | 'ciri' | 'tanam' | 'rawat'>('deskripsi');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showBar, setShowBar] = useState(true);

  // Sembunyikan bilah lengket saat footer terlihat, supaya tidak menutupi kontaknya.
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowBar(!entry.isIntersecting),
      { rootMargin: '0px 0px -15% 0px' },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, [product]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');

    (async () => {
      try {
        const found = await fetchProduct(String(id));
        if (!active) return;
        if (!found) {
          navigate('/produk', { replace: true });
          return;
        }
        setProduct(found);
        setActiveTab('deskripsi');
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : 'Gagal memuat produk.');
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [id, navigate]);

  // Rekomendasi: dahulukan bibit dari kategori yang sama.
  useEffect(() => {
    if (!product) return;
    let active = true;

    (async () => {
      try {
        const all = await fetchProducts();
        if (!active) return;
        const tersedia = all.filter((p) => p.isAvailable && p.id !== product.id);
        const sekategori = tersedia.filter((p) => p.category === product.category);
        const sisanya = tersedia.filter((p) => p.category !== product.category);
        setLainnya([...sekategori, ...sisanya].slice(0, 4));
      } catch {
        if (active) setLainnya([]);
      }
    })();

    return () => {
      active = false;
    };
  }, [product]);

  // ------------------------------------------------------ GALERI (geser)
  const jumlahFoto = product?.images.length ?? 0;

  /** Pindah ke slide ke-idx — dipakai tombol panah dan thumbnail. */
  const keSlide = (idx: number) => {
    const tujuan = Math.min(Math.max(idx, 0), Math.max(0, jumlahFoto - 1));
    setActiveIndex(tujuan);
    trackRef.current?.scrollTo({ left: (trackRef.current.clientWidth || 0) * tujuan, behavior: 'smooth' });
  };

  /** Geser manual (swipe di HP): selaraskan nomor foto yang aktif. */
  const saatGeser = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const idx = Math.round(track.scrollLeft / track.clientWidth);
    setActiveIndex(Math.min(Math.max(idx, 0), Math.max(0, jumlahFoto - 1)));
  };

  // Produk berganti → kembali ke foto pertama.
  useEffect(() => {
    setActiveIndex(0);
    trackRef.current?.scrollTo({ left: 0 });
  }, [product?.id]);

  // Layar diputar / diubah ukurannya → slide tidak boleh berhenti di tengah.
  useEffect(() => {
    const atur = () => {
      const track = trackRef.current;
      if (track) track.scrollTo({ left: track.clientWidth * activeIndex });
    };
    window.addEventListener('resize', atur);
    return () => window.removeEventListener('resize', atur);
  }, [activeIndex]);

  // Thumbnail aktif digeser ke tengah barisnya sendiri (tanpa menggeser halaman).
  useEffect(() => {
    const thumb = thumbRefs.current[activeIndex];
    const row = thumb?.parentElement;
    if (!thumb || !row || row.scrollWidth <= row.clientWidth) return;
    const kotakBaris = row.getBoundingClientRect();
    const kotakThumb = thumb.getBoundingClientRect();
    const tujuan = row.scrollLeft + (kotakThumb.left - kotakBaris.left) - (kotakBaris.width - kotakThumb.width) / 2;
    row.scrollTo({ left: Math.max(0, tujuan), behavior: 'smooth' });
  }, [activeIndex]);

  // Judul & deskripsi tab/berbagi mengikuti produk yang sedang dibuka.
  useMeta({
    judul: product
      ? `${product.name} — Rp ${hargaJual(product).toLocaleString('id-ID')} | Sahid Tani Salatiga`
      : 'Bibit Buah Unggul — Sahid Tani Salatiga',
    deskripsi: product
      ? `${product.name} dari Sahid Tani Salatiga. Harga Rp ${hargaJual(product).toLocaleString('id-ID')}. ${
          product.stock > 0 && product.isAvailable ? `Stok tersedia ${product.stock}.` : 'Stok sedang kosong.'
        } ${product.description}`.slice(0, 158)
      : undefined,
    gambar: fotoBagikan(product?.images[0]),
    kanonis: product ? `https://www.sahidtani.web.id/produk/${product.id}` : undefined,
  });

  if (loading) {
    return (
      <div className="shell grid gap-8 pt-[calc(var(--nav-tinggi)+1.25rem)] md:grid-cols-2 md:pt-36">
        <div className="skeleton aspect-square rounded-[2rem]" />
        <div className="space-y-4">
          <div className="skeleton h-6 w-28" />
          <div className="skeleton h-10 w-3/4" />
          <div className="skeleton h-8 w-1/2" />
          <div className="skeleton h-12 w-full" />
          <div className="skeleton h-32 w-full" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-dvh items-center justify-center px-4 pt-24">
        <div className="card max-w-md p-8 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-promosoft text-promo">
            <AlertCircle className="h-7 w-7" />
          </span>
          <h1 className="mt-5 text-xl font-extrabold text-ink">Produk tidak bisa ditampilkan</h1>
          <p className="mt-2 text-sm text-inksoft">{error || 'Produk tidak ditemukan.'}</p>
          <Link to="/produk" state={{ pulihkanGulir: true }} className="btn btn-primary mt-6">
            <ChevronLeft className="h-4 w-4" /> Kembali ke katalog
          </Link>
        </div>
      </div>
    );
  }

  const habis = product.stock <= 0;
  // Produk yang disembunyikan admin (atau stoknya kosong) tidak bisa dipesan.
  const bisaDipesan = product.isAvailable && !habis;
  const diskon = diskonPersen(product);
  const jual = hargaJual(product);
  const hemat = product.price - jual;

  const waLink = `https://wa.me/6285878412411?text=${encodeURIComponent(
    `Halo Sahid Tani, saya tertarik dengan bibit ${product.name}. Bisa tanya-tanya dulu?`,
  )}`;

  const tabs = [
    { id: 'deskripsi', label: 'Deskripsi', icon: Info },
    { id: 'ciri', label: 'Ciri-ciri', icon: Leaf },
    { id: 'tanam', label: 'Cara menanam', icon: Sprout },
    { id: 'rawat', label: 'Perawatan', icon: Droplets },
  ] as const;

  const labelTombol = product.isAvailable ? (habis ? 'Stok habis' : 'Tambah ke keranjang') : 'Tidak tersedia';

  return (
    <div className="pb-32 md:pb-20">
      <div className="shell pt-[calc(var(--nav-tinggi)+1.25rem)] md:pt-36">
        <Link
          to="/produk"
          state={{ pulihkanGulir: true }}
          className="inline-flex min-h-10 items-center gap-2 text-sm font-bold text-inksoft transition-colors hover:text-brand"
        >
          <ChevronLeft className="h-4 w-4" /> Kembali ke katalog
        </Link>

        {/* grid-cols-1 (bukan kolom otomatis) supaya baris tab yang panjang
            tidak melebarkan seluruh halaman di layar HP. */}
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
          {/* --------------------------------------------------- GALERI */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-line bg-surface2 md:rounded-[2rem]">
              {/* Satu foto per layar: di HP cukup diusap ke kiri/kanan. */}
              <div
                ref={trackRef}
                onScroll={saatGeser}
                role="group"
                aria-roledescription="carousel"
                aria-label={`Foto ${product.name}`}
                className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
              >
                {product.images.map((img, idx) => (
                  <div
                    key={img + idx}
                    aria-hidden={idx !== activeIndex}
                    className="relative aspect-square w-full flex-shrink-0 snap-center snap-always"
                  >
                    <img
                      src={fotoProduk(img, 900)}
                      alt={`${product.name} foto ${idx + 1}`}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                      draggable={false}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                ))}
              </div>

              {diskon > 0 && (
                <span className="badge absolute left-4 top-4 bg-promo text-white shadow-sm">
                  Diskon {diskon}%
                </span>
              )}
              {habis && (
                <span className="badge absolute right-4 top-4 bg-ink/85 text-canvas backdrop-blur-sm">
                  Stok habis
                </span>
              )}

              {jumlahFoto > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => keSlide(activeIndex - 1)}
                    disabled={activeIndex === 0}
                    aria-label="Foto sebelumnya"
                    className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface/90 text-ink shadow-sm backdrop-blur transition hover:bg-surface disabled:pointer-events-none disabled:opacity-0 md:grid"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => keSlide(activeIndex + 1)}
                    disabled={activeIndex === jumlahFoto - 1}
                    aria-label="Foto berikutnya"
                    className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface/90 text-ink shadow-sm backdrop-blur transition hover:bg-surface disabled:pointer-events-none disabled:opacity-0 md:grid"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <span className="badge pointer-events-none absolute bottom-3 right-3 bg-ink/70 text-canvas md:hidden">
                    {activeIndex + 1}/{jumlahFoto}
                  </span>
                </>
              )}
            </div>

            {jumlahFoto > 1 && (
              <div className="no-scrollbar mt-3 flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={img + idx}
                    type="button"
                    ref={(el) => {
                      thumbRefs.current[idx] = el;
                    }}
                    onClick={() => keSlide(idx)}
                    aria-label={`Foto ${idx + 1} dari ${jumlahFoto}`}
                    aria-current={activeIndex === idx}
                    className={`h-18 w-18 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition-all ${
                      activeIndex === idx
                        ? 'border-brand opacity-100'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={fotoProduk(img, 160)}
                      alt=""
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ---------------------------------------------------- INFO */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="badge bg-brandsoft text-brand">{product.category || 'Bibit'}</span>
              <span className="inline-flex items-center gap-1 text-sm font-bold text-ink">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> {product.rating}
              </span>
              <span className="text-xs text-inksoft">Terjual 500+ bibit</span>
            </div>

            <h1 className="display mt-4 text-[1.75rem] leading-tight text-ink md:text-5xl">
              {product.name}
            </h1>

            <div className="mt-6 flex flex-wrap items-end gap-x-3 gap-y-2">
              <span className={`display text-3xl md:text-4xl ${diskon > 0 ? 'text-promo' : 'text-brand'}`}>
                Rp {jual.toLocaleString('id-ID')}
              </span>
              {diskon > 0 && (
                <>
                  <span className="text-base text-inksoft line-through md:text-lg">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                  <span className="badge bg-promosoft text-promo">
                    Hemat Rp {hemat.toLocaleString('id-ID')}
                  </span>
                </>
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-bold text-inksoft md:text-sm">
              <span className={`inline-flex items-center gap-2 ${habis ? 'text-promo' : ''}`}>
                <Sprout className="h-4 w-4" />
                {habis ? 'Stok habis' : `Stok tersedia: ${product.stock}`}
              </span>
              <span className="inline-flex items-center gap-2">
                <Truck className="h-4 w-4" /> Dikirim dari Salatiga
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Garansi bibit hidup
              </span>
            </div>

            {!bisaDipesan && (
              <div className="mt-6 flex items-start gap-3 rounded-3xl border border-line bg-accentsoft p-4">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                <p className="text-xs leading-relaxed text-ink md:text-sm">
                  {product.isAvailable
                    ? 'Stok bibit ini sedang kosong. Hubungi kami lewat WhatsApp untuk menanyakan ketersediaan berikutnya.'
                    : 'Bibit ini sedang tidak ditampilkan di katalog. Hubungi kami lewat WhatsApp kalau tetap ingin memesan.'}
                </p>
              </div>
            )}

            {/* Aksi di layar besar */}
            <div className="mt-8 hidden gap-3 md:flex">
              <button
                onClick={() => onAddToCart(product)}
                disabled={!bisaDipesan}
                className="btn btn-lg btn-primary flex-1"
              >
                <ShoppingCart className="h-4 w-4" /> {labelTombol}
              </button>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-outline">
                <Phone className="h-4 w-4" /> Tanya dulu
              </a>
            </div>

            {/* Tab */}
            <div className="no-scrollbar mt-10 flex gap-2 overflow-x-auto border-b border-line pb-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`chip ${activeTab === tab.id ? 'chip-active' : ''}`}
                  aria-pressed={activeTab === tab.id}
                >
                  <tab.icon className="h-4 w-4" /> {tab.label}
                </button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-6 min-h-[12rem] text-sm leading-relaxed text-inksoft md:text-base"
            >
              {activeTab === 'deskripsi' && (
                <div className="space-y-6">
                  <p>{product.description}</p>
                  <div className="card bg-surface2/60 p-5 md:p-6">
                    <h3 className="panel-title">
                      <CheckCircle2 className="h-5 w-5 text-brand" /> Keunggulan bibit kami
                    </h3>
                    <ul className="mt-4 grid gap-2 text-xs sm:grid-cols-2 md:text-sm">
                      {[
                        'Hasil okulasi / sambung pucuk',
                        'Bebas hama dan penyakit',
                        'Akar kuat dan sehat',
                        'Garansi pengiriman aman',
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'ciri' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="panel-title">
                      <span className="h-2 w-2 rounded-full bg-brand" /> Ciri-ciri buah
                    </h3>
                    <p className="mt-2">{product.fruitFeatures}</p>
                  </div>
                  <div>
                    <h3 className="panel-title">
                      <span className="h-2 w-2 rounded-full bg-brand" /> Ciri-ciri tanaman
                    </h3>
                    <p className="mt-2">{product.plantFeatures}</p>
                  </div>
                </div>
              )}

              {activeTab === 'tanam' && (
                <div className="space-y-6">
                  <p>{product.plantingGuide}</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { title: 'Kebutuhan cahaya', desc: 'Sinar matahari penuh (8-10 jam)' },
                      { title: 'Media tanam', desc: 'Tanah gembur & kaya organik' },
                    ].map((item) => (
                      <div key={item.title} className="card bg-surface2/60 p-4">
                        <h4 className="text-sm font-extrabold text-ink">{item.title}</h4>
                        <p className="mt-1 text-xs">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'rawat' && (
                <div className="space-y-6">
                  <p>{product.careGuide}</p>
                  <div className="space-y-4">
                    {[
                      { icon: Droplets, title: 'Penyiraman', desc: 'Rutin pagi dan sore hari, hindari genangan air.' },
                      { icon: Sprout, title: 'Pemupukan', desc: 'Pupuk NPK seimbang setiap 3-4 bulan sekali.' },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-4">
                        <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-2xl bg-brandsoft text-brand">
                          <item.icon className="h-5 w-5" />
                        </span>
                        <div>
                          <h4 className="text-sm font-extrabold text-ink">{item.title}</h4>
                          <p className="mt-1 text-xs md:text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* ------------------------------------------- BIBIT LAIN */}
        {lainnya.length > 0 && (
          <section className="mt-16 border-t border-line pt-12 md:mt-24 md:pt-16">
            <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-3 md:mb-10">
              <div>
                <span className="eyebrow">Rekomendasi</span>
                <h2 className="h-section mt-3">Bibit lain yang mungkin cocok</h2>
              </div>
              <Link to="/produk" className="btn btn-outline btn-sm">
                Semua katalog <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
              {lainnya.map((item, index) => (
                <ProductCard
                  key={item.id}
                  index={index}
                  product={item}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Aksi lengket khusus HP */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 px-4 pt-3 backdrop-blur-xl safe-bottom transition-transform duration-300 md:hidden ${
          showBar ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-inksoft">
              {diskon > 0 ? 'Harga promo' : 'Harga'}
            </div>
            <div className={`text-lg font-extrabold ${diskon > 0 ? 'text-promo' : 'text-ink'}`}>
              Rp {jual.toLocaleString('id-ID')}
            </div>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Tanya via WhatsApp"
            className="btn btn-outline px-4"
          >
            <Phone className="h-4 w-4" />
          </a>
          <button
            onClick={() => onAddToCart(product)}
            disabled={!bisaDipesan}
            className="btn btn-primary flex-1"
          >
            <ShoppingCart className="h-4 w-4" /> {habis ? 'Stok habis' : 'Tambah'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
