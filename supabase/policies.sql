-- Row Level Security policies (high-level recommendations)

-- Enable RLS
alter table profiles enable row level security;
alter table stores enable row level security;
alter table products enable row level security;
alter table product_assets enable row level security;
alter table favorites enable row level security;
alter table conversations enable row level security;
alter table conversation_participants enable row level security;
alter table messages enable row level security;
alter table custom_requests enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table downloads enable row level security;
alter table reviews enable row level security;

-- Profiles: users can view public info and own profile; update own profile only
create policy if not exists profiles_select_public on profiles
  for select using (true);

create policy if not exists profiles_update_self on profiles
  for update using (auth.jwt() ->> 'sub' = clerk_user_id);

-- Stores: public can read published products via joins; only owner can modify
create policy if not exists stores_select_public on stores
  for select using (true);

create policy if not exists stores_owner_write on stores
  for all using (exists (
    select 1 from profiles p
    where p.id = owner_id and p.clerk_user_id = auth.jwt() ->> 'sub'
  ));

-- Products: public read only when published; owner write
create policy if not exists products_select_published on products
  for select using (
    status = 'published'::product_status
    or exists (
      select 1 from stores s join profiles p on s.owner_id = p.id
      where s.id = products.store_id and p.clerk_user_id = auth.jwt() ->> 'sub'
    )
  );

create policy if not exists products_owner_write on products
  for all using (exists (
    select 1 from stores s join profiles p on s.owner_id = p.id
    where s.id = products.store_id and p.clerk_user_id = auth.jwt() ->> 'sub'
  ));

-- Conversations & messages: only participants can read/write
create policy if not exists conversations_participant_select on conversations
  for select using (exists (
    select 1 from conversation_participants cp
    join profiles p on cp.profile_id = p.id
    where cp.conversation_id = conversations.id and p.clerk_user_id = auth.jwt() ->> 'sub'
  ));

create policy if not exists messages_participant_rw on messages
  for all using (exists (
    select 1 from conversation_participants cp
    join profiles p on cp.profile_id = p.id
    where cp.conversation_id = messages.conversation_id and p.clerk_user_id = auth.jwt() ->> 'sub'
  ));

-- Orders & items: buyer and seller (via product.store) can select
create policy if not exists orders_related_select on orders
  for select using (
    exists (
      select 1 from profiles p where p.id = buyer_id and p.clerk_user_id = auth.jwt() ->> 'sub'
    )
    or exists (
      select 1 from order_items oi
      join products pr on pr.id = oi.product_id
      join stores s on s.id = pr.store_id
      join profiles p on p.id = s.owner_id
      where oi.order_id = orders.id and p.clerk_user_id = auth.jwt() ->> 'sub'
    )
  );

-- Reviews: buyers who purchased the product can insert
-- (Enforce via RPC or application layer; placeholder policy for select)
create policy if not exists reviews_select_public on reviews for select using (true);

