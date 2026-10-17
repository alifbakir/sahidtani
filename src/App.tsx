import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Cart from './components/Cart';
import MobileNav from './components/MobileNav';
import ScrollToTop from './components/ScrollToTop';
import { useManifestAplikasi } from './hooks/useManifestAplikasi';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import AdminLayout from './pages/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';
import AdminCategories from './pages/admin/AdminCategories';
import { Product, CartItem } from './types';

interface ShellProps {
  cartItems: CartItem[];
  isCartOpen: boolean;
  onCartOpen: () => void;
  onCartClose: () => void;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

/**
 * Area /admin punya tata letaknya sendiri (tanpa navbar & keranjang toko),
 * jadi bagian toko hanya dipasang di halaman publik.
 */
const Shell: React.FC<ShellProps> = ({
  cartItems,
  isCartOpen,
  onCartOpen,
  onCartClose,
  onAddToCart,
  onUpdateQuantity,
  onRemove,
}) => {
  const { pathname } = useLocation();
  const isAdminArea = pathname.startsWith('/admin');
  // Halaman detail produk sudah punya bilah aksi lengket sendiri,
  // jadi navigasi bawah tidak dipasang di sana.
  const isDetailProduk = /^\/produk\/[^/]+/.test(pathname);
  const pakaiMobileNav = !isAdminArea && !isDetailProduk;
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Area admin memasang manifest sendiri, jadi keduanya bisa dipasang sebagai
  // dua aplikasi berbeda (ikon toko dan ikon admin di layar utama).
  useManifestAplikasi(isAdminArea ? '/admin.webmanifest' : '/manifest.webmanifest');

  return (
    <div className="min-h-dvh bg-canvas font-sans text-ink">
      {!isAdminArea && <Navbar cartCount={cartCount} onCartClick={onCartOpen} />}

      <div className={pakaiMobileNav ? 'pb-mobilenav md:pb-0' : undefined}>
        <main>
          <Routes>
            <Route path="/" element={<Home onAddToCart={onAddToCart} />} />
            <Route path="/tentang" element={<About />} />
            <Route path="/produk" element={<Products onAddToCart={onAddToCart} />} />
            <Route path="/produk/:id" element={<ProductDetail onAddToCart={onAddToCart} />} />
            <Route path="/kontak" element={<Contact />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="produk" element={<AdminProducts />} />
              <Route path="produk/baru" element={<AdminProductForm />} />
              <Route path="produk/:id" element={<AdminProductForm />} />
              <Route path="kategori" element={<AdminCategories />} />
            </Route>
          </Routes>
        </main>

        {!isAdminArea && <Footer />}
      </div>

      {!isAdminArea && (
        <Cart
          isOpen={isCartOpen}
          onClose={onCartClose}
          items={cartItems}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemove}
        />
      )}

      {pakaiMobileNav && <MobileNav cartCount={cartCount} onCartClick={onCartOpen} />}

      {/* Kartu ajakan memasang aplikasi (PwaInstall) sengaja TIDAK dipasang:
          pengunjung tidak mau diganggu pop-up. Komponennya masih ada di
          src/components/PwaInstall.tsx kalau nanti mau dipakai lagi. */}
    </div>
  );
};

// Posisi gulir diatur oleh komponen ScrollToTop (src/components/ScrollToTop.tsx).
const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('sahidTaniCart');
    if (!savedCart) return;
    try {
      setCartItems(JSON.parse(savedCart));
    } catch {
      localStorage.removeItem('sahidTaniCart');
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('sahidTaniCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    // Stok 0 tidak bisa dipesan; tombol di kartu produk juga sudah dimatikan.
    if (product.stock <= 0) return;

    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          // Salinan data ikut disegarkan, jadi kalau admin mengubah harga/nama
          // atau stok, keranjang pembeli memakai data terbaru.
          item.id === product.id
            ? { ...item, ...product, quantity: Math.min(product.stock, item.quantity + 1) }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        // Jumlah pesanan dibatasi stok yang tersedia.
        const cap = item.stock > 0 ? item.stock : Number.POSITIVE_INFINITY;
        const newQty = Math.min(cap, Math.max(1, item.quantity + delta));
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Router>
      <ScrollToTop />
      <Shell
        cartItems={cartItems}
        isCartOpen={isCartOpen}
        onCartOpen={() => setIsCartOpen(true)}
        onCartClose={() => setIsCartOpen(false)}
        onAddToCart={addToCart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    </Router>
  );
};

export default App;
