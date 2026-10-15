import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, X, Plus, Minus, Trash2, Sprout, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { hargaJual, diskonPersen } from '../lib/utils';
import { fotoProduk } from '../lib/image';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

/** Layar sempit memakai panel naik dari bawah; desktop memakai panel dari kanan. */
function useLayarSempit() {
  const [sempit, setSempit] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia('(max-width: 639px)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const onChange = (event: MediaQueryListEvent) => setSempit(event.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return sempit;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const sempit = useLayarSempit();

  // Total memakai harga promo kalau produknya sedang diskon.
  const total = items.reduce((sum, item) => sum + hargaJual(item) * item.quantity, 0);
  const totalItem = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalHemat = items.reduce(
    (sum, item) => sum + (item.price - hargaJual(item)) * item.quantity,
    0,
  );

  // Kunci gulir halaman selama keranjang terbuka.
  useEffect(() => {
    if (!isOpen) return;
    const sebelumnya = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = sebelumnya;
    };
  }, [isOpen]);

  // Tombol Esc menutup keranjang.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const handleCheckout = () => {
    const lines = items.map((item) => {
      const satuan = hargaJual(item);
      const diskon = diskonPersen(item);
      const keterangan = diskon > 0 ? `, promo -${diskon}%` : '';
      return `- ${item.name} (${item.quantity}x @ Rp ${satuan.toLocaleString('id-ID')}${keterangan})`;
    });
    const message = `Halo Sahid Tani, saya ingin memesan:\n${lines.join('\n')}\n\nTotal: Rp ${total.toLocaleString('id-ID')}`;
    window.open(`https://wa.me/6285878412411?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-label="Tutup keranjang"
            className="fixed inset-0 z-[60] bg-deep/55 backdrop-blur-sm"
          />

          <motion.aside
            initial={sempit ? { y: '100%' } : { x: '100%' }}
            animate={sempit ? { y: 0 } : { x: 0 }}
            exit={sempit ? { y: '100%' } : { x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 280 }}
            className="fixed inset-x-0 bottom-0 z-[70] flex max-h-[90svh] w-full flex-col rounded-t-[1.75rem] border border-line bg-canvas
                       sm:inset-y-0 sm:left-auto sm:right-0 sm:h-full sm:max-h-none sm:w-full sm:max-w-md sm:rounded-none sm:rounded-l-[1.75rem] sm:border-y-0 sm:border-r-0"
            aria-label="Keranjang belanja"
          >
            {/* Gagang tarik, hanya tampil di HP */}
            <div className="mx-auto mt-2.5 h-1.5 w-10 flex-shrink-0 rounded-full bg-line sm:hidden" />

            <header className="flex flex-shrink-0 items-center justify-between gap-3 border-b border-line px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brandsoft text-brand">
                  <ShoppingCart className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-base font-extrabold text-ink">Keranjang</h2>
                  <p className="text-xs text-inksoft">
                    {totalItem > 0 ? `${totalItem} bibit dipilih` : 'Belum ada pilihan'}
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="icon-btn" aria-label="Tutup keranjang">
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="grid h-20 w-20 place-items-center rounded-full bg-surface2 text-brand">
                    <Sprout className="h-9 w-9" />
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold text-ink">Keranjang masih kosong</h3>
                  <p className="mt-1 max-w-[16rem] text-sm text-inksoft">
                    Pilih bibit unggul favoritmu, lalu pesan langsung lewat WhatsApp.
                  </p>
                  <Link to="/produk" onClick={onClose} className="btn btn-primary mt-6">
                    Lihat Katalog <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => {
                    const diskon = diskonPersen(item);
                    const penuh = item.stock > 0 && item.quantity >= item.stock;
                    return (
                      <li key={item.id} className="card flex gap-3 p-3">
                        <Link
                          to={`/produk/${item.id}`}
                          onClick={onClose}
                          className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-surface2"
                        >
                          <img
                            src={fotoProduk(item.images[0], 160)}
                            alt={item.name}
                            className="h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </Link>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              to={`/produk/${item.id}`}
                              onClick={onClose}
                              className="line-clamp-2 text-sm font-bold text-ink hover:text-brand"
                            >
                              {item.name}
                            </Link>
                            <button
                              onClick={() => onRemove(item.id)}
                              aria-label={`Hapus ${item.name}`}
                              className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full text-inksoft transition-colors hover:bg-promosoft hover:text-promo"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
                            <span className="text-sm font-extrabold text-ink">
                              Rp {hargaJual(item).toLocaleString('id-ID')}
                            </span>
                            {diskon > 0 && (
                              <>
                                <span className="text-[11px] text-inksoft line-through">
                                  Rp {item.price.toLocaleString('id-ID')}
                                </span>
                                <span className="badge bg-promosoft text-promo">-{diskon}%</span>
                              </>
                            )}
                          </div>

                          <div className="mt-2 flex items-center justify-between gap-2">
                            <div className="inline-flex items-center gap-1 rounded-full border border-line bg-surface p-1">
                              <button
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                aria-label="Kurangi jumlah"
                                className="grid h-8 w-8 place-items-center rounded-full text-inksoft transition-colors hover:bg-surface2 hover:text-ink"
                              >
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-6 text-center text-sm font-extrabold text-ink">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                disabled={penuh}
                                aria-label="Tambah jumlah"
                                title={penuh ? `Stok tersisa ${item.stock}` : 'Tambah jumlah'}
                                className="grid h-8 w-8 place-items-center rounded-full text-inksoft transition-colors hover:bg-surface2 hover:text-ink disabled:opacity-40"
                              >
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <span className="text-sm font-extrabold text-ink">
                              Rp {(hargaJual(item) * item.quantity).toLocaleString('id-ID')}
                            </span>
                          </div>

                          {penuh && (
                            <p className="mt-2 text-[11px] font-bold text-warn">
                              Jumlah sudah mencapai stok tersedia ({item.stock}).
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="flex-shrink-0 border-t border-line bg-surface px-5 pt-4 safe-bottom">
                {totalHemat > 0 && (
                  <div className="mb-3 flex items-center justify-between rounded-2xl bg-promosoft px-4 py-2.5 text-xs font-bold text-promo">
                    <span>Hemat dari promo</span>
                    <span>- Rp {totalHemat.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-inksoft">Total pembayaran</span>
                  <span className="text-xl font-extrabold text-ink">
                    Rp {total.toLocaleString('id-ID')}
                  </span>
                </div>
                <button onClick={handleCheckout} className="btn btn-wa w-full">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.658-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Pesan via WhatsApp
                </button>
                <p className="mt-3 text-center text-[11px] text-inksoft">
                  Pesanan diteruskan ke WhatsApp Sahid Tani untuk konfirmasi.
                </p>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
