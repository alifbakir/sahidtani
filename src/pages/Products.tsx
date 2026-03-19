import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, ChevronRight, Star, ShoppingCart } from 'lucide-react';
import { products } from '../data';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

interface ProductsProps {
  onAddToCart: (product: Product) => void;
}

const Products: React.FC<ProductsProps> = ({ onAddToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category)));
    return ['Semua', ...cats];
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Semua' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="pt-16 min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Header Section */}
      <section className="bg-white dark:bg-slate-900 py-10 md:py-20 border-b border-slate-100 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
            <div className="max-w-2xl">
              <h1 className="text-2xl md:text-6xl font-serif font-bold text-slate-900 dark:text-white mb-3 md:mb-6">Katalog Bibit <span className="text-primary italic">Unggul</span></h1>
              <p className="text-sm md:text-lg text-slate-500 dark:text-slate-400">Temukan berbagai pilihan bibit buah berkualitas tinggi.</p>
            </div>
            <div className="flex items-center gap-4 text-[10px] md:text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              <span>{filteredProducts.length} Produk Ditemukan</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Section */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 py-6 md:py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 md:space-y-8">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-slate-400 dark:text-slate-500" />
              <input 
                type="text" 
                placeholder="Cari bibit buah unggulan..." 
                className="w-full pl-12 md:pl-16 pr-4 md:pr-6 py-3 md:py-5 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl md:rounded-[32px] text-sm md:text-lg text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter - Simplified wrapped layout */}
            <div className="flex flex-col items-center gap-3 md:gap-4">
              <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mb-1 md:mb-2">
                <Filter className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Pilih Kategori Bibit</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 md:px-8 md:py-4 rounded-xl md:rounded-2xl text-xs md:text-base font-bold transition-all border-2 ${
                      selectedCategory === category 
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105' 
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-100 dark:border-slate-700 hover:border-primary/30 hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8"
            >
              <AnimatePresence>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="py-24 text-center">
              <div className="bg-white dark:bg-slate-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Search className="w-8 h-8 text-slate-200 dark:text-slate-700" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Produk Tidak Ditemukan</h3>
              <p className="text-slate-500 dark:text-slate-400">Coba gunakan kata kunci lain atau pilih kategori yang berbeda.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
