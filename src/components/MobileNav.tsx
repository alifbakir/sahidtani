import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Sprout, ShoppingCart, MessageCircle } from 'lucide-react';

interface MobileNavProps {
  cartCount: number;
  onCartClick: () => void;
}

const WA_LINK =
  'https://wa.me/6285878412411?text=Halo%20Sahid%20Tani%2C%20saya%20mau%20tanya%20soal%20bibit%20buah.';

const itemBase =
  'flex flex-col items-center justify-center gap-1 rounded-2xl py-2 text-[10px] font-extrabold transition-colors';

/**
 * Navigasi bawah khusus HP: jangkauan jempol lebih nyaman daripada menu di atas.
 * Disembunyikan di halaman detail produk karena di sana sudah ada bilah pesan lengket.
 */
const MobileNav: React.FC<MobileNavProps> = ({ cartCount, onCartClick }) => (
  <nav
    aria-label="Navigasi utama"
    className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 backdrop-blur-xl md:hidden"
  >
    <div className="safe-bottom grid grid-cols-4 gap-1 px-2 pt-2">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `${itemBase} ${isActive ? 'text-brand' : 'text-inksoft active:bg-surface2'}`
        }
      >
        {({ isActive }) => (
          <>
            <span
              className={`grid h-8 w-12 place-items-center rounded-full transition-colors ${
                isActive ? 'bg-brandsoft' : ''
              }`}
            >
              <Home className="h-[18px] w-[18px]" />
            </span>
            Beranda
          </>
        )}
      </NavLink>

      <NavLink
        to="/produk"
        className={({ isActive }) =>
          `${itemBase} ${isActive ? 'text-brand' : 'text-inksoft active:bg-surface2'}`
        }
      >
        {({ isActive }) => (
          <>
            <span
              className={`grid h-8 w-12 place-items-center rounded-full transition-colors ${
                isActive ? 'bg-brandsoft' : ''
              }`}
            >
              <Sprout className="h-[18px] w-[18px]" />
            </span>
            Katalog
          </>
        )}
      </NavLink>

      <button
        type="button"
        onClick={onCartClick}
        className={`${itemBase} text-inksoft active:bg-surface2`}
        aria-label={`Keranjang${cartCount > 0 ? `, ${cartCount} item` : ''}`}
      >
        <span className="relative grid h-8 w-12 place-items-center rounded-full">
          <ShoppingCart className="h-[18px] w-[18px]" />
          {cartCount > 0 && (
            <span className="absolute right-2 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[9px] font-extrabold text-onbrand ring-2 ring-surface">
              {cartCount}
            </span>
          )}
        </span>
        Keranjang
      </button>

      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className={`${itemBase} text-inksoft active:bg-surface2`}
      >
        <span className="grid h-8 w-12 place-items-center rounded-full">
          <MessageCircle className="h-[18px] w-[18px]" />
        </span>
        Chat
      </a>
    </div>
  </nav>
);

export default MobileNav;
