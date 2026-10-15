import React from 'react';
import { motion } from 'motion/react';
import { Heart, Award, Sprout, Quote, Leaf, Users, BadgeCheck } from 'lucide-react';
import Reveal from '../components/Reveal';

const statistik = [
  { value: '2006', label: 'Berdiri sejak' },
  { value: '50+', label: 'Varietas bibit' },
  { value: '10k+', label: 'Pelanggan puas' },
  { value: '100%', label: 'Garansi kualitas' },
];

const nilai = [
  {
    icon: Leaf,
    title: 'Bibit pilihan',
    desc: 'Setiap tanaman diseleksi manual sebelum masuk nursery penjualan.',
  },
  {
    icon: Users,
    title: 'Pendampingan',
    desc: 'Kami bantu pilih varietas sesuai lahan, iklim, dan tujuan tanam.',
  },
  {
    icon: BadgeCheck,
    title: 'Tanggung jawab',
    desc: 'Garansi bibit hidup dan pengiriman dikemas supaya aman sampai tujuan.',
  },
];

const cerita = [
  'Sahid Tani adalah penyedia bibit tanaman buah unggul yang berdedikasi untuk membantu para petani dan pecinta tanaman dalam mewujudkan kebun yang produktif dan berkualitas. Berdiri sejak tahun 2006, usaha ini lahir dari komitmen untuk menyediakan bibit terbaik dengan kualitas terjamin, demi mendukung pertanian yang lebih maju dan berkelanjutan.',
  'Dengan pengalaman lebih dari satu dekade, kami memahami bahwa kualitas bibit adalah kunci utama dalam menghasilkan tanaman yang sehat dan berbuah lebat. Oleh karena itu, kami memilih dan mengembangkan setiap bibit dengan penuh ketelitian, menggunakan teknik terbaik dan inovasi terbaru dalam bidang pertanian. Keahlian kami dalam perbanyakan bibit dan pemilihan varietas unggul telah menjadikan Sahid Tani sebagai pilihan tepercaya bagi petani dan pecinta tanaman di seluruh Indonesia.',
  'Kami tidak hanya menjual bibit, tetapi juga berbagi pengetahuan dan pengalaman untuk memastikan setiap pelanggan mendapatkan hasil terbaik. Dari pekarangan rumah hingga perkebunan besar, kami siap mendukung pertumbuhan tanaman Anda dengan bibit unggul yang kami tawarkan.',
  'Pelayanan pelanggan adalah prioritas utama kami. Sejak pertama kali Anda menghubungi Sahid Tani, kami akan membantu Anda menemukan bibit yang paling sesuai dengan kebutuhan dan kondisi lahan Anda. Kepuasan pelanggan adalah kebanggaan kami, dan kami berkomitmen untuk terus memberikan yang terbaik dalam setiap layanan.',
];

const glow = 'text-[#7ef0ab]';

