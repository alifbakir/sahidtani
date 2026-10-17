import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ChevronRight,
  Truck,
  ShieldCheck,
  Award,
  Sprout,
  Briefcase,
  Phone,
  Star,
  ArrowRight,
  ShoppingCart,
  MessageCircle,
  PackageCheck,
  Leaf,
} from 'lucide-react';
import { fetchProducts } from '../lib/api';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';
import { useMeta } from '../hooks/useMeta';
import { Product } from '../types';

interface HomeProps {
  onAddToCart: (product: Product) => void;
}

const WA_TANYA =
  'https://wa.me/6285878412411?text=Halo%20Sahid%20Tani%2C%20saya%20mau%20tanya%20soal%20bibit%20buah.';

const WA_KONSULTASI =
  'https://wa.me/6285878412411?text=Halo%20Sahid%20Tani%2C%20saya%20tertarik%20dengan%20layanan%20Proyek%20Perkebunan%20%2F%20Terima%20Beres.%20Bisa%20minta%20info%20lebih%20lanjut%3F';

/** Warna hijau terang untuk bagian berlatar gelap (tetap sama di kedua tema). */
const glow = 'text-[#7ef0ab]';

const keunggulan = [
  { icon: Truck, title: 'Gratis Ongkir', desc: 'Untuk wilayah tertentu' },
  { icon: ShieldCheck, title: 'Garansi Bibit', desc: 'Jaminan bibit hidup' },
  { icon: Award, title: 'Bibit Unggul', desc: 'Seleksi tanaman ketat' },
  { icon: Sprout, title: 'Terima Beres', desc: 'Layanan tanam langsung' },
  { icon: Briefcase, title: 'Proyek Kebun', desc: 'Melayani skala besar' },
];

const statistik = [
  { value: '2006', label: 'Berdiri sejak' },
  { value: '50+', label: 'Varietas bibit' },
  { value: '10k+', label: 'Pelanggan puas' },
  { value: '100%', label: 'Garansi kualitas' },
];

const langkah = [
  {
    icon: Sprout,
    title: 'Pilih bibit',
    desc: 'Telusuri katalog, saring sesuai kategori buah yang kamu cari.',
  },
  {
    icon: ShoppingCart,
    title: 'Susun pesanan',
    desc: 'Masukkan ke keranjang, jumlahnya otomatis dibatasi stok tersedia.',
  },
  {
    icon: MessageCircle,
    title: 'Konfirmasi WA',
    desc: 'Pesanan dikirim ke WhatsApp kami untuk ongkir dan jadwal kirim.',
  },
  {
    icon: PackageCheck,
    title: 'Dikirim aman',
    desc: 'Packing kayu dan kardus tebal supaya bibit tiba tetap segar.',
  },
];

