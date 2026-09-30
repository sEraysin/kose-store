-- Catalog data is public only after publication. Staff membership is kept outside
-- the Data API's exposed schemas and can only be assigned by a trusted operator.
create schema if not exists private;

create table private.store_staff (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table private.store_staff enable row level security;
revoke all on private.store_staff from anon, authenticated;

-- This narrow function checks the caller's own identity. It intentionally reads
-- the private staff table without exposing that table to browser clients.
create or replace function private.is_store_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select auth.uid() is not null
    and exists (
      select 1 from private.store_staff
      where user_id = auth.uid()
    );
$$;

revoke all on function private.is_store_staff() from public;
grant usage on schema private to anon, authenticated;
grant execute on function private.is_store_staff() to anon, authenticated;

-- The admin screen uses this public, read-only endpoint for a clear 403 state.
create or replace function public.current_user_is_store_staff()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select private.is_store_staff();
$$;

revoke all on function public.current_user_is_store_staff() from public;
grant execute on function public.current_user_is_store_staff() to authenticated;

create table public.products (
  id text primary key check (id ~ '^(lighting|organizers|stationery|accessories)-[a-z0-9-]+$'),
  category_id text not null check (category_id in ('lighting', 'organizers', 'stationery', 'accessories')),
  name text not null check (length(trim(name)) between 2 and 140),
  short_description text not null default '',
  description text not null default '',
  price_kurus integer not null check (price_kurus > 0),
  image_url text not null check (length(trim(image_url)) > 0),
  gallery text[] not null default '{}',
  color text not null default '',
  material text not null default '',
  dimensions text not null default '',
  detail text not null default '',
  badge text,
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  status text not null default 'draft' check (status in ('draft', 'published')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index products_public_listing_idx
  on public.products (category_id, sort_order, created_at desc)
  where status = 'published';

alter table public.products enable row level security;
revoke all on public.products from anon, authenticated;
grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;

create policy "published products are visible to visitors"
  on public.products for select to anon, authenticated
  using (status = 'published' or private.is_store_staff());

create policy "staff can add products"
  on public.products for insert to authenticated
  with check (private.is_store_staff());

create policy "staff can edit products"
  on public.products for update to authenticated
  using (private.is_store_staff())
  with check (private.is_store_staff());

create policy "staff can remove products"
  on public.products for delete to authenticated
  using (private.is_store_staff());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 10485760, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

create policy "staff can list product images"
  on storage.objects for select to authenticated
  using (bucket_id = 'product-images' and private.is_store_staff());

create policy "staff can upload product images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'product-images' and private.is_store_staff());

create policy "staff can replace product images"
  on storage.objects for update to authenticated
  using (bucket_id = 'product-images' and private.is_store_staff())
  with check (bucket_id = 'product-images' and private.is_store_staff());

create policy "staff can remove product images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'product-images' and private.is_store_staff());
