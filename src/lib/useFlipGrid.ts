import { useLayoutEffect, useRef } from 'react';
import type { DependencyList } from 'react';

/**
 * Animasi FLIP sederhana untuk grid kartu: setiap kali urutan anak berubah,
 * kartu meluncur dari posisi lamanya ke posisi baru.
 *
 * Kenapa begini: animasi layout per-kartu (motion `layout`) harus mengukur dan
 * menulis ulang transform puluhan elemen lewat JavaScript di main thread —
 * dengan 48 kartu itu berubah jadi long task ~150 ms dan animasinya patah-patah.
 * Versi ini hanya membaca posisi sekali per perubahan urutan, lalu menyerahkan
 * animasinya ke WAAPI (transform saja) yang jalan di luar main thread.
 *
 * Anak yang dianimasikan wajib punya atribut `data-flip` yang stabil (id produk).
 */
export function useFlipGrid<T extends HTMLElement>(deps: DependencyList) {
  const ref = useRef<T>(null);
  const posisiLama = useRef(new Map<string, DOMRect>());

  useLayoutEffect(() => {
    const wadah = ref.current;
    if (!wadah) return;

    const posisiBaru = new Map<string, DOMRect>();
    const geser: { el: HTMLElement; dx: number; dy: number }[] = [];

    for (const anak of Array.from(wadah.children) as HTMLElement[]) {
      const kunci = anak.dataset.flip;
      if (!kunci) continue;

      const kotak = anak.getBoundingClientRect();
      posisiBaru.set(kunci, kotak);

      const lama = posisiLama.current.get(kunci);
      if (!lama) continue; // kartu baru: biar animasi masuknya yang mengurus

      const dx = lama.left - kotak.left;
      const dy = lama.top - kotak.top;
      if (dx !== 0 || dy !== 0) geser.push({ el: anak, dx, dy });
    }

    posisiLama.current = posisiBaru;

    if (geser.length === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    for (const { el, dx, dy } of geser) {
      el.animate(
        [{ transform: `translate3d(${dx}px, ${dy}px, 0)` }, { transform: 'translate3d(0, 0, 0)' }],
        { duration: 320, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
      );
    }
  }, deps);

  return ref;
}
