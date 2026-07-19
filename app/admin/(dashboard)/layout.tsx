import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  Briefcase, 
  PhoneCall, 
  Settings, 
  LogOut, 
  Menu, 
  User 
} from 'lucide-react';
import { logoutAdmin } from '@/lib/admin-actions';
import { COMPANY_NAME } from '@/lib/config';

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 shrink-0">
        {/* Branding header */}
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <div className="h-8 w-10 relative overflow-hidden bg-white rounded flex items-center justify-center p-0.5 shrink-0">
            <Image
              src="/logo.jpg"
              alt="Logo"
              width={40}
              height={32}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white tracking-wide truncate">{COMPANY_NAME}</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Admin CMS</span>
          </div>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-grow p-4 space-y-1.5 pt-6 text-sm font-medium">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded hover:bg-slate-800 hover:text-white transition-colors"
          >
            <LayoutDashboard className="h-4.5 w-4.5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/admin/projects"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Briefcase className="h-4.5 w-4.5" />
            <span>Projects Portfolio</span>
          </Link>
          <Link
            href="/admin/enquiries"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded hover:bg-slate-800 hover:text-white transition-colors"
          >
            <PhoneCall className="h-4.5 w-4.5" />
            <span>Leads & Enquiries</span>
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Settings className="h-4.5 w-4.5" />
            <span>Website Settings</span>
          </Link>
        </nav>

        {/* Sidebar Footer / Logout */}
        <div className="p-4 border-t border-slate-800">
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded hover:bg-red-900/20 hover:text-red-400 w-full text-left text-sm font-medium transition-colors"
            >
              <LogOut className="h-4.5 w-4.5" />
              <span>Logout Manager</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main dashboard content shell */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Top Header navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 shadow-sm z-30">
          <div className="flex items-center gap-4">
            {/* Title indicator */}
            <span className="font-extrabold text-sm tracking-widest text-slate-400 uppercase">YK ASSOCIATES PORTAL</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-slate-50 border border-slate-200 px-3">
              <User className="h-4 w-4 text-slate-500" />
              <span className="text-xs font-semibold text-slate-650">System Administrator</span>
            </div>
          </div>
        </header>

        {/* Dynamic page contents body */}
        <main className="flex-grow p-6 sm:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
