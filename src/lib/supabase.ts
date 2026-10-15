import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * true kalau .env.local sudah diisi. Kalau false, web tetap jalan memakai
 * data statis di src/data.ts supaya tidak blank saat dikembangkan.
 */
export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  anonKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storageKey: 'sahidTaniAuth',
    },
  },
);

export const STORAGE_BUCKET = 'produk';
