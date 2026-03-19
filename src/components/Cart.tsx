import React from 'react';
import { ShoppingCart, X, Plus, Minus, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    const message = `Halo Sahid Tani, saya ingin memesan:\n${items.map(item => `- ${item.name} (${item.quantity}x)`).join('\n')}`;
    window.open(`https://wa.me/6285878412411?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-[70] flex flex-col transition-colors"
          >
            <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="bg-secondary dark:bg-primary/20 p-1.5 md:p-2 rounded-lg md:rounded-xl">
                  <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">Keranjang</h2>
              </div>
              <button onClick={onClose} className="p-1.5 md:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <X className="w-5 h-5 md:w-6 md:h-6 text-slate-400 dark:text-slate-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-full mb-3 md:mb-4">
                    <ShoppingCart className="w-10 h-10 md:w-12 md:h-12 text-slate-200 dark:text-slate-700" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-slate-200 mb-1 md:mb-2">Keranjang Kosong</h3>
                  <p className="text-xs md:text-sm text-slate-400 dark:text-slate-500 max-w-[180px] md:max-w-[200px]">Sepertinya Anda belum memilih bibit unggulan kami.</p>
                </div>
              ) : (
                <div className="space-y-4 md:space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 md:gap-4 group">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100 dark:border-slate-800">
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm md:text-base text-slate-800 dark:text-slate-100 mb-0.5 md:mb-1 truncate">{item.name}</h4>
                        <div className="text-primary font-bold mb-2 md:mb-3 text-sm md:text-base">Rp {item.price.toLocaleString('id-ID')}</div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 md:gap-3 bg-slate-50 dark:bg-slate-800 rounded-lg md:rounded-xl p-1">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="p-1 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm rounded-md md:rounded-lg transition-all"
                            >
                              <Minus className="w-3 h-3 md:w-4 md:h-4 text-slate-600 dark:text-slate-400" />
                            </button>
                            <span className="text-xs md:text-sm font-bold w-3 md:w-4 text-center text-slate-800 dark:text-slate-200">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="p-1 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm rounded-md md:rounded-lg transition-all"
                            >
                              <Plus className="w-3 h-3 md:w-4 md:h-4 text-slate-600 dark:text-slate-400" />
                            </button>
                          </div>
                          <button 
                            onClick={() => onRemove(item.id)}
                            className="text-[10px] md:text-xs font-bold text-red-400 hover:text-red-500 transition-colors"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-4 md:p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <span className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium">Total Pembayaran</span>
                  <span className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">Rp {total.toLocaleString('id-ID')}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full py-3 md:py-4 bg-primary text-white rounded-xl md:rounded-2xl font-bold hover:bg-green-800 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base"
                >
                  <Phone className="w-4 h-4 md:w-5 md:h-5" />
                  Pesan via WhatsApp
                </button>
                <p className="text-center text-[8px] md:text-[10px] text-slate-400 dark:text-slate-500 mt-3 md:mt-4 uppercase tracking-widest font-bold">
                  Selesaikan pesanan Anda sekarang
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
