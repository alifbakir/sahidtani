import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/produk/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img 
              key={isHovered ? 'hover' : 'normal'}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              src={isHovered ? product.images[1] : product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          
          {/* Photo Indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${!isHovered ? 'bg-white w-4' : 'bg-white/50'}`}></div>
            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isHovered ? 'bg-white w-4' : 'bg-white/50'}`}></div>
          </div>

          <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{product.rating}</span>
          </div>
        </div>
      </Link>
      <div className="p-3 md:p-6">
        <div className="text-[9px] md:text-[10px] font-bold text-primary mb-0.5 md:mb-2 uppercase tracking-wider">{product.category}</div>
        <Link to={`/produk/${product.id}`}>
          <h3 className="text-xs md:text-lg font-bold text-slate-800 dark:text-slate-100 mb-1.5 md:mb-4 group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[9px] md:text-[10px] text-slate-400 dark:text-slate-500 mb-0 md:mb-1">Harga Mulai</div>
            <div className="text-sm md:text-xl font-black text-slate-900 dark:text-white">Rp {product.price.toLocaleString('id-ID')}</div>
          </div>
          <button 
            onClick={() => onAddToCart(product)}
            className="p-1.5 md:p-3 bg-secondary dark:bg-primary/20 text-primary rounded-lg md:rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
          >
            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
