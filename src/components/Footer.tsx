import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Instagram, Facebook, Sprout, ArrowUpRight, Clock } from 'lucide-react';

const WA_KONSULTASI =
  'https://wa.me/6285878412411?text=Halo%20Sahid%20Tani%2C%20saya%20mau%20konsultasi%20bibit%20buah.';

const halaman = [
  { label: 'Beranda', to: '/' },
  { label: 'Tentang Kami', to: '/tentang' },
  { label: 'Katalog Bibit', to: '/produk' },
  { label: 'Kontak', to: '/kontak' },
];

const kategori = [
  'Bibit Durian',
  'Bibit Alpukat',
  'Bibit Mangga',
  'Bibit Jeruk',
];

/** Footer selalu berlatar gelap di kedua tema, jadi warnanya memakai nilai tetap. */
const glow = 'text-[#7ef0ad]';

const Footer = () => (
  <footer id="kontak" className="mt-20 bg-deep text-white">
    {/* Pita ajakan */}
    <div className="shell">
      <div className="relative -mt-14 mb-16 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#156a3e] via-[#0f5733] to-[#08301d] p-6 shadow-2xl md:p-10">
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#7ef0ad]/20 blur-3xl" />
        <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="eyebrow !text-white/75">Siap menanam?</p>
            <h2 className="display mt-2 text-[1.55rem] leading-tight text-white md:text-4xl">
              Konsultasi bibit &amp; proyek kebun, gratis.
            </h2>
            <p className="mt-2 max-w-xl text-sm text-white/75">
              Tim Sahid Tani membantu memilih varietas yang cocok dengan lahan dan iklimmu.
            </p>
          </div>
          <a
            href={WA_KONSULTASI}
            target="_blank"
            rel="noopener noreferrer"
            className="btn w-full shrink-0 bg-white text-[#0a4f2c] hover:bg-white/90 sm:w-auto"
          >
            <Phone className="h-4 w-4" /> Chat WhatsApp
          </a>
        </div>
      </div>
    </div>

    <div className="shell pb-12">
      <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4 lg:gap-12">
        <div className="col-span-2 space-y-5 lg:col-span-1">
          <img
            src="/logonavbarnobg.png"
            alt="Logo Sahid Tani"
            className="h-12 w-auto object-contain brightness-0 invert md:h-14"
          />
          <p className="max-w-sm text-sm leading-relaxed text-white/60">
            Pusat pembibitan buah unggul terpercaya di Indonesia. Bibit sehat, akar kuat,
            siap tanam — untuk kebun yang produktif.
          </p>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/sahid.tani_/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Sahid Tani"
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-[#156a3e]"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/sahid.tani.12?locale=id_ID"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Sahid Tani"
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-[#156a3e]"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://wa.me/6285878412411"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Sahid Tani"
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-[#25D366]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.658-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-extrabold uppercase tracking-[0.18em] text-white/45">
            Halaman
          </h4>
          <ul className="space-y-1 text-sm">
            {halaman.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="link-quiet">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-extrabold uppercase tracking-[0.18em] text-white/45">
            Kategori
          </h4>
          <ul className="space-y-1 text-sm">
            {kategori.map((item) => (
              <li key={item}>
                <Link to="/produk" className="link-quiet">
                  {item} <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 min-w-0 md:col-span-1">
          <h4 className="mb-4 text-xs font-extrabold uppercase tracking-[0.18em] text-white/45">
            Hubungi Kami
          </h4>
          <ul className="space-y-3 text-sm text-white/65">
            <li className="flex gap-3">
              <MapPin className={`mt-0.5 h-5 w-5 flex-shrink-0 ${glow}`} />
              <span className="leading-relaxed">
                Jl. Plongkowati No.7, Tegalrejo, Kec. Argomulyo, Kota Salatiga, Jawa Tengah 50733
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className={`mt-0.5 h-5 w-5 flex-shrink-0 ${glow}`} />
              <a href="https://wa.me/6285878412411" className="link-quiet">
                +62 858 7841 2411
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className={`mt-0.5 h-5 w-5 flex-shrink-0 ${glow}`} />
              <a href="mailto:sahidtani@gmail.com" className="link-quiet min-w-0 break-all">
                sahidtani@gmail.com
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className={`mt-0.5 h-5 w-5 flex-shrink-0 ${glow}`} />
              <span className="inline-flex min-h-10 items-center">
                Senin - Sabtu, 06.00 - 18.00 WIB
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center gap-2 border-t border-white/10 pt-8 text-center text-xs text-white/45 md:flex-row md:justify-between md:text-left">
        <p className="inline-flex items-center gap-2">
          <Sprout className={`h-4 w-4 ${glow}`} />
          &copy; {new Date().getFullYear()} Sahid Tani — Pusat Bibit Buah Unggul
        </p>
        <p>Dibuat oleh Alif Al Fatah Putra &amp; Cornelius Johan Septian Wira Pratama</p>
      </div>
    </div>
  </footer>
);

export default Footer;
