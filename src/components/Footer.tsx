import React from "react";
import { Link } from "react-router-dom";
import { Phone, MapPin, Mail, Instagram, Facebook } from "lucide-react";

const Footer = () => (
  <footer
    id="kontak"
    className="bg-slate-900 dark:bg-black text-white pt-24 pb-12 transition-colors"
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <img
              src="/logonavbarnobg.png"
              alt="Logo Sahid Tani"
              className="h-12 md:h-16 w-auto object-contain"
            />
          </div>
          <p className="text-slate-400 dark:text-slate-500 leading-relaxed">
            Pusat pembibitan buah unggul terpercaya di Indonesia. Kami
            berkomitmen menghadirkan bibit berkualitas tinggi untuk masa depan
            pertanian yang lebih baik.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/sahid.tani_/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/5 dark:bg-slate-900 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/sahid.tani.12?locale=id_ID"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/5 dark:bg-slate-900 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/6285878412411"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/5 dark:bg-slate-900 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.658-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-8">Tautan Cepat</h4>
          <ul className="space-y-4 text-slate-400 dark:text-slate-500">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">
                Beranda
              </Link>
            </li>
            <li>
              <Link
                to="/tentang"
                className="hover:text-primary transition-colors"
              >
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link
                to="/produk"
                className="hover:text-primary transition-colors"
              >
                Produk
              </Link>
            </li>
            <li>
              <Link
                to="/kontak"
                className="hover:text-primary transition-colors"
              >
                Kontak
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-8">Kategori Populer</h4>
          <ul className="space-y-4 text-slate-400 dark:text-slate-500">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Bibit Durian
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Bibit Alpukat
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Bibit Mangga
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Bibit Jeruk
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-8">Hubungi Kami</h4>
          <ul className="space-y-6 text-slate-400 dark:text-slate-500">
            <li className="flex gap-4">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <span>
                Jl. Plongkowati No.7, Tegalrejo, Kec. Argomulyo, Kota Salatiga,
                Jawa Tengah 50733
              </span>
            </li>
            <li className="flex gap-4">
              <Phone className="w-5 h-5 text-primary flex-shrink-0" />
              <span>+62 858 7841 2411</span>
            </li>
            <li className="flex gap-4">
              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
              <span>sahidtani@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-12 border-t border-white/5 dark:border-slate-900 text-center text-slate-500 dark:text-slate-600 text-sm">
        <p>&copy; {new Date().getFullYear()} ALIF AL FATAH PUTRA</p>
        <p>
          &copy; {new Date().getFullYear()} CORNELIUS JOHAN SEPTIAN WIRA PRATAMA
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