const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
  const [featuredProducts, setFeaturedProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);

  useMeta({
    judul: 'Sahid Tani — Pusat Bibit Buah Unggul di Salatiga',
    deskripsi:
      'Bibit buah unggul dari Salatiga: durian, alpukat, mangga, jeruk, dan lainnya. Harga jelas, stok terbaru, siap kirim ke seluruh Indonesia.',
  });

  React.useEffect(() => {
    let active = true;

    (async () => {
      try {
        const all = await fetchProducts();
        if (!active) return;
        const available = all.filter((p) => p.isAvailable);
        const featured = available.filter((p) => p.isFeatured);
        // Kalau admin belum menandai produk unggulan, ambil 4 produk pertama.
        setFeaturedProducts((featured.length > 0 ? featured : available).slice(0, 4));
      } catch {
        if (active) setFeaturedProducts([]);
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div>
      {/* ---------------------------------------------------------- HERO */}
      <section
        id="beranda"
        className="relative isolate flex min-h-[86svh] items-center overflow-hidden md:min-h-[92svh]"
      >
        <img
          src="/tkp.JPG"
          alt="Kebun bibit Sahid Tani"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="veil absolute inset-0 -z-10" />

        <div className="shell py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <span className="badge border border-white/20 bg-white/10 text-white backdrop-blur-sm">
              <Sprout className="h-3.5 w-3.5" /> Pusat Bibit Buah · Salatiga
            </span>

            <h1 className="display mt-5 text-[2rem] leading-[1.05] text-white sm:text-5xl lg:text-[3.75rem]">
              Bibit buah unggul,
              <br />
              <span className={glow}>siap tumbuh</span> jadi kebun impianmu.
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 md:text-lg">
              Lebih dari dua dekade menyediakan bibit durian, alpukat, mangga, dan puluhan
              varietas lain — sehat, berakar kuat, dan dikirim aman ke seluruh Indonesia.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/produk" className="btn btn-lg btn-primary w-full sm:w-auto">
                Lihat Katalog Bibit <ChevronRight className="h-4 w-4" />
              </Link>
              <a
                href={WA_TANYA}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg w-full border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 sm:w-auto"
              >
                <Phone className="h-4 w-4" /> Tanya via WhatsApp
              </a>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-bold text-white/75 md:text-sm">
              <span className="inline-flex items-center gap-2">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" /> Rating 4.8 dari pembeli
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className={`h-4 w-4 ${glow}`} /> Garansi bibit hidup
              </span>
              <span className="inline-flex items-center gap-2">
                <Leaf className={`h-4 w-4 ${glow}`} /> Okulasi &amp; sambung pucuk
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------ STATISTIK */}
      <section className="relative z-10 -mt-8 md:-mt-12">
        <div className="shell">
          <Reveal>
            <div className="card grid grid-cols-2 overflow-hidden shadow-[var(--shadow-lift)] md:grid-cols-4">
              {statistik.map((item) => (
                <div
                  key={item.label}
                  className="border-b border-line px-4 py-5 text-center last:border-b-0 even:border-l md:border-b-0 md:border-l md:first:border-l-0 md:py-7"
                >
                  <div className="display text-2xl text-ink md:text-4xl">{item.value}</div>
                  <div className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-inksoft md:text-xs">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------- KEUNGGULAN */}
      <section className="section shell">
        <Reveal className="mb-8 max-w-2xl md:mb-12">
          <span className="eyebrow">Kenapa Sahid Tani</span>
          <h2 className="h-section mt-3">
            Bukan sekadar jual bibit, kami dampingi sampai tumbuh.
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {keunggulan.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <div className="card hover-lift h-full p-4 md:p-5">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brandsoft text-brand">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-sm font-extrabold text-ink md:text-base">{item.title}</h3>
                <p className="mt-1 text-xs text-inksoft md:text-sm">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------ PRODUK UNGGULAN */}
      <section className="section border-y border-line bg-surface">
        <div className="shell">
          <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-12">
            <div className="max-w-2xl">
              <span className="eyebrow">Pilihan terbaik</span>
              <h2 className="h-section mt-3">Produk Unggulan</h2>
              <p className="mt-2 text-sm text-inksoft md:text-base">
                Varietas yang paling banyak dicari dan paling cocok untuk pemula.
              </p>
            </div>
            <Link to="/produk" className="btn btn-outline">
              Lihat semua <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          {loading ? (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
              {[0, 1, 2, 3].map((i) => (
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
          ) : featuredProducts.length === 0 ? (
            <div className="card p-8 text-center md:p-12">
              <p className="text-sm text-inksoft">
                Katalog bibit sedang diperbarui. Silakan hubungi kami lewat WhatsApp.
              </p>
              <a
                href={WA_TANYA}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-5"
              >
                <Phone className="h-4 w-4" /> Tanya ketersediaan
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
              {featuredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  index={index}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* -------------------------------------------------- CARA PESAN */}
      <section className="section shell">
        <Reveal className="mb-8 text-center md:mb-12">
          <span className="eyebrow justify-center">Mudah &amp; cepat</span>
          <h2 className="h-section mt-3">Cara pesan bibit</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-inksoft md:text-base">
            Tanpa perlu daftar akun. Empat langkah saja, pesananmu langsung ditangani tim kami.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
          {langkah.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06}>
              <div className="card relative h-full overflow-hidden p-4 md:p-5">
                <span className="display absolute right-3 top-2 text-4xl text-brand/10 md:text-5xl">
                  {index + 1}
                </span>
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brandsoft text-brand">
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-sm font-extrabold text-ink md:text-base">{item.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-inksoft md:text-sm">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------- PROYEK PERKEBUNAN */}
      <section className="relative overflow-hidden bg-deep py-16 text-white md:py-24">
        <div className="absolute inset-0 opacity-20">
          <img src="/bgcontact.JPG" alt="" className="h-full w-full object-cover" />
        </div>

        <div className="shell relative">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <span className="badge border border-white/15 bg-white/10 text-white">
                <Briefcase className="h-3.5 w-3.5" /> Layanan Profesional
              </span>
              <h2 className="display mt-5 text-[1.7rem] leading-tight md:text-4xl">
                Kami wujudkan <span className={glow}>kebun impian</span> Anda
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
                Layanan jasa pembuatan kebun buah skala besar maupun kecil dengan sistem{' '}
                <strong className="text-white">Terima Beres</strong>. Tim kami menangani semuanya,
                mulai dari survei lahan hingga penanaman.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    icon: Sprout,
                    title: 'Jasa Tanam',
                    desc: 'Beli bibitnya, kami tanamkan dengan teknik profesional.',
                  },
                  {
                    icon: Briefcase,
                    title: 'Proyek Perkebunan',
                    desc: 'Konsultasi lahan, pemetaan, sampai pengelolaan kebun.',
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <span className={`grid h-10 w-10 place-items-center rounded-2xl bg-white/10 ${glow}`}>
                      <item.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-sm font-extrabold text-white md:text-base">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-white/60 md:text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>

              <a
                href={WA_KONSULTASI}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg mt-8 w-full bg-[#7ef0ab] text-[#06231a] hover:bg-white sm:w-auto"
              >
                Konsultasi Proyek Sekarang <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-10">
                <div className="aspect-[3/4] overflow-hidden rounded-[1.5rem] shadow-2xl">
                  <img
                    src="/projek/projek1.jpg"
                    alt="Proyek penanaman Sahid Tani"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-[1.5rem] shadow-2xl">
                  <img
                    src="/projek/projek2.jpg"
                    alt="Proyek perkebunan Sahid Tani"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden rounded-[1.5rem] shadow-2xl">
                  <img
                    src="/projek/projek3.jpg"
                    alt="Lahan kebun pelanggan"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="aspect-[3/4] overflow-hidden rounded-[1.5rem] shadow-2xl">
                  <img
                    src="/projek/projek4.jpg"
                    alt="Hasil proyek kebun"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------- BUKTI PENGIRIMAN */}
      <section className="section shell">
        <Reveal className="mb-8 text-center md:mb-12">
          <span className="eyebrow justify-center">Packing aman</span>
          <h2 className="h-section mt-3">Bukti pengiriman ke seluruh Indonesia</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-inksoft md:text-base">
            Ribuan paket bibit dikirim dengan packing kayu dan kardus tebal agar bibit tetap segar
            sampai tujuan.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-surface2 shadow-[var(--shadow-soft)]"
            >
              <img
                src={`/paket/paket${i}.jpeg`}
                alt={`Bukti pengiriman Sahid Tani ${i}`}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------- TENTANG SINGKAT */}
      <section className="section border-t border-line bg-surface">
        <div className="shell">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[var(--shadow-lift)]">
                <img
                  src="/bibitbesar.jpeg"
                  alt="Nursery Sahid Tani"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 right-3 rounded-3xl border border-line bg-surface p-4 shadow-xl md:p-6 lg:-bottom-8 lg:-right-8">
                <div className="display text-2xl text-brand md:text-4xl">20+</div>
                <div className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-inksoft md:text-xs">
                  Tahun pengalaman
                </div>
              </div>
            </Reveal>

            <Reveal>
              <span className="eyebrow">Tentang kami</span>
              <h2 className="h-section mt-3">
                Dedikasi untuk <span className="text-brand">pertanian Indonesia</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-inksoft md:text-base">
                Sahid Tani berawal dari kecintaan kami terhadap alam. Kami percaya bibit yang baik
                adalah awal dari kehidupan yang sejahtera — karena itu setiap bibit dipilih dan
                dirawat dengan teliti sebelum sampai ke tangan Anda.
              </p>
              <Link to="/tentang" className="btn btn-dark mt-8 w-full sm:w-auto">
                Baca selengkapnya <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
