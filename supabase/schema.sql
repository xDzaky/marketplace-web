-- Supabase/Postgres schema for Marketplace Web
-- Enable required extensions
create extension if not exists pgcrypto;

-- 4.1 Profiles (sinkron dari Clerk)
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text unique not null,
  role text not null check (role in ('buyer','seller','admin')),
  display_name text,
  avatar_url text,
  created_at timestamptz default now()
);

-- 4.2 Stores (storefront seller)
create table if not exists stores (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  slug text unique not null,
  bio text,
  banner_url text,
  rating_avg numeric(3,2) default 0,
  created_at timestamptz default now()
);

-- 4.3 Kategori & Tema
create table if not exists categories (
  id bigserial primary key,
  name text not null,
  slug text unique not null
);

create table if not exists themes (
  id bigserial primary key,
  name text not null,
  slug text unique not null
);

-- 4.4 Products (listing)
do $$ begin
  create type product_status as enum ('draft','published','archived');
exception when duplicate_object then null; end $$;

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references stores(id) on delete cascade,
  title text not null,
  slug text unique not null,
  description text,
  tech_stack text[],               -- contoh: {'Next.js','Tailwind','Laravel'}
  price_cents int not null check (price_cents >= 0),
  currency text not null default 'USD',
  demo_url text,
  status product_status not null default 'draft',
  search_tsv tsvector,             -- generated later
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4.5 Relasi kategori/tema & tags
create table if not exists product_categories (
  product_id uuid references products(id) on delete cascade,
  category_id bigint references categories(id) on delete cascade,
  primary key (product_id, category_id)
);

create table if not exists product_themes (
  product_id uuid references products(id) on delete cascade,
  theme_id bigint references themes(id) on delete cascade,
  primary key (product_id, theme_id)
);

create table if not exists tags (
  id bigserial primary key,
  name text not null,
  slug text unique not null
);

create table if not exists product_tags (
  product_id uuid references products(id) on delete cascade,
  tag_id bigint references tags(id) on delete cascade,
  primary key (product_id, tag_id)
);

-- 4.6 Assets (gambar, zip)
do $$ begin
  create type asset_kind as enum ('thumbnail','gallery','zip','doc');
exception when duplicate_object then null; end $$;

create table if not exists product_assets (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  kind asset_kind not null,
  storage_path text not null,      -- path di Supabase Storage
  size_bytes bigint,
  checksum text,
  is_public boolean default false,
  created_at timestamptz default now()
);

-- 4.7 Favorites
create table if not exists favorites (
  profile_id uuid references profiles(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (profile_id, product_id)
);

-- 4.8 Conversations & Messages (chat)
create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  store_id uuid references stores(id) on delete set null,
  created_at timestamptz default now()
);

create table if not exists conversation_participants (
  conversation_id uuid references conversations(id) on delete cascade,
  profile_id uuid references profiles(id) on delete cascade,
  role text check (role in ('buyer','seller')),
  last_read_at timestamptz,
  primary key (conversation_id, profile_id)
);

do $$ begin
  create type message_type as enum ('text','system','file','quote');
exception when duplicate_object then null; end $$;

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  sender_id uuid not null references profiles(id) on delete cascade,
  type message_type not null default 'text',
  content text,                    -- teks (markdown sederhana)
  attachment_path text,            -- jika file
  metadata jsonb,                  -- misal quote harga
  flagged boolean default false,   -- hasil moderation
  created_at timestamptz default now()
);

-- 4.9 Custom Requests (permintaan proyek khusus)
do $$ begin
  create type request_status as enum ('open','in_review','quoted','in_progress','delivered','closed');
exception when duplicate_object then null; end $$;

create table if not exists custom_requests (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references profiles(id) on delete cascade,
  store_id uuid not null references stores(id) on delete cascade,
  title text not null,
  brief text,
  budget_cents int check (budget_cents >= 0),
  currency text default 'USD',
  status request_status not null default 'open',
  quote_cents int,
  due_date date,
  product_id uuid references products(id) on delete set null,   -- jika berakhir jadi produk
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4.10 Orders & Payments
do $$ begin
  create type order_status as enum ('pending','paid','failed','refunded','cancelled');
exception when duplicate_object then null; end $$;

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references profiles(id) on delete cascade,
  status order_status not null default 'pending',
  stripe_payment_intent_id text,
  subtotal_cents int not null,
  fee_cents int not null default 0,      -- platform fee
  total_cents int not null,
  currency text not null default 'USD',
  created_at timestamptz default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id) on delete restrict,
  price_cents int not null,
  license text default 'single-use',
  download_asset_id uuid references product_assets(id), -- zip utama
  creator_share_cents int not null,
  platform_fee_cents int not null
);

do $$ begin
  create type txn_kind as enum ('payment','refund');
exception when duplicate_object then null; end $$;

create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete set null,
  provider text default 'stripe',
  provider_ref text,
  amount_cents int not null,
  kind txn_kind not null,
  status text not null,                    -- 'succeeded'|'failed'|'pending'
  raw jsonb,
  created_at timestamptz default now()
);

-- 4.11 Downloads (link sementara)
create table if not exists downloads (
  id uuid primary key default gen_random_uuid(),
  order_item_id uuid not null references order_items(id) on delete cascade,
  buyer_id uuid not null references profiles(id) on delete cascade,
  token text not null unique,
  expires_at timestamptz not null,
  download_url text,                       -- signed URL (generated)
  times_used int default 0,
  created_at timestamptz default now()
);

-- 4.12 Reviews
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  buyer_id uuid not null references profiles(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now(),
  unique(product_id, buyer_id)
);

-- 4.13 Search index (FTS)
alter table products
  add column if not exists search_tsv tsvector
  generated always as (
    setweight(to_tsvector('simple', coalesce(title,'')), 'A') ||
    setweight(to_tsvector('simple', coalesce(description,'')), 'B')
  ) stored;

create index if not exists products_search_idx on products using gin (search_tsv);
create index if not exists products_status_idx on products(status);
create index if not exists messages_conv_created_idx on messages(conversation_id, created_at desc);
