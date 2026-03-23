import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook } from 'lucide-react';

const Contact = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const waNumber = '6285878412411';
    const text = `Halo Sahid Tani, saya ${name}.\n\nPesan saya:\n${message}`;
    const encodedText = encodeURIComponent(text);
    
    window.open(`https://wa.me/${waNumber}?text=${encodedText}`, '_blank');
  };

  return (
    <div className="pt-16 min-h-screen bg-white dark:bg-slate-900 transition-colors">
      {/* Header Section */}
      <section className="bg-slate-900 dark:bg-black py-16 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="./bgcontact.JPG" 
            alt="Contact Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-6xl font-serif font-bold text-white mb-4 md:mb-6">Hubungi <span className="text-primary italic">Kami</span></h1>
            <p className="text-sm md:text-xl text-slate-300 dark:text-slate-400 max-w-2xl mx-auto">
              Punya pertanyaan seputar bibit? Tim ahli kami siap membantu Anda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6 md:space-y-8">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-6 md:mb-8">Informasi Kontak</h2>
                <div className="space-y-4 md:space-y-6">
                  <div className="flex gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary dark:bg-primary/20 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm md:text-base text-slate-800 dark:text-slate-200 mb-0.5 md:mb-1">Alamat</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm leading-relaxed">
                        Jl. Plongkowati No.7, Tegalrejo, Kec. Argomulyo, Kota Salatiga, Jawa Tengah 50733 
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary dark:bg-primary/20 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm md:text-base text-slate-800 dark:text-slate-200 mb-0.5 md:mb-1">Telepon / WhatsApp</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm">+62 858 7841 2411</p>
                    </div>
                  </div>

                  <div className="flex gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary dark:bg-primary/20 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm md:text-base text-slate-800 dark:text-slate-200 mb-0.5 md:mb-1">Email Resmi</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm">sahidtani@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary dark:bg-primary/20 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm md:text-base text-slate-800 dark:text-slate-200 mb-0.5 md:mb-1">Jam Operasional</h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm">Senin - Sabtu: 06.00 - 18.00 WIB</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 md:pt-8 border-t border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-sm md:text-base text-slate-800 dark:text-slate-200 mb-3 md:mb-4">Ikuti Media Sosial Kami</h4>
                <div className="flex gap-3 md:gap-4">
                  <a href="https://www.instagram.com/sahid.tani_/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                    <Instagram className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                  <a href="https://www.facebook.com/sahid.tani.12?locale=id_ID" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                    <Facebook className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                  <a href="https://wa.me/6285878412411" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.658-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-slate-50 dark:bg-slate-800/50 p-6 md:p-12 rounded-3xl md:rounded-[40px] border border-slate-100 dark:border-slate-800">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-6 md:mb-8">Kirim Pesan</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="md:col-span-2 space-y-1 md:space-y-2">
                  <label className="text-xs md:text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Nama Lengkap</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama Anda" 
                    className="w-full px-4 md:px-6 py-3 md:py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm md:text-base text-slate-900 dark:text-white"
                  />
                </div>
                <div className="md:col-span-2 space-y-1 md:space-y-2">
                  <label className="text-xs md:text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Pesan Anda</label>
                  <textarea 
                    rows={4} 
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tuliskan pertanyaan Anda..." 
                    className="w-full px-4 md:px-6 py-3 md:py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-sm md:text-base text-slate-900 dark:text-white"
                  ></textarea>
                </div>
                <div className="md:col-span-2 pt-2 md:pt-4">
                  <button 
                    type="submit"
                    className="w-full md:w-auto px-10 py-3 md:px-12 md:py-4 bg-primary text-white rounded-full font-bold hover:bg-green-800 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-3 text-sm md:text-base"
                  >
                    Kirim Pesan <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-12 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl md:rounded-[40px] overflow-hidden shadow-2xl border-4 md:border-8 border-white dark:border-slate-800 relative h-[300px] md:h-[500px] group">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.382025345719!2d110.5019279!3d-7.3424819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a79cc11934a49%3A0x59def18ab53e0353!2sSahid%20Tani!5e0!3m2!1sid!2sid!4v1710670000000!5m2!1sid!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Sahid Tani"
            ></iframe>
            <a 
              href="https://www.google.com/maps/place/Sahid+Tani/@-7.3424766,110.5019279,17z/data=!3m1!4b1!4m6!3m5!1s0x2e7a79cc11934a49:0x59def18ab53e0353!8m2!3d-7.3424819!4d110.5045028!16s%2Fg%2F11dfg0kndg?entry=ttu" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="absolute top-6 right-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 max-w-[240px] hidden md:block hover:scale-105 transition-transform z-20 cursor-pointer"
            >
              <h4 className="font-bold text-primary dark:text-primary mb-1">Lokasi Kami</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Klik di sini untuk membuka rute perjalanan di Google Maps.</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
