import React, { useEffect, useState } from 'react';
import { Link, NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Tags,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Loader2,
  AlertCircle,
  Sun,
  Moon,
  Sprout,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

const links = [
  { to: '/admin', label: 'Ringkasan', icon: LayoutDashboard, end: true },
  { to: '/admin/produk', label: 'Produk', icon: Package, end: false },
  { to: '/admin/kategori', label: 'Kategori', icon: Tags, end: false },
];

const AdminLayout: React.FC = () => {
  const { session, loading, email } = useAuth();
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [session]);

  if (loading) {
    return (
      <div className="grid min-h-dvh place-items-center bg-canvas">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-7 w-7 animate-spin text-brand" />
          <p className="text-sm text-inksoft">Memuat panel admin…</p>
        </div>
      </div>
    );
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="grid min-h-dvh place-items-center bg-canvas px-4">
        <div className="panel max-w-md text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-warnsoft text-warn">
            <AlertCircle className="h-7 w-7" />
          </span>
          <h1 className="mt-5 text-lg font-extrabold text-ink">Supabase belum dikonfigurasi</h1>
          <p className="mt-2 text-sm leading-relaxed text-inksoft">
            Isi file <code className="rounded bg-surface2 px-1.5 py-0.5 text-xs">.env.local</code>{' '}
            dengan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY, lalu jalankan ulang dev server.
          </p>
          <Link to="/" className="btn btn-outline mt-6">
            Kembali ke toko
          </Link>
        </div>
      </div>
    );
  }

  if (!session) return <Navigate to="/admin/login" replace />;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login', { replace: true });
  };

  const nav = (
    <nav className="space-y-1">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            `flex min-h-11 items-center gap-3 rounded-2xl px-4 text-sm font-bold transition-colors ${
              isActive
                ? 'bg-brand text-onbrand shadow-[0_10px_24px_-16px_var(--brand)]'
                : 'text-inksoft hover:bg-surface2 hover:text-ink'
            }`
          }
        >
          <link.icon className="h-4 w-4" />
          {link.label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="min-h-dvh bg-canvas">
      {/* ------------------------------------------------------- HEADER */}
      <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[100rem] items-center gap-3 px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setMenuOpen(true)}
            className="icon-btn lg:hidden"
            aria-label="Buka menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link to="/admin" className="flex min-w-0 items-center gap-2.5">
            <img
              src="/logonavbarnobg.png"
              alt="Sahid Tani"
              className="h-9 w-auto flex-shrink-0 object-contain"
            />
            <span className="hidden text-[11px] font-extrabold uppercase tracking-[0.18em] text-inksoft sm:inline">
              Panel Admin
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-1">
            <button
              onClick={toggle}
              className="icon-btn"
              aria-label={isDark ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <Link to="/" target="_blank" className="btn btn-outline btn-sm hidden sm:inline-flex">
              <ExternalLink className="h-4 w-4" /> Lihat Web
            </Link>

            <span className="hidden max-w-[180px] truncate rounded-full bg-surface2 px-3 py-1.5 text-xs font-bold text-inksoft md:inline">
              {email}
            </span>

            <button onClick={handleSignOut} className="btn btn-ghost btn-sm text-danger hover:bg-dangersoft">
              <LogOut className="h-4 w-4" /> Keluar
            </button>
          </div>
        </div>
      </header>

      {/* -------------------------------------------------------- BODY */}
      <div className="mx-auto flex max-w-[100rem] gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <aside className="hidden w-60 flex-shrink-0 lg:block">
          <div className="sticky top-24 space-y-4">
            {nav}
            <div className="panel bg-surface2/50 p-4">
              <span className="grid h-9 w-9 place-items-center rounded-2xl bg-brandsoft text-brand">
                <Sprout className="h-4 w-4" />
              </span>
              <p className="mt-3 text-xs font-bold leading-relaxed text-inksoft">
                Perubahan di panel ini langsung tampil di toko setelah disimpan.
              </p>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 pb-16">
          <Outlet />
        </main>
      </div>

      {/* ------------------------------------------------- MENU HP */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              aria-label="Tutup menu"
              className="fixed inset-0 z-40 bg-deep/50 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 260 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[80%] max-w-xs flex-col border-r border-line bg-canvas px-5 pt-5 safe-bottom lg:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="eyebrow">Panel Admin</span>
                <button onClick={() => setMenuOpen(false)} className="icon-btn" aria-label="Tutup menu">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6">{nav}</div>

              <div className="mt-auto space-y-3 border-t border-line pt-5">
                <Link to="/" target="_blank" className="btn btn-outline w-full">
                  <ExternalLink className="h-4 w-4" /> Lihat Web
                </Link>
                <p className="truncate text-center text-xs text-inksoft">{email}</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminLayout;
