import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Loader2, AlertCircle, Lock, ArrowLeft, ShieldCheck } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';

const AdminLogin: React.FC = () => {
  const { session, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-canvas">
        <Loader2 className="h-7 w-7 animate-spin text-brand" />
      </div>
    );
  }

  if (session) return <Navigate to="/admin" replace />;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    setSubmitting(false);
    if (signInError) {
      setError('Email atau password salah.');
    }
    // Kalau berhasil, useAuth otomatis mengalihkan ke /admin
  };

  return (
    <div className="grid min-h-screen bg-canvas lg:grid-cols-2">
      {/* Sisi merek, hanya tampil di layar lebar */}
      <aside className="relative hidden overflow-hidden bg-deep lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#7ef0ab]/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-[#156a3e]/40 blur-3xl" />

        <img
          src="/logonavbarnobg.png"
          alt="Sahid Tani"
          className="relative h-12 w-auto object-contain brightness-0 invert"
        />

        <div className="relative">
          <h2 className="display text-3xl leading-tight text-white">
            Kelola katalog bibit <span className="text-[#7ef0ab]">Sahid Tani</span>.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">
            Tambah produk, atur stok dan harga promo, serta kelola kategori — semuanya dari satu
            tempat dan langsung tampil di toko.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-white/70">
            {['Ubah stok tanpa membuka produk', 'Harga promo dengan pratinjau diskon', 'Unggah foto otomatis dikompres'].map(
              (item) => (
                <li key={item} className="flex items-center gap-3">
                  <ShieldCheck className="h-4 w-4 flex-shrink-0 text-[#7ef0ab]" />
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>

        <p className="relative text-xs text-white/40">
          &copy; {new Date().getFullYear()} Sahid Tani — Pusat Bibit Buah Unggul
        </p>
      </aside>

      {/* Formulir masuk */}
      <main className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="inline-flex min-h-10 items-center gap-2 text-sm font-bold text-inksoft transition-colors hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali ke toko
          </Link>

          <div className="panel mt-4 md:p-8">
            <img
              src="/logonavbarnobg.png"
              alt="Sahid Tani"
              className="h-11 w-auto object-contain lg:hidden"
            />

            <h1 className="mt-4 text-2xl font-extrabold text-ink lg:mt-0">Masuk Panel Admin</h1>
            <p className="mt-1 text-sm text-inksoft">Halaman ini hanya untuk pengelola Sahid Tani.</p>

            {!isSupabaseConfigured && (
              <div className="alert mt-6 bg-warnsoft text-warn">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                <span className="text-xs leading-relaxed">
                  Supabase belum dikonfigurasi. Isi <code>.env.local</code> dulu, lalu jalankan
                  ulang <code>npm run dev</code>.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="email" className="field-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="field"
                  placeholder="admin@sahidtani.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="field-label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="field"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="alert bg-dangersoft text-danger">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <span className="text-xs">{error}</span>
                </div>
              )}

              <button type="submit" disabled={submitting} className="btn btn-primary btn-lg w-full">
                {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Lock className="h-4 w-4" />}
                {submitting ? 'Memeriksa…' : 'Masuk'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLogin;
