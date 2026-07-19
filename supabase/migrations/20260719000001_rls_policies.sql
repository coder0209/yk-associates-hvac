-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.site_metrics enable row level security;
alter table public.services enable row level security;
alter table public.solutions enable row level security;
alter table public.industries enable row level security;
alter table public.brands enable row level security;
alter table public.clients enable row level security;
alter table public.testimonials enable row level security;
alter table public.projects enable row level security;
alter table public.project_images enable row level security;
alter table public.enquiries enable row level security;
alter table public.enquiry_notes enable row level security;

-- 1. Profiles policies
create policy "Admins can view and edit profiles" on public.profiles
  for all using (auth.role() = 'authenticated');

-- 2. Public read, Admin write tables (site_settings, site_metrics, services, solutions, industries, brands, clients, testimonials, projects, project_images)
create policy "Allow public read-only access on site settings" on public.site_settings
  for select using (true);
create policy "Allow admin write access on site settings" on public.site_settings
  for all using (auth.role() = 'authenticated');

create policy "Allow public read-only access on metrics" on public.site_metrics
  for select using (active = true);
create policy "Allow admin write access on metrics" on public.site_metrics
  for all using (auth.role() = 'authenticated');

create policy "Allow public read-only access on services" on public.services
  for select using (active = true);
create policy "Allow admin write access on services" on public.services
  for all using (auth.role() = 'authenticated');

create policy "Allow public read-only access on solutions" on public.solutions
  for select using (active = true);
create policy "Allow admin write access on solutions" on public.solutions
  for all using (auth.role() = 'authenticated');

create policy "Allow public read-only access on industries" on public.industries
  for select using (active = true);
create policy "Allow admin write access on industries" on public.industries
  for all using (auth.role() = 'authenticated');

create policy "Allow public read-only access on brands" on public.brands
  for select using (active = true);
create policy "Allow admin write access on brands" on public.brands
  for all using (auth.role() = 'authenticated');

create policy "Allow public read-only access on clients" on public.clients
  for select using (active = true);
create policy "Allow admin write access on clients" on public.clients
  for all using (auth.role() = 'authenticated');

create policy "Allow public read-only access on testimonials" on public.testimonials
  for select using (active = true);
create policy "Allow admin write access on testimonials" on public.testimonials
  for all using (auth.role() = 'authenticated');

create policy "Allow public read-only access on published projects" on public.projects
  for select using (status = 'published');
create policy "Allow admin write access on projects" on public.projects
  for all using (auth.role() = 'authenticated');

create policy "Allow public read-only access on project gallery images" on public.project_images
  for select using (true);
create policy "Allow admin write access on project gallery images" on public.project_images
  for all using (auth.role() = 'authenticated');

-- 3. Enquiries policies (Public can INSERT only; Authenticated admin can do ALL)
create policy "Allow public to submit enquiries" on public.enquiries
  for insert with check (consent_given = true);
create policy "Allow admin view and update access on enquiries" on public.enquiries
  for all using (auth.role() = 'authenticated');

create policy "Allow admin view and edit access on enquiry notes" on public.enquiry_notes
  for all using (auth.role() = 'authenticated');
