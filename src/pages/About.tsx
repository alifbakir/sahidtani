import React from 'react';
import { motion } from 'motion/react';
import { Users, Heart, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-20 md:pt-24 bg-[#f5f5f0] dark:bg-slate-900 transition-colors">
      {/* Header Section - Logo & Intro */}
      <section className="relative py-16 md:py-40 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/drone.jpeg" 
            alt="Sahid Tani Drone View" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <img 
              src="/LOGONOBG.png" 
              alt="Logo Sahid Tani" 
              className="h-32 md:h-48 w-auto object-contain mb-6 md:mb-10 drop-shadow-2xl"
            />
            <p className="text-base md:text-xl font-medium text-slate-200 leading-relaxed md:leading-loose max-w-3xl mx-auto px-4 drop-shadow-lg">
              Sahid Tani adalah penyedia bibit buah unggul yang tepercaya dengan komitmen pada kualitas dan keberlanjutan. Berpusat di kota Salatiga, kami menghadirkan bibit terbaik untuk mendukung pertanian yang produktif dan berkualitas. Temukan kisah kami di sini.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cerita Kami Section */}
      <section className="py-12 md:py-24 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-2 md:mb-4">Cerita Kami</h2>
            <div className="w-16 md:w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="prose prose-sm md:prose-lg max-w-none text-slate-600 dark:text-slate-400 space-y-4 md:space-y-8 leading-relaxed">
            <p>
              Sahid Tani adalah penyedia bibit tanaman buah unggul yang berdedikasi untuk membantu para petani dan pecinta tanaman dalam mewujudkan kebun yang produktif dan berkualitas. Berdiri sejak tahun 2006, usaha ini lahir dari komitmen untuk menyediakan bibit terbaik dengan kualitas terjamin, demi mendukung pertanian yang lebih maju dan berkelanjutan.
            </p>
            <p>
              Dengan pengalaman lebih dari satu dekade, kami memahami bahwa kualitas bibit adalah kunci utama dalam menghasilkan tanaman yang sehat dan berbuah lebat. Oleh karena itu, kami memilih dan mengembangkan setiap bibit dengan penuh ketelitian, menggunakan teknik terbaik dan inovasi terbaru dalam bidang pertanian. Keahlian kami dalam bidang perbanyakan bibit dan pemilihan varietas unggul telah menjadikan Sahid Tani sebagai pilihan tepercaya bagi para petani dan pecinta tanaman di seluruh Indonesia.
            </p>
            <p>
              Kami tidak hanya menjual bibit, tetapi juga berbagi pengetahuan dan pengalaman untuk memastikan setiap pelanggan mendapatkan hasil terbaik. Dari pekarangan rumah hingga perkebunan besar, kami siap mendukung pertumbuhan tanaman Anda dengan bibit unggul yang kami tawarkan.
            </p>
            <p>
              Pelayanan pelanggan adalah prioritas utama kami. Sejak pertama kali Anda menghubungi Sahid Tani, kami akan membantu Anda menemukan bibit yang paling sesuai dengan kebutuhan dan kondisi lahan Anda. Kepuasan pelanggan adalah kebanggaan kami, dan kami berkomitmen untuk terus memberikan yang terbaik dalam setiap layanan.
            </p>
            <p className="font-serif italic text-xl text-slate-800 dark:text-slate-200 border-l-4 border-primary pl-6 py-2">
              Kami percaya bahwa setiap bibit yang tumbuh dengan baik akan membawa manfaat bagi banyak orang. Dengan Sahid Tani, Anda tidak hanya mendapatkan bibit tanaman buah unggul, tetapi juga kesempatan untuk menanam masa depan yang lebih hijau dan berkelanjutan. Bersama Sahid Tani, mari tumbuhkan impian Anda menjadi kenyataan!
            </p>
          </div>
        </div>
      </section>

      {/* Foto Beberapa Dari Kami Section */}
      <section className="py-12 md:py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-2 md:mb-4">Beberapa Dari Kami</h2>
            <p className="text-xs md:text-slate-500 dark:text-slate-400">Tim di balik layar yang berdedikasi merawat setiap bibit tanaman Anda.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="aspect-[3/4] rounded-2xl md:rounded-[32px] overflow-hidden shadow-lg border-2 md:border-4 border-white dark:border-slate-800"
              >
                <img 
                  src={`/tentang${i}.jpg`} 
                  alt={`Team Member ${i}`} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tentang Owner Section */}
      <section className="py-12 md:py-24 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="relative">
              <div className="rounded-2xl md:rounded-[40px] overflow-hidden shadow-2xl border-4 md:border-8 border-[#f5f5f0] dark:border-slate-800">
                <img 
                  src="/owner.jpg" 
                  alt="Owner Sahid Tani" 
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-primary p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-xl text-white">
                <Heart className="w-6 h-6 md:w-8 md:h-8 mb-1 md:mb-2" />
                <div className="font-bold text-xs md:text-base">Founder Sahid Tani</div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 text-primary rounded-full text-[10px] md:text-sm font-bold uppercase tracking-widest mb-4 md:mb-6">
                <Award className="w-3 h-3 md:w-4 md:h-4" /> Tentang Owner
              </div>
              <div className="space-y-4 md:space-y-6 text-sm md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  Nur Sahid adalah pendiri dan pemilik Sahid Tani, yang telah berdiri sejak tahun 2006. Dengan tekad dan kerja keras, ia membangun usaha ini untuk menyediakan bibit buah unggul berkualitas bagi petani dan pecinta tanaman di seluruh Indonesia.
                </p>
                <p>
                  Berbekal pengalaman dan kecintaannya terhadap pertanian, Nur Sahid terus berinovasi dalam mengembangkan bibit yang sehat dan produktif. Baginya, keberhasilan bukan hanya tentang bisnis, tetapi juga bagaimana membantu orang lain menanam dan merawat tanaman dengan hasil terbaik.
                </p>
                <p>
                  Sahid Tani adalah wujud dari semangat dan perjuangannya dalam membangun masa depan yang lebih hijau dan berkelanjutan. Dengan komitmen tinggi, ia terus berbagi ilmu dan pengalaman agar setiap pelanggan mendapatkan bibit terbaik untuk mendukung pertanian yang lebih maju.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div>
              <div className="text-2xl md:text-5xl font-black mb-1 md:mb-2">2006</div>
              <div className="text-primary-foreground/80 text-[10px] md:text-sm uppercase tracking-widest font-bold">Berdiri Sejak</div>
            </div>
            <div>
              <div className="text-2xl md:text-5xl font-black mb-1 md:mb-2">50+</div>
              <div className="text-primary-foreground/80 text-[10px] md:text-sm uppercase tracking-widest font-bold">Varietas Bibit</div>
            </div>
            <div>
              <div className="text-2xl md:text-5xl font-black mb-1 md:mb-2">10k+</div>
              <div className="text-primary-foreground/80 text-[10px] md:text-sm uppercase tracking-widest font-bold">Pelanggan Puas</div>
            </div>
            <div>
              <div className="text-2xl md:text-5xl font-black mb-1 md:mb-2">100%</div>
              <div className="text-primary-foreground/80 text-[10px] md:text-sm uppercase tracking-widest font-bold">Garansi Kualitas</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
