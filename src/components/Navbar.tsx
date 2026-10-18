import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShoppingCart,
  Menu,
  X,
  Sun,
  Moon,
  Phone,
  Truck,
  Home,
  Sprout,
  Info,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../hooks/useTheme';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const navLinks = [
  { name: 'Beranda', path: '/', icon: Home },
  { name: 'Tentang', path: '/tentang', icon: Info },
  { name: 'Produk', path: '/produk', icon: Sprout },
  { name: 'Kontak', path: '/kontak', icon: MessageCircle },
];

const WA_LINK =
  'https://wa.me/6285878412411?text=Halo%20Sahid%20Tani%2C%20saya%20mau%20tanya%20soal%20bibit%20buah.';

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
  const { pathname } = useLocation();
  const { isDark, toggle } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  /**
   * Saat pindah halaman, gulir kembali ke paling atas. Tanpa ini navbar masih
   * dalam keadaan "mengecil" (65px) lalu beranimasi membesar ke 101px selama
   * 300 ms — seluruh isi halaman baru terlihat "turun" sesaat setelah dibuka.
   * Jadi pada frame pertama setelah pindah halaman, transisi dimatikan.
   */
  const [tanpaAnimasi, setTanpaAnimasi] = useState(false);

  useLayoutEffect(() => {
    setTanpaAnimasi(true);
    let r2 = 0;
    const r1 = requestAnimationFrame(() => {
      setScrolled(window.scrollY > 24);
      r2 = requestAnimationFrame(() => setTanpaAnimasi(false));
    });
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, [pathname]);

  const animasiHeader = tanpaAnimasi ? 'transition-none' : 'transition-all duration-300';

  // Header mengecil saat digulir supaya layar HP tidak termakan.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Kunci gulir latar saat menu HP terbuka.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Tutup menu setiap pindah halaman.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Pita informasi: ikut hilang begitu halaman digulir. */}
      <div
        className={`overflow-hidden bg-deep text-ondeep ${animasiHeader} ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
        }`}
      >
        <div className="shell flex h-9 items-center justify-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.1em] text-white/75 sm:text-[11px]">
          <Truck className="h-3.5 w-3.5 flex-shrink-0 text-[#7ef0ad]" />
          <span className="truncate">Gratis ongkir wilayah tertentu</span>
          <span className="hidden text-white/30 sm:inline">•</span>
          <span className="hidden items-center gap-2 sm:inline-flex">
            <ShieldCheck className="h-3.5 w-3.5 text-[#7ef0ad]" /> Garansi bibit hidup
          </span>
        </div>
      </div>

      <nav
        className={`border-b transition-colors duration-300 ${
          scrolled
            ? 'border-line bg-canvas/90 shadow-[0_10px_30px_-24px_rgb(16_36_26/0.5)] backdrop-blur-xl'
            : 'border-transparent bg-canvas/70 backdrop-blur-md'
        }`}
      >
        <div className="shell">
          <div
            className={`flex items-center justify-between gap-2 ${animasiHeader} ${
              scrolled ? 'h-16' : 'h-16 md:h-20'
            }`}
          >
            <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="Sahid Tani — beranda">
              <img
                src="/logonavbarnobg.png"
                alt="Logo Sahid Tani"
                className={`w-auto object-contain ${animasiHeader} ${
                  scrolled ? 'h-9 md:h-10' : 'h-10 md:h-12'
                }`}
              />
            </Link>

            {/* Navigasi desktop */}
            <div className="hidden items-center gap-1 rounded-full border border-line/70 bg-surface/60 p-1 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`inline-flex min-h-9 items-center rounded-full px-4 text-sm font-bold transition-colors ${
                    isActive(link.path)
                      ? 'bg-brand text-onbrand shadow-[0_8px_20px_-14px_var(--brand)]'
                      : 'text-inksoft hover:bg-surface2 hover:text-ink'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-1 md:gap-1.5">
              <button
                onClick={toggle}
                className="icon-btn"
                aria-label={isDark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
                title={isDark ? 'Mode terang' : 'Mode gelap'}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              <button
                onClick={onCartClick}
                className="icon-btn relative"
                aria-label={`Keranjang${cartCount > 0 ? `, ${cartCount} item` : ''}`}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[10px] font-extrabold text-onbrand ring-2 ring-canvas">
                    {cartCount}
                  </span>
                )}
              </button>

              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm ml-1 hidden lg:inline-flex"
              >
                <Phone className="h-4 w-4" /> Pesan Bibit
              </a>

              <button
                onClick={() => setIsMenuOpen(true)}
                className="icon-btn text-ink md:hidden"
                aria-label="Buka menu"
                aria-expanded={isMenuOpen}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu HP: panel penuh dari kanan */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              aria-label="Tutup menu"
              className="fixed inset-0 z-40 bg-deep/55 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 260 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[84%] max-w-xs flex-col border-l border-line bg-canvas px-5 pt-5 safe-bottom md:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="eyebrow">Menu</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="icon-btn"
                  aria-label="Tutup menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex min-h-13 items-center gap-3 rounded-2xl px-4 text-base font-bold transition-colors ${
                      isActive(link.path)
                        ? 'bg-brandsoft text-brand'
                        : 'text-ink hover:bg-surface2'
                    }`}
                  >
                    <link.icon className="h-[18px] w-[18px]" />
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto space-y-3 border-t border-line pt-5">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-wa w-full"
                >
                  <Phone className="h-4 w-4" /> Tanya via WhatsApp
                </a>
                <button onClick={toggle} className="btn btn-outline w-full">
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  {isDark ? 'Mode terang' : 'Mode gelap'}
                </button>
                <p className="pt-1 text-center text-xs text-inksoft">
                  Bibit buah unggul · Salatiga
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
