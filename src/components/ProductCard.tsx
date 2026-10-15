import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, ImageOff, Flame } from 'lucide-react';
import { Product } from '../types';
import { hargaJual, diskonPersen } from '../lib/utils';
import { fotoProduk } from '../lib/image';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  /** Posisi kartu di dalam grid; dipakai untuk jeda animasi masuk (0-8). */
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [altSiap, setAltSiap] = useState(false);

  const habis = product.stock <= 0;
  const diskon = diskonPersen(product);
  const jual = hargaJual(product);
  const stokTipis = !habis && product.stock <= 3;
  // Produk yang baru ditambah lewat panel admin bisa punya satu foto saja.
  const hasAlt = product.images.length > 1;
  // Foto kedua baru dipasang saat kursor masuk, jadi tidak ikut memuat di awal.
  const tampilAlt = hasAlt && isHovered;
  // Foto utama baru disembunyikan setelah foto kedua benar-benar siap,
  // supaya tidak ada jeda gambar kosong.
  const altAktif = tampilAlt && altSiap;

  return (
    <article
      data-flip={product.id}
      className="card card-masuk hover-lift group flex flex-col overflow-hidden"
      style={{ '--masuk': Math.min(index, 8) } as React.CSSProperties}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`/produk/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-surface2"
      >
        <div className={`h-full w-full ${habis ? 'opacity-60 grayscale' : ''}`}>
          <img
            src={fotoProduk(product.images[0], 500)}
            alt={product.name}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className={`h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out md:group-hover:scale-[1.06] ${
              altAktif ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {tampilAlt && (
            <img
              src={fotoProduk(product.images[1], 500)}
              alt={`${product.name} — tampilan lain`}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onLoad={() => setAltSiap(true)}
              className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out md:group-hover:scale-[1.06] ${
                altAktif ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </div>

        <div className="absolute left-2.5 top-2.5 z-10 flex flex-col items-start gap-1.5">
          {diskon > 0 && (
            <span className="badge bg-promo text-white shadow-sm">-{diskon}%</span>
          )}
          {habis ? (
            <span className="badge bg-ink/85 text-canvas backdrop-blur-sm">Stok habis</span>
          ) : stokTipis ? (
            <span className="badge bg-warnsoft text-warn">
              <Flame className="h-3 w-3" /> Sisa {product.stock}
            </span>
          ) : null}
        </div>

        <span className="absolute right-2.5 top-2.5 z-10 inline-flex items-center gap-1 rounded-full bg-surface/90 px-2.5 py-1 text-[11px] font-extrabold text-ink backdrop-blur-sm">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          {product.rating}
        </span>

        {hasAlt && (
          <span className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            <span
              className={`h-1.5 rounded-full bg-white transition-all ${
                !isHovered ? 'w-4' : 'w-1.5 opacity-60'
              }`}
            />
            <span
              className={`h-1.5 rounded-full bg-white transition-all ${
                isHovered ? 'w-4' : 'w-1.5 opacity-60'
              }`}
            />
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-3 md:p-4">
        <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-brand">
          {product.category || 'Bibit'}
        </span>

        <Link to={`/produk/${product.id}`} className="mt-1">
          <h3 className="line-clamp-2 text-[13px] font-bold leading-snug text-ink transition-colors group-hover:text-brand md:text-[15px]">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto pt-3">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span
              className={`text-[15px] font-extrabold md:text-lg ${
                diskon > 0 ? 'text-promo' : 'text-ink'
              }`}
            >
              Rp {jual.toLocaleString('id-ID')}
            </span>
            {diskon > 0 && (
              <span className="text-[11px] text-inksoft line-through md:text-xs">
                Rp {product.price.toLocaleString('id-ID')}
              </span>
            )}
          </div>

          {habis ? (
            <button type="button" disabled className="btn btn-outline mt-3 w-full" title="Stok habis">
              <ImageOff className="h-4 w-4" /> Stok habis
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onAddToCart(product)}
              className="btn btn-primary mt-3 w-full"
              title="Tambah ke keranjang"
            >
              <ShoppingCart className="h-4 w-4" /> Tambah
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
