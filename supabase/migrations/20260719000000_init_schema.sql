-- Enable UUID generator extension
create extension if not exists "uuid-ossp";

-- Profiles table for admin info
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  role text not null default 'admin' check (role in ('admin', 'editor')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Site settings (Guaranteed single-row table via constraint)
create table public.site_settings (
  id integer primary key default 1 check (id = 1),
  company_name text not null default 'YK Associates',
  tagline text not null default 'we CREATE , your COMFORT',
  logo_url text,
  phone text default '[PHONE]',
  whatsapp text default '[WHATSAPP]',
  email text default '[EMAIL]',
  address text default '[ADDRESS]',
  google_maps_url text,
  business_hours jsonb default '{"mon_fri": "9:00 AM - 6:00 PM", "sat": "9:00 AM - 2:00 PM", "sun": "Closed"}'::jsonb,
  service_areas text[] default array['Hyderabad', 'Secunderabad', 'Telangana'],
  social_urls jsonb default '{"linkedin": "", "facebook": "", "instagram": ""}'::jsonb,
  brand_colors jsonb default '{"primary": "#DC2626", "secondary": "#2563EB", "accent": "#64748B"}'::jsonb,
  seo_title text default 'YK Associates | Premium HVAC Engineering & Solutions',
  seo_description text default 'End-to-end commercial and residential HVAC design, planning, execution, and commissioning.',
  seo_share_image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Site metrics (Editable stats cards)
create table public.site_metrics (
  id uuid default gen_random_uuid() primary key,
  label text not null,
  value text not null,
  display_order integer not null default 0,
  active boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Services
create table public.services (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  short_description text not null,
  full_description text,
  icon_name text not null default 'DraftingCompass',
  image_url text,
  display_order integer not null default 0,
  active boolean not null default true,
  seo_title text,
  seo_description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Solutions / Products
create table public.solutions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  description text not null,
  benefits text[],
  applications text[],
  image_url text,
  display_order integer not null default 0,
  active boolean not null default true,
  seo_title text,
  seo_description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Industries
create table public.industries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  description text not null,
  challenges text[],
  image_url text,
  display_order integer not null default 0,
  active boolean not null default true,
  seo_title text,
  seo_description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Brands
create table public.brands (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  logo_url text not null,
  website_url text,
  description text,
  display_order integer not null default 0,
  active boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Clients
create table public.clients (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  logo_url text,
  website_url text,
  display_order integer not null default 0,
  active boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Testimonials
create table public.testimonials (
  id uuid default gen_random_uuid() primary key,
  client_name text not null,
  company_project text not null,
  testimonial text not null,
  image_url text,
  featured boolean not null default false,
  active boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Projects
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  location text not null,
  category text not null,
  hvac_system text not null,
  capacity text,
  completion_year integer,
  short_description text not null,
  overview text,
  challenge text,
  solution text,
  scope_of_work text[],
  cover_image_url text not null,
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published')),
  seo_title text,
  seo_description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Project Images (Gallery)
create table public.project_images (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references public.projects on delete cascade not null,
  image_url text not null,
  alt_text text,
  display_order integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enquiries (Strictly private table)
create table public.enquiries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null,
  email text,
  company_name text,
  location text not null,
  project_type text not null,
  area text,
  floors integer,
  stage text,
  service_required text,
  description text,
  attachment_url text,
  status text not null default 'NEW' check (status in ('NEW', 'CONTACTED', 'SITE_VISIT', 'QUOTE_SENT', 'WON', 'LOST')),
  consent_given boolean not null check (consent_given = true),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enquiry Notes
create table public.enquiry_notes (
  id uuid default gen_random_uuid() primary key,
  enquiry_id uuid references public.enquiries on delete cascade not null,
  author_id uuid references public.profiles on delete set null,
  note text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes for performance
create index idx_projects_slug on public.projects(slug);
create index idx_projects_status_featured on public.projects(status, featured);
create index idx_services_slug on public.services(slug);
create index idx_services_active on public.services(active);
create index idx_solutions_slug on public.solutions(slug);
create index idx_solutions_active on public.solutions(active);
create index idx_industries_slug on public.industries(slug);
create index idx_industries_active on public.industries(active);
create index idx_enquiries_status on public.enquiries(status);
create index idx_enquiries_created_at on public.enquiries(created_at desc);