const About = () => (
  <div>
    {/* ---------------------------------------------------------- HERO */}
    <section className="relative isolate flex min-h-[62svh] items-center overflow-hidden md:min-h-[70svh]">
      <img
        src="/drone.jpeg"
        alt="Kebun Sahid Tani dari udara"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="veil absolute inset-0 -z-10" />

      <div className="shell py-24 text-center md:py-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <img
            src="/LOGONOBG.png"
            alt="Logo Sahid Tani"
            className="mx-auto h-24 w-auto object-contain drop-shadow-2xl md:h-36"
          />
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/85 md:text-lg">
            Penyedia bibit buah unggul yang tepercaya, berpusat di Salatiga — menghadirkan bibit
            terbaik untuk pertanian yang produktif dan berkelanjutan.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs font-bold text-white/75 md:text-sm">
            <span className="inline-flex items-center gap-2">
              <Sprout className={`h-4 w-4 ${glow}`} /> Nursery sendiri di Salatiga
            </span>
            <span className="inline-flex items-center gap-2">
              <Award className={`h-4 w-4 ${glow}`} /> Pengalaman 20+ tahun
            </span>
          </div>
        </motion.div>
      </div>
    </section>

    {/* --------------------------------------------------- NILAI KAMI */}
    {/* relative z-10 wajib: kartunya ditarik naik (-mt-8) supaya menumpuk
        di atas hero. Tanpa z-index, hero (position: relative) melukis di
        atas seksi statis ini dan bagian atas kartu jadi tertutup. */}
    <section className="shell relative z-10 -mt-8 md:-mt-12">
      <Reveal>
        <div className="grid gap-3 md:grid-cols-3 md:gap-5">
          {nilai.map((item) => (
            <div key={item.title} className="card p-5 shadow-[var(--shadow-lift)] md:p-6">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brandsoft text-brand">
                <item.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-sm font-extrabold text-ink md:text-base">{item.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-inksoft md:text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>

    {/* --------------------------------------------------- CERITA KAMI */}
    <section className="section bg-surface">
      <div className="shell-tight">
        <Reveal className="text-center">
          <span className="eyebrow justify-center">Perjalanan kami</span>
          <h2 className="h-section mt-3">Cerita Kami</h2>
        </Reveal>

        <div className="mt-8 space-y-5 text-sm leading-relaxed text-inksoft md:text-base">
          {cerita.map((paragraf, index) => (
            <Reveal key={paragraf.slice(0, 24)} delay={index * 0.04}>
              <p>{paragraf}</p>
            </Reveal>
          ))}

          <Reveal>
            <blockquote className="card relative mt-8 border-l-4 border-brand bg-surface2/60 p-6">
              <Quote className="h-6 w-6 text-brand/40" />
              <p className="mt-3 font-serif text-lg italic leading-relaxed text-ink md:text-xl">
                Kami percaya bahwa setiap bibit yang tumbuh dengan baik akan membawa manfaat bagi
                banyak orang. Bersama Sahid Tani, mari tumbuhkan impian Anda menjadi kenyataan!
              </p>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>

    {/* ---------------------------------------------- BEBERAPA DARI KAMI */}
    <section className="section shell">
      <Reveal className="mb-8 text-center md:mb-12">
        <span className="eyebrow justify-center">Tim kami</span>
        <h2 className="h-section mt-3">Beberapa Dari Kami</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-inksoft md:text-base">
          Tim di balik layar yang merawat setiap bibit tanaman Anda.
        </p>
      </Reveal>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {[1, 2, 3, 4].map((i) => (
          <Reveal key={i} delay={i * 0.05}>
            <motion.div
              whileHover={{ y: -6 }}
              className="aspect-[3/4] overflow-hidden rounded-[1.5rem] border border-line bg-surface2 shadow-[var(--shadow-soft)]"
            >
              <img
                src={`/tentang${i}.jpg`}
                alt={`Tim Sahid Tani ${i}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>

    {/* ------------------------------------------------------- OWNER */}
    <section className="section border-y border-line bg-surface">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] border border-line shadow-[var(--shadow-lift)]">
              <img
                src="/owner.jpg"
                alt="Nur Sahid, pendiri Sahid Tani"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-4 rounded-3xl bg-brand p-4 text-onbrand shadow-xl md:-bottom-7 md:left-6 md:p-5">
              <Heart className="h-5 w-5 md:h-6 md:w-6" />
              <div className="mt-1 text-xs font-extrabold md:text-sm">Founder Sahid Tani</div>
            </div>
          </Reveal>

          <Reveal>
            <span className="eyebrow">
              <Award className="h-3.5 w-3.5" /> Tentang owner
            </span>
            <h2 className="h-section mt-3">Nur Sahid</h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-inksoft md:text-base">
              <p>
                Nur Sahid adalah pendiri dan pemilik Sahid Tani, yang telah berdiri sejak tahun
                2006. Dengan tekad dan kerja keras, ia membangun usaha ini untuk menyediakan bibit
                buah unggul berkualitas bagi petani dan pecinta tanaman di seluruh Indonesia.
              </p>
              <p>
                Berbekal pengalaman dan kecintaannya terhadap pertanian, Nur Sahid terus berinovasi
                dalam mengembangkan bibit yang sehat dan produktif. Baginya, keberhasilan bukan
                hanya tentang bisnis, tetapi juga bagaimana membantu orang lain menanam dan merawat
                tanaman dengan hasil terbaik.
              </p>
              <p>
                Sahid Tani adalah wujud dari semangat dan perjuangannya dalam membangun masa depan
                yang lebih hijau dan berkelanjutan. Dengan komitmen tinggi, ia terus berbagi ilmu
                dan pengalaman agar setiap pelanggan mendapatkan bibit terbaik.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    {/* --------------------------------------------------- STATISTIK */}
    <section className="bg-deep py-14 text-white md:py-20">
      <div className="shell grid grid-cols-2 gap-8 text-center md:grid-cols-4">
        {statistik.map((item, index) => (
          <Reveal key={item.label} delay={index * 0.05}>
            <div>
              <div className="display text-3xl md:text-5xl">{item.value}</div>
              <div className="mt-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/60 md:text-xs">
                {item.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  </div>
);

export default About;
