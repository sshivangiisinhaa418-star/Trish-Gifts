-- Supabase Schema for TRISH Gifting Platform

-- Profiles Table (Extends Supabase Auth Users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  first_name text,
  last_name text,
  email text,
  phone text,
  newsletter boolean default false,
  is_admin boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ensure columns exist if table was previously created
alter table public.profiles add column if not exists is_admin boolean default false;

-- Handle new user signups automatically
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, first_name, last_name, email, newsletter, is_admin)
  values (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.email,
    (new.raw_user_meta_data->>'newsletter')::boolean,
    coalesce((new.raw_user_meta_data->>'is_admin')::boolean, false)
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- Orders Table (Full Courier & Dispatch Data)
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  recipient_name text not null,
  recipient_email text not null,
  recipient_phone text,
  recipient_alternate_phone text,
  recipient_address text not null,
  landmark text,
  city text,
  state text,
  pincode text,
  delivery_instructions text,
  sender_name text,
  sender_phone text,
  sender_email text,
  billing_address text,
  courier_name text,
  tracking_number text,
  razorpay_order_id text,
  razorpay_payment_id text,
  status text default 'Processing' not null,
  subtotal numeric,
  gst_amount numeric,
  total_amount numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ensure columns exist if table was previously created
alter table public.orders add column if not exists razorpay_order_id text;
alter table public.orders add column if not exists razorpay_payment_id text;
alter table public.orders add column if not exists subtotal numeric;
alter table public.orders add column if not exists gst_amount numeric;

-- Coupons Table
create table if not exists public.coupons (
  id uuid default gen_random_uuid() primary key,
  code text unique not null,
  discount_type text default 'percent' not null, -- 'percent' or 'flat'
  discount_value numeric not null,
  min_order_amount numeric default 0 not null,
  is_active boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- User Persistent Cart Table
create table if not exists public.user_carts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null unique,
  cart_data jsonb default '[]'::jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Support Tickets (Concierge)
create table if not exists public.support_tickets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  order_number text,
  inquiry_type text not null,
  message text not null,
  status text default 'Open' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Products Table
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text not null,
  price numeric not null,
  compare_at_price numeric,
  stock integer default 0 not null,
  sku text,
  intent text not null,
  features text[] default '{}'::text[],
  images text[] not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Order Items Table (Relational Line Items for Orders)
create table if not exists public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id text,
  product_name text not null,
  image text,
  price numeric not null,
  quantity integer default 1 not null,
  gift_wrap boolean default false,
  greeting_card boolean default false,
  gift_message text,
  delivery_date text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Calendar Events Table (For Customer Occasions in Dashboard)
create table if not exists public.calendar_events (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  date text not null,
  relation text,
  intent text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Enablement
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.support_tickets enable row level security;
alter table public.products enable row level security;
alter table public.coupons enable row level security;
alter table public.user_carts enable row level security;
alter table public.order_items enable row level security;
alter table public.calendar_events enable row level security;

-- Profiles Policies
drop policy if exists "Users can view own profile." on profiles;
create policy "Users can view own profile." on profiles for select using (auth.uid() = id);

drop policy if exists "Users can update own profile." on profiles;
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- Coupons Policies
drop policy if exists "Anyone can read coupons." on coupons;
create policy "Anyone can read coupons." on coupons for select using (is_active = true);

-- User Carts Policies
drop policy if exists "Users can manage own cart." on user_carts;
create policy "Users can manage own cart." on user_carts for all using (auth.uid() = user_id);

-- Orders Policies
drop policy if exists "Users can view own orders." on orders;
create policy "Users can view own orders." on orders for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own orders." on orders;
create policy "Users can insert own orders." on orders for insert with check (auth.uid() = user_id or auth.uid() is null);

-- Support Tickets Policies
drop policy if exists "Users can insert tickets." on support_tickets;
create policy "Users can insert tickets." on support_tickets for insert with check (auth.uid() = user_id or auth.uid() is null);

drop policy if exists "Users can view own tickets." on support_tickets;
create policy "Users can view own tickets." on support_tickets for select using (auth.uid() = user_id);

-- Products Policies
drop policy if exists "Anyone can view products." on products;
create policy "Anyone can view products." on products for select using (true);

drop policy if exists "Admin can insert products." on products;
create policy "Admin can insert products." on products for insert with check (
  exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.is_admin = true)
  or auth.email() = 'mayankrajdto@gmail.com'
);

-- Order Items Policies
drop policy if exists "Users can view own order items." on order_items;
create policy "Users can view own order items." on order_items for select using (
  exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid())
);

drop policy if exists "Users can insert order items." on order_items;
create policy "Users can insert order items." on order_items for insert with check (
  exists (select 1 from public.orders where orders.id = order_items.order_id and (orders.user_id = auth.uid() or auth.uid() is null))
);

-- Admin Policies for Order Management & Concierge Support
drop policy if exists "Admin can view all orders." on orders;
create policy "Admin can view all orders." on orders for select using (
  exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.is_admin = true)
  or auth.email() = 'mayankrajdto@gmail.com'
);

drop policy if exists "Admin can update all orders." on orders;
create policy "Admin can update all orders." on orders for update using (
  exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.is_admin = true)
  or auth.email() = 'mayankrajdto@gmail.com'
);

drop policy if exists "Admin can view all order items." on order_items;
create policy "Admin can view all order items." on order_items for select using (
  exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.is_admin = true)
  or auth.email() = 'mayankrajdto@gmail.com'
);

drop policy if exists "Admin can view all support tickets." on support_tickets;
create policy "Admin can view all support tickets." on support_tickets for select using (
  exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.is_admin = true)
  or auth.email() = 'mayankrajdto@gmail.com'
);

drop policy if exists "Admin can update support tickets." on support_tickets;
create policy "Admin can update support tickets." on support_tickets for update using (
  exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.is_admin = true)
  or auth.email() = 'mayankrajdto@gmail.com'
);

-- Calendar Events Policies
drop policy if exists "Users can view own calendar events." on calendar_events;
create policy "Users can view own calendar events." on calendar_events for select using (auth.uid() = user_id);

drop policy if exists "Users can insert own calendar events." on calendar_events;
create policy "Users can insert own calendar events." on calendar_events for insert with check (auth.uid() = user_id);

drop policy if exists "Users can update own calendar events." on calendar_events;
create policy "Users can update own calendar events." on calendar_events for update using (auth.uid() = user_id);

drop policy if exists "Users can delete own calendar events." on calendar_events;
create policy "Users can delete own calendar events." on calendar_events for delete using (auth.uid() = user_id);




