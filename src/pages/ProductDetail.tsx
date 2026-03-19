import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  Star, 
  ShoppingCart, 
  Info, 
  Leaf, 
  Sprout, 
  Droplets, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { products } from '../data';
import { Product } from '../types';

interface ProductDetailProps {
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'deskripsi' | 'ciri' | 'tanam' | 'rawat'>('deskripsi');

  useEffect(() => {
    const foundProduct = products.find(p => p.id === Number(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setActiveImage(foundProduct.images[0]);
    } else {
      navigate('/produk');
    }
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (!product) return null;

  const tabs = [
    { id: 'deskripsi', label: 'Deskripsi', icon: Info },
    { id: 'ciri', label: 'Ciri-Ciri', icon: Leaf },
    { id: 'tanam', label: 'Cara Menanam', icon: Sprout },
    { id: 'rawat', label: 'Perawatan', icon: Droplets },
  ];

  return (
    <div className="pt-24 pb-12 md:pt-28 md:pb-20 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link to="/produk" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-primary transition-colors mb-6 md:mb-8 group text-sm md:text-base">
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:-translate-x-1" />
          Kembali ke Produk
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
          {/* Image Gallery */}
          <div className="space-y-4 md:space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square rounded-3xl md:rounded-[40px] overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 shadow-xl"
            >
              <img 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-2 md:gap-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-primary shadow-lg scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6 md:mb-8">
              <div className="flex items-center gap-2 text-primary font-bold text-[10px] md:text-sm uppercase tracking-widest mb-2 md:mb-4">
                <Leaf className="w-3 h-3 md:w-4 md:h-4" /> {product.category}
              </div>
              <h1 className="text-2xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-2 md:mb-4 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                  <span className="text-slate-900 dark:text-slate-200 font-bold text-sm md:text-base">{product.rating}</span>
                </div>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <span className="text-slate-500 dark:text-slate-400 text-[10px] md:text-sm">Terjual 500+ Bibit</span>
              </div>
              <div className="text-2xl md:text-3xl font-black text-primary">
                Rp {product.price.toLocaleString('id-ID')}
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 border-b border-slate-100 dark:border-slate-800 mb-6 md:mb-8 pb-1 md:pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center justify-center gap-1.5 md:gap-2 px-1 py-3 md:py-5 text-xs md:text-base font-bold transition-all border-b-2 md:border-b-4 rounded-t-lg md:rounded-t-xl ${activeTab === tab.id ? 'border-primary text-primary bg-primary/5 dark:bg-primary/10' : 'border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  <tab.icon className="w-4 h-4 md:w-5 md:h-5" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-grow mb-8 md:mb-12 min-h-[200px] md:min-h-[300px]">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-lg"
              >
                {activeTab === 'deskripsi' && (
                  <div className="space-y-4 md:space-y-6">
                    <p>{product.description}</p>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-slate-100 dark:border-slate-800">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2 md:mb-4 flex items-center gap-2 text-sm md:text-base">
                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary" /> Keunggulan Bibit Kami
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 text-xs md:text-sm">
                        <li className="flex items-center gap-2">• Hasil okulasi/sambung pucuk</li>
                        <li className="flex items-center gap-2">• Bebas hama dan penyakit</li>
                        <li className="flex items-center gap-2">• Akar kuat dan sehat</li>
                        <li className="flex items-center gap-2">• Garansi pengiriman aman</li>
                      </ul>
                    </div>
                  </div>
                )}
                {activeTab === 'ciri' && (
                  <div className="space-y-8">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div> Ciri-Ciri Buah
                      </h4>
                      <p>{product.fruitFeatures}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div> Ciri-Ciri Tanaman
                      </h4>
                      <p>{product.plantFeatures}</p>
                    </div>
                  </div>
                )}
                {activeTab === 'tanam' && (
                  <div className="space-y-6">
                    <p>{product.plantingGuide}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-secondary/30 dark:bg-primary/10 rounded-2xl border border-secondary dark:border-primary/20">
                        <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-1 text-sm">Kebutuhan Cahaya</h5>
                        <p className="text-xs">Sinar matahari penuh (8-10 jam)</p>
                      </div>
                      <div className="p-4 bg-secondary/30 dark:bg-primary/10 rounded-2xl border border-secondary dark:border-primary/20">
                        <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-1 text-sm">Media Tanam</h5>
                        <p className="text-xs">Tanah gembur & kaya organik</p>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'rawat' && (
                  <div className="space-y-6">
                    <p>{product.careGuide}</p>
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Droplets className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-900 dark:text-white text-sm">Penyiraman</h5>
                          <p className="text-xs">Rutin pagi dan sore hari, hindari genangan air.</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Sprout className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-900 dark:text-white text-sm">Pemupukan</h5>
                          <p className="text-xs">Gunakan pupuk NPK seimbang setiap 3-4 bulan sekali.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <button 
                onClick={() => onAddToCart(product)}
                className="flex-grow flex items-center justify-center gap-2 md:gap-3 bg-primary text-white px-6 py-4 md:px-8 md:py-5 rounded-full font-bold hover:bg-green-800 transition-all shadow-lg shadow-primary/20 text-sm md:text-base"
              >
                <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" /> Tambah ke Keranjang
              </button>
              <a 
                href={`https://wa.me/6285878412411?text=Halo Sahid Tani, saya tertarik dengan bibit ${product.name}. Bisa tanya-tanya dulu?`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 md:gap-3 bg-slate-900 dark:bg-slate-800 text-white px-6 py-4 md:px-8 md:py-5 rounded-full font-bold hover:bg-slate-800 dark:hover:bg-slate-700 transition-all text-sm md:text-base"
              >
                Tanya via WhatsApp <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
