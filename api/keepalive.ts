/**
 * Vercel Cron: dijalankan sekali sehari (lihat vercel.json).
 *
 * Tujuannya menjaga project Supabase free tetap "bangun". Supabase menjeda
 * project free setelah 7 hari tanpa aktivitas; satu query kecil per hari
 * sudah cukup untuk mencegahnya.
 */
export default async function handler(_req: any, res: any): Promise<void> {
  // Cadangan di bawah ini adalah konfigurasi PUBLIK Supabase: URL project dan
  // anon/publishable key. Anon key memang selalu ikut terkirim ke browser dan
  // dilindungi Row Level Security, jadi aman ditulis di repo. Yang TIDAK boleh
  // ada di repo adalah SUPABASE_SERVICE_ROLE_KEY.
  const url =
    process.env.VITE_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    'https://goayauqpwrluofncshec.supabase.co';
  const key = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_iGdfrxa01AkFzSwAN9NzDg_RTq4raxt';

  if (!url || !key) {
    res.status(500).json({ ok: false, reason: 'VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY belum diisi' });
    return;
  }

  try {
    // Kunci baru Supabase (sb_publishable_...) bukan JWT, jadi cukup dikirim
    // lewat header apikey. Kunci lama (JWT) masih perlu Authorization.
    const headers: Record<string, string> = { apikey: key };
    if (key.startsWith('eyJ')) headers.Authorization = `Bearer ${key}`;

    const response = await fetch(`${url}/rest/v1/products?select=id&limit=1`, { headers });

    // Sengaja balas 500 kalau gagal, supaya kegagalan kelihatan di
    // Vercel → project → Cron Jobs (kalau selalu 200, gagalnya senyap).
    res.status(response.ok ? 200 : 500).json({
      ok: response.ok,
      status: response.status,
      checkedAt: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'penyebab tidak diketahui',
    });
  }
}
