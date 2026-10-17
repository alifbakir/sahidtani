import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Instagram,
  Facebook,
  MessageCircle,
  Navigation,
  CheckCircle2,
} from 'lucide-react';
import Reveal from '../components/Reveal';
import { useMeta } from '../hooks/useMeta';

const kontak = [
  {
    icon: MapPin,
    label: 'Alamat',
    value: 'Jl. Plongkowati No.7, Tegalrejo, Kec. Argomulyo, Kota Salatiga, Jawa Tengah 50733',
    href: 'https://www.google.com/maps/place/Sahid+Tani/@-7.3424766,110.5019279,17z/data=!3m1!4b1!4m6!3m5!1s0x2e7a79cc11934a49:0x59def18ab53e0353!8m2!3d-7.3424819!4d110.5045028!16s%2Fg%2F11dfg0kndg?entry=ttu',
  },
  { icon: Phone, label: 'Telepon / WhatsApp', value: '+62 858 7841 2411', href: 'https://wa.me/6285878412411' },
  { icon: Mail, label: 'Email', value: 'sahidtani@gmail.com', href: 'mailto:sahidtani@gmail.com' },
  { icon: Clock, label: 'Jam operasional', value: 'Senin - Sabtu: 06.00 - 18.00 WIB' },
];

const WA_LINK = 'https://wa.me/6285878412411?text=Halo%20Sahid%20Tani%2C%20saya%20mau%20bertanya.';

const Contact = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useMeta({
    judul: 'Kontak & Lokasi Sahid Tani — Salatiga',
    deskripsi:
      'Hubungi Sahid Tani lewat WhatsApp untuk tanya stok, harga, dan pengiriman bibit buah dari Salatiga.',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const waNumber = '6285878412411';
    const text = `Halo Sahid Tani, saya ${name}.\n\nPesan saya:\n${message}`;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div>
      {/* ---------------------------------------------------------- HERO */}
      <section className="relative isolate flex min-h-[46svh] items-center overflow-hidden md:min-h-[52svh]">
        <img
          src="/bgcontact.JPG"
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="veil absolute inset-0 -z-10" />

        <div className="shell py-24 text-center md:py-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge border border-white/20 bg-white/10 text-white backdrop-blur-sm">
              <MessageCircle className="h-3.5 w-3.5" /> Kami siap membantu
            </span>
            <h1 className="display mt-5 text-[2rem] leading-tight text-white md:text-5xl">
              Hubungi <span className="text-[#7ef0ab]">Kami</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-white/80 md:text-lg">
              Punya pertanyaan seputar bibit, pengiriman, atau proyek kebun? Tim kami siap menjawab.
            </p>

            {/* Jalan pintas paling sering dipakai pembeli */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa w-full sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" /> Chat WhatsApp
              </a>
              <a
                href="https://www.google.com/maps/place/Sahid+Tani/@-7.3424766,110.5019279,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="btn w-full border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 sm:w-auto"
              >
                <Navigation className="h-4 w-4" /> Buka rute
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------- INFO & FORMULIR */}
      <section className="shell py-12 md:py-20">
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
          {/* Info kontak */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-extrabold text-ink md:text-2xl">Informasi kontak</h2>

            <div className="mt-6 space-y-3">
              {kontak.map((item) => {
                const isi = (
                  <>
                    <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl bg-brandsoft text-brand">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-extrabold text-ink">{item.label}</h3>
                      <p className="mt-0.5 text-xs leading-relaxed text-inksoft md:text-sm">
                        {item.value}
                      </p>
                    </div>
                  </>
                );

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card flex gap-4 p-4 transition-colors hover:border-brand"
                  >
                    {isi}
                  </a>
                ) : (
                  <div key={item.label} className="card flex gap-4 p-4">
                    {isi}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 border-t border-line pt-6">
              <h3 className="text-sm font-extrabold text-ink">Ikuti media sosial kami</h3>
              <div className="mt-4 flex gap-3">
                {[
                  {
                    href: 'https://www.instagram.com/sahid.tani_/',
                    label: 'Instagram',
                    icon: <Instagram className="h-5 w-5" />,
                  },
                  {
                    href: 'https://www.facebook.com/sahid.tani.12?locale=id_ID',
                    label: 'Facebook',
                    icon: <Facebook className="h-5 w-5" />,
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="grid h-11 w-11 place-items-center rounded-full bg-surface2 text-inksoft transition-colors hover:bg-brand hover:text-white"
                  >
                    {item.icon}
                  </a>
                ))}
                <a
                  href="https://wa.me/6285878412411"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="grid h-11 w-11 place-items-center rounded-full bg-surface2 text-inksoft transition-colors hover:bg-[#25D366] hover:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.658-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Formulir */}
          <Reveal className="lg:col-span-2">
            <div className="panel md:p-10">
              <h2 className="text-xl font-extrabold text-ink md:text-2xl">Kirim pesan</h2>
              <p className="mt-2 text-sm text-inksoft">
                Pesan akan diteruskan ke WhatsApp kami supaya bisa dibalas lebih cepat.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label htmlFor="nama" className="field-label">
                    Nama lengkap
                  </label>
                  <input
                    id="nama"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama Anda"
                    className="field"
                  />
                </div>

                <div>
                  <label htmlFor="pesan" className="field-label">
                    Pesan Anda
                  </label>
                  <textarea
                    id="pesan"
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tuliskan pertanyaan Anda..."
                    className="field resize-none"
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button type="submit" className="btn btn-primary w-full sm:w-auto">
                    Kirim pesan <Send className="h-4 w-4" />
                  </button>
                  <p className="inline-flex items-center gap-2 text-xs text-inksoft">
                    <CheckCircle2 className="h-4 w-4 text-brand" /> Dibalas pada jam kerja
                  </p>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- PETA */}
      <section className="shell pb-14 md:pb-20">
        <Reveal>
          <div className="relative h-[300px] overflow-hidden rounded-[1.5rem] border border-line shadow-[var(--shadow-soft)] md:h-[460px] md:rounded-[2rem]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.382025345719!2d110.5019279!3d-7.3424819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a79cc11934a49%3A0x59def18ab53e0353!2sSahid%20Tani!5e0!3m2!1sid!2sid!4v1710670000000!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Sahid Tani"
            />
            <a
              href="https://www.google.com/maps/place/Sahid+Tani/@-7.3424766,110.5019279,17z/data=!3m1!4b1!4m6!3m5!1s0x2e7a79cc11934a49:0x59def18ab53e0353!8m2!3d-7.3424819!4d110.5045028!16s%2Fg%2F11dfg0kndg?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="card absolute bottom-4 left-4 right-4 flex items-center gap-3 p-4 transition-transform hover:-translate-y-0.5 md:left-6 md:top-6 md:right-auto md:bottom-auto md:max-w-[16rem]"
            >
              <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-2xl bg-brandsoft text-brand">
                <Navigation className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-sm font-extrabold text-brand">Lokasi kami</h3>
                <p className="mt-0.5 text-xs text-inksoft">
                  Ketuk untuk membuka rute di Google Maps.
                </p>
              </div>
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Contact;
