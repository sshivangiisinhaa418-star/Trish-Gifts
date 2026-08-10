-- Supabase Schema for TRISH Gifting Platform

-- Profiles Table (Extends Supabase Auth Users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  first_name text,
  last_name text,
  email text,
  phone text,
  newsletter boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Handle new user signups automatically
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, first_name, last_name, email, newsletter)
  values (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.email,
    (new.raw_user_meta_data->>'newsletter')::boolean
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- Orders Table
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete set null,
  recipient_name text not null,
  recipient_email text not null,
  recipient_address text not null,
  status text default 'Processing' not null,
  total_amount numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
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

-- RLS Policies
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.support_tickets enable row level security;
alter table public.products enable row level security;

-- Profiles: Users can view and update their own profile
create policy "Users can view own profile." on profiles for select using (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- Orders: Users can view and insert their own orders
create policy "Users can view own orders." on orders for select using (auth.uid() = user_id);
create policy "Users can insert own orders." on orders for insert with check (auth.uid() = user_id);

-- Support Tickets: Users can insert and view their own tickets
create policy "Users can insert tickets." on support_tickets for insert with check (auth.uid() = user_id);
create policy "Users can view own tickets." on support_tickets for select using (auth.uid() = user_id);

-- Products: Anyone can view products
create policy "Anyone can view products." on products for select using (true);
-- Products: Only admin can insert products (we'll check email in the backend, but allow authenticated users here or just admin)
create policy "Admin can insert products." on products for insert with check (
  auth.email() = 'mayankrajdto@gmail.com'
);

-- Order Items Table (Relational Line Items for Orders)
create table if not exists public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id text,
  product_name text not null,
  price numeric not null,
  quantity integer default 1 not null,
  gift_wrap boolean default false,
  gift_message text,
  delivery_date text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.order_items enable row level security;

-- Order Items Policies
create policy "Users can view own order items." on order_items for select using (
  exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid())
);
create policy "Users can insert order items." on order_items for insert with check (
  exists (select 1 from public.orders where orders.id = order_items.order_id and (orders.user_id = auth.uid() or auth.uid() is null))
);

-- Admin Policies for Order Management & Concierge Support
create policy "Admin can view all orders." on orders for select using (auth.email() = 'mayankrajdto@gmail.com');
create policy "Admin can update all orders." on orders for update using (auth.email() = 'mayankrajdto@gmail.com');
create policy "Admin can view all order items." on order_items for select using (auth.email() = 'mayankrajdto@gmail.com');
create policy "Admin can view all support tickets." on support_tickets for select using (auth.email() = 'mayankrajdto@gmail.com');
create policy "Admin can update support tickets." on support_tickets for update using (auth.email() = 'mayankrajdto@gmail.com');

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

alter table public.calendar_events enable row level security;

-- Calendar Events Policies
create policy "Users can view own calendar events." on calendar_events for select using (auth.uid() = user_id);
create policy "Users can insert own calendar events." on calendar_events for insert with check (auth.uid() = user_id);
create policy "Users can update own calendar events." on calendar_events for update using (auth.uid() = user_id);
create policy "Users can delete own calendar events." on calendar_events for delete using (auth.uid() = user_id);


