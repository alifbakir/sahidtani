import React from 'react';
import { motion } from 'motion/react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Jeda kecil supaya beberapa kartu muncul berurutan. */
  delay?: number;
}

/**
 * Animasi masuk yang halus saat bagian halaman mulai terlihat.
 * Dipakai berulang di toko supaya terasa hidup tanpa mengganggu.
 */
const Reveal: React.FC<RevealProps> = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-70px' }}
    transition={{ duration: 0.55, ease: 'easeOut', delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default Reveal;
