# YK Associates - HVAC Engineering Contracting Website & CMS

YK Associates is a premium, engineering-focused full-stack web presence and content management system (CMS) built using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase (PostgreSQL, Auth, Storage)**.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework:** Next.js (App Router, Server Components)
- **Styling System:** Tailwind CSS v4 (Design tokens matching the brand red and blue logo keys)
- **Database & Auth:** Supabase PostgreSQL & Supabase Auth
- **Storage Buckets:**
  - `cms-media` (Public) - Stores case photos, logos, graphics.
  - `enquiry-attachments` (Private) - Stores client blue-prints and drawings safely under RLS policies.
- **Transactional Emails:** Resend (Triggered server-side for lead alerts)
- **Anti-Spam Shield:** Cloudflare Turnstile verification

---

## 🚀 Getting Started (Local Development)

### 1. Sourcing Code & Installation
Clone the repository and install npm packages:
```bash
npm install
```

### 2. Configuration Setup
Create a `.env.local` file in the root directory and define the following variables:
```env
# Supabase Keys
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... # Strictly server-side only

# Domain Base URL (for Canonical links and Sitemap indexation)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Cloudflare Turnstile spam protection (Optional)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAA...
TURNSTILE_SECRET_KEY=0x4AAAAAA...

# Email configuration (Optional)
RESEND_API_KEY=re_123456789...
NOTIFICATION_TO_EMAIL=leads@ykassociates.in
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Setup & Migrations (Supabase)

To link and provision the Supabase backend:

1. **Schema Migration:**
   Go to your Supabase Project Dashboard under **SQL Editor**, create a new query, and execute the contents of the following SQL migration files sequentially:
   - [20260719000000_init_schema.sql](./supabase/migrations/20260719000000_init_schema.sql)
   - [20260719000001_rls_policies.sql](./supabase/migrations/20260719000001_rls_policies.sql)

2. **Seeding Initial/Demo Data:**
   Execute the query contents from [seed.sql](./supabase/seed.sql) to set up default settings, capability definitions, and baseline portfolio case studies.

3. **Storage Buckets Setup:**
   Create two buckets under **Storage** in the Supabase Dashboard:
   - **`cms-media`**: Enable **Public** access. This bucket stores project cover images, service icons, and brand logos.
   - **`enquiry-attachments`**: Keep **Private** (do NOT check public access). This stores uploaded drawing files securely.

---

## 🔒 Security Guidelines

1. **Row Level Security (RLS):** RLS policies are enabled on all tables. Public clients can read settings, solutions, and services, and perform inserts on `enquiries`. Only authenticated admins have full access to view, update, or delete records.
2. **Private File Downloads:** All blueprints uploaded by potential customers are saved in the private `enquiry-attachments` bucket. The browser client cannot read these files. Admins can view/download files securely inside the CMS using short-lived signed URLs (valid for 5 minutes) generated server-side.
3. **Turnstile Captcha Verification:** Cloudflare Turnstile checks are executed server-side inside Server Actions before data mutations or storage uploads occur, avoiding automated script spam.

---

## 🌐 Production Deployment

This application is ready for Vercel, Netlify, or similar Serverless deployment platforms.

1. Push code repository to GitHub.
2. Link the repository to your Vercel/Netlify dashboard.
3. Inject the production environment variables (from `.env.local`) into the deployment environment variables dashboard.
4. Set the build command to `npm run build` and output directory to `.next`.
5. Trigger deployment. Next.js Incremental Static Regeneration (ISR) handles dynamic rendering speeds automatically.
