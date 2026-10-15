-- ============================================================
--  Sahid Tani — skema database
--  Cara pakai: Supabase Dashboard -> SQL Editor -> New query
--              tempel seluruh isi file ini -> Run
--  Aman dijalankan berulang kali.
-- ============================================================

-- ---------- KATEGORI ----------
create table if not exists public.categories (
  id          bigserial primary key,
  name        text not null,
  slug        text not null unique,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

-- ---------- PRODUK ----------
create table if not exists public.products (
  id              bigserial primary key,
  name            text not null,
  slug            text not null unique,
  price           integer not null default 0,
  discount_price  integer,
  category_id     bigint references public.categories(id) on delete set null,
  rating          numeric(2,1) not null default 5.0 check (rating >= 0 and rating <= 5),
  stock           integer not null default 0 check (stock >= 0),
  is_available    boolean not null default true,
  is_featured     boolean not null default false,
  sort_order      integer not null default 0,
  description     text not null default '',
  fruit_features  text not null default '',
  plant_features  text not null default '',
  planting_guide  text not null default '',
  care_guide      text not null default '',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists products_category_id_idx on public.products (category_id);
create index if not exists products_featured_idx    on public.products (is_featured);

-- ---------- DISKON ----------
-- Diskon per produk: discount_price = harga promo, null = tidak sedang diskon.
-- Blok alter ini untuk database yang tabelnya sudah dibuat sebelum ada diskon.
alter table public.products add column if not exists discount_price integer;

alter table public.products drop constraint if exists products_discount_price_valid;
alter table public.products add constraint products_discount_price_valid
  check (discount_price is null or (discount_price > 0 and discount_price < price));

-- ---------- FOTO PRODUK ----------
create table if not exists public.product_images (
  id          bigserial primary key,
  product_id  bigint not null references public.products(id) on delete cascade,
  url         text not null,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists product_images_product_id_idx on public.product_images (product_id);

-- ---------- updated_at otomatis ----------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_touch_updated_at on public.products;
create trigger products_touch_updated_at
  before update on public.products
  for each row execute function public.touch_updated_at();

-- ---------- ROW LEVEL SECURITY ----------
-- Aturan: semua orang boleh MEMBACA, hanya admin yang login boleh MENULIS.
alter table public.categories     enable row level security;
alter table public.products       enable row level security;
alter table public.product_images enable row level security;

drop policy if exists "baca publik kategori" on public.categories;
create policy "baca publik kategori"
  on public.categories for select using (true);

drop policy if exists "baca publik produk" on public.products;
create policy "baca publik produk"
  on public.products for select using (true);

drop policy if exists "baca publik foto" on public.product_images;
create policy "baca publik foto"
  on public.product_images for select using (true);

drop policy if exists "admin kelola kategori" on public.categories;
create policy "admin kelola kategori"
  on public.categories for all to authenticated using (true) with check (true);

drop policy if exists "admin kelola produk" on public.products;
create policy "admin kelola produk"
  on public.products for all to authenticated using (true) with check (true);

drop policy if exists "admin kelola foto" on public.product_images;
create policy "admin kelola foto"
  on public.product_images for all to authenticated using (true) with check (true);

-- ---------- STORAGE (tempat foto produk) ----------
insert into storage.buckets (id, name, public)
values ('produk', 'produk', true)
on conflict (id) do update set public = true;

drop policy if exists "baca foto publik" on storage.objects;
create policy "baca foto publik"
  on storage.objects for select using (bucket_id = 'produk');

drop policy if exists "admin upload foto" on storage.objects;
create policy "admin upload foto"
  on storage.objects for insert to authenticated with check (bucket_id = 'produk');

drop policy if exists "admin ubah foto" on storage.objects;
create policy "admin ubah foto"
  on storage.objects for update to authenticated using (bucket_id = 'produk');

drop policy if exists "admin hapus foto" on storage.objects;
create policy "admin hapus foto"
  on storage.objects for delete to authenticated using (bucket_id = 'produk');

-- ---------- KATEGORI AWAL ----------
insert into public.categories (name, slug, sort_order) values
  ('Pepaya',   'pepaya',   1),
  ('Durian',   'durian',   2),
  ('Alpukat',  'alpukat',  3),
  ('Jeruk',    'jeruk',    4),
  ('Mangga',   'mangga',   5),
  ('Kelapa',   'kelapa',   6),
  ('Sawo',     'sawo',     7),
  ('Jambu',    'jambu',    8),
  ('Klengkeng','klengkeng',9),
  ('Nangka',   'nangka',   10)
on conflict (slug) do nothing;
