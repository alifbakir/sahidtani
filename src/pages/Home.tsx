import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight, Truck, ShieldCheck, Award, Star, ShoppingCart, Sprout, Briefcase, CheckCircle2 } from 'lucide-react';
import { products } from '../data';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

interface HomeProps {
  onAddToCart: (product: Product) => void;
}

const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
  const featuredProductIds = [4, 5, 7, 24]; // Musang King, Duri Hitam, Aligator, Pluwang
  const featuredProducts = products.filter(p => featuredProductIds.includes(p.id));

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero Section */}
      <section id="beranda" className="relative min-h-[60vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden text-center px-4 py-12 md:py-32">
        <div className="absolute inset-0 z-0">
          <img 
            src="/tkp.JPG" 
            alt="Garden Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-white max-w-4xl mx-auto drop-shadow-2xl mb-4 md:mb-10">
              Selamat Datang di Pusat Bibit Buah Unggul Terlengkap
            </h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mb-8 md:mb-20"
            >
              <Link to="/produk" className="inline-flex px-6 py-3 md:px-8 md:py-4 bg-primary text-white rounded-full font-semibold hover:bg-green-800 transition-all items-center gap-2 shadow-lg text-xs md:text-base">
                Lihat Katalog <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Features Row */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-6 max-w-7xl mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-md p-3 md:p-6 rounded-xl border border-white/10 text-white hover:bg-white/20 transition-all">
                <div className="bg-primary/20 w-8 h-8 md:w-12 md:h-12 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-4">
                  <Truck className="text-primary w-4 h-4 md:w-6 md:h-6" />
                </div>
                <h3 className="text-xs md:text-lg font-bold mb-1 md:mb-2">Gratis Ongkir</h3>
                <p className="text-[10px] md:text-sm text-slate-200">Untuk wilayah khusus</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md p-3 md:p-6 rounded-xl border border-white/10 text-white hover:bg-white/20 transition-all">
                <div className="bg-primary/20 w-8 h-8 md:w-12 md:h-12 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-4">
                  <ShieldCheck className="text-primary w-4 h-4 md:w-6 md:h-6" />
                </div>
                <h3 className="text-xs md:text-lg font-bold mb-1 md:mb-2">Garansi Bibit</h3>
                <p className="text-[10px] md:text-sm text-slate-200">Jaminan bibit hidup</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3 md:p-6 rounded-xl border border-white/10 text-white hover:bg-white/20 transition-all">
                <div className="bg-primary/20 w-8 h-8 md:w-12 md:h-12 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-4">
                  <Award className="text-primary w-4 h-4 md:w-6 md:h-6" />
                </div>
                <h3 className="text-xs md:text-lg font-bold mb-1 md:mb-2">Bibit Unggul</h3>
                <p className="text-[10px] md:text-sm text-slate-200">Seleksi tanaman ketat</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3 md:p-6 rounded-xl border border-white/10 text-white hover:bg-white/20 transition-all">
                <div className="bg-primary/20 w-8 h-8 md:w-12 md:h-12 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-4">
                  <Sprout className="text-primary w-4 h-4 md:w-6 md:h-6" />
                </div>
                <h3 className="text-xs md:text-lg font-bold mb-1 md:mb-2">Terima Beres</h3>
                <p className="text-[10px] md:text-sm text-slate-200">Layanan tanam langsung</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3 md:p-6 rounded-xl border border-white/10 text-white hover:bg-white/20 transition-all col-span-2 lg:col-span-1">
                <div className="bg-primary/20 w-8 h-8 md:w-12 md:h-12 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-4">
                  <Briefcase className="text-primary w-4 h-4 md:w-6 md:h-6" />
                </div>
                <h3 className="text-xs md:text-lg font-bold mb-1 md:mb-2">Proyek Kebun</h3>
                <p className="text-[10px] md:text-sm text-slate-200">Melayani skala besar</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 md:py-24 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4 md:gap-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-2 md:mb-4">Produk Unggulan</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm md:text-lg">Bibit pilihan terbaik yang paling banyak dicari.</p>
            </div>
            <Link to="/produk" className="text-primary font-bold text-sm md:text-base flex items-center gap-2 hover:gap-4 transition-all group">
              Lihat Semua <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Plantation Projects Section */}
      <section className="py-12 md:py-24 bg-slate-900 dark:bg-black text-white overflow-hidden relative transition-colors">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <img src="./bgcontact.JPG" alt="Plantation" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/20 text-primary font-bold text-[10px] md:text-sm mb-4 md:mb-6 border border-primary/30">
                <Briefcase className="w-3 h-3 md:w-4 md:h-4" /> Layanan Profesional
              </div>
              <h2 className="text-2xl md:text-5xl font-serif font-bold mb-4 md:mb-8 leading-tight">
                Bukan Sekedar Jual Bibit, Kami <span className="text-primary italic">Wujudkan Kebun Impian</span> Anda
              </h2>
              <p className="text-sm md:text-lg text-slate-400 mb-6 md:mb-10 leading-relaxed">
                Kami melayani jasa pembuatan kebun buah skala besar maupun kecil dengan sistem <strong>"Terima Beres"</strong>. Tim ahli kami akan menangani semuanya mulai dari survey lahan hingga penanaman.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
                <div className="flex gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                    <Sprout className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg md:text-xl mb-1 md:mb-2">Jasa Tanam</h4>
                    <p className="text-xs md:text-sm text-slate-400">Beli bibitnya, kami yang tanamkan dengan teknik profesional.</p>
                  </div>
                </div>
                <div className="flex gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                    <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg md:text-xl mb-1 md:mb-2">Proyek Perkebunan</h4>
                    <p className="text-xs md:text-sm text-slate-400">Konsultasi lahan, pemetaan, hingga pengelolaan kebun.</p>
                  </div>
                </div>
              </div>

              <a 
                href="https://wa.me/6285878412411?text=Halo Sahid Tani, saya tertarik dengan layanan Proyek Perkebunan / Terima Beres. Bisa minta info lebih lanjut?"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-8 py-4 md:px-10 md:py-5 bg-primary text-white rounded-full font-bold hover:bg-green-800 transition-all shadow-xl shadow-primary/20 text-sm md:text-base"
              >
                Konsultasi Proyek Sekarang
              </a>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                    <img src="/projek/projek1.jpg" alt="Proyek 1" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                    <img src="/projek/projek2.jpg" alt="Proyek 2" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                    <img src="/projek/projek3.jpg" alt="Proyek 3" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                    <img src="/projek/projek4.jpg" alt="Proyek 4" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Proof / Testimonials Section */}
      <section className="py-12 md:py-24 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-green-100 dark:bg-primary/20 text-primary font-bold text-[10px] md:text-sm mb-4 border border-green-200 dark:border-primary/30">
              <ShieldCheck className="w-3 h-3 md:w-4 md:h-4" /> Garansi Pengiriman Aman
            </div>
            <h2 className="text-2xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-4">Bukti Pengiriman ke Seluruh Indonesia</h2>
            <p className="text-sm md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Ribuan paket bibit unggul telah berhasil kami kirimkan dengan selamat ke berbagai pelosok nusantara. Packing kayu dan kardus super tebal memastikan bibit tetap segar sampai di tangan Anda.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="aspect-[4/5] rounded-2xl md:rounded-[32px] overflow-hidden shadow-lg border-2 border-slate-50 dark:border-slate-800 relative group cursor-pointer"
              >
                <img 
                  src={`/paket/paket${i}.jpeg`} 
                  alt={`Bukti Pengiriman Sahid Tani ${i}`} 
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Summary Section */}
      <section className="py-12 md:py-24 bg-slate-50 dark:bg-slate-800/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl md:rounded-[40px] overflow-hidden shadow-2xl">
            <img src="/bibitbesar.jpeg" alt="Sahid Tani Nursery" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-white dark:bg-slate-900 p-4 md:p-8 rounded-2xl md:rounded-[32px] shadow-xl max-w-[120px] md:max-w-xs border border-slate-100 dark:border-slate-800">
                <div className="text-2xl md:text-4xl font-black text-primary mb-1 md:mb-2">20+</div>
                <div className="text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest text-[8px] md:text-xs">Tahun Pengalaman</div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-4 md:mb-8 leading-tight">
                Dedikasi Kami untuk <span className="text-primary italic">Pertanian Indonesia</span>
              </h2>
              <p className="text-sm md:text-lg text-slate-600 dark:text-slate-400 mb-6 md:mb-8 leading-relaxed">
                Sahid Tani berawal dari kecintaan kami terhadap alam. Kami percaya bahwa bibit yang baik adalah awal dari kehidupan yang sejahtera. Dengan pengalaman lebih dari dua dekade, kami terus berinovasi dalam menyediakan bibit buah unggul yang adaptif dan produktif.
              </p>
              <Link to="/tentang" className="inline-flex px-6 py-3 md:px-8 md:py-4 bg-slate-900 dark:bg-primary text-white rounded-full font-bold hover:bg-slate-800 dark:hover:bg-green-800 transition-all shadow-lg shadow-slate-200 dark:shadow-primary/20 text-sm md:text-base">
                Baca Selengkapnya
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
