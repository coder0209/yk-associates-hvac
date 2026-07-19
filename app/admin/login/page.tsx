'use strict';

'use client';

import React, { useActionState } from 'react';
import Image from 'next/image';
import { loginAdmin } from '@/lib/admin-actions';
import { Loader2, Lock, Mail } from 'lucide-react';
import { COMPANY_NAME } from '@/lib/config';

const initialState = {
  success: false,
  error: '',
};

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdmin as any, initialState);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Decorative Blueprint Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40 pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Logo Card Link */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-2 bg-white rounded border border-slate-800 shadow-lg h-12 w-14 relative overflow-hidden mx-auto">
            <Image
              src="/logo.jpg"
              alt="YK Associates Logo"
              width={48}
              height={40}
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">{COMPANY_NAME}</h1>
          <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Admin CMS Portal</p>
        </div>

        {/* Login Panel */}
        <form
          action={formAction}
          className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded shadow-2xl space-y-5"
        >
          {state?.error && (
            <div className="p-3 bg-red-900/30 text-red-300 text-xs font-semibold rounded border border-red-800">
              {state.error}
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
              <input
                id="email"
                type="email"
                name="email"
                required
                className="w-full text-sm border border-slate-850 bg-slate-950 text-white pl-10 pr-4 py-3 rounded focus:border-primary focus:outline-none placeholder-slate-600"
                placeholder="admin@company.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-500" />
              <input
                id="password"
                type="password"
                name="password"
                required
                className="w-full text-sm border border-slate-850 bg-slate-950 text-white pl-10 pr-4 py-3 rounded focus:border-primary focus:outline-none placeholder-slate-600"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 py-3 rounded bg-primary text-white text-sm font-bold hover:bg-primary-hover shadow-lg disabled:bg-slate-850 disabled:text-slate-500 disabled:cursor-not-allowed transition-all"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>AUTHENTICATING...</span>
                </>
              ) : (
                <span>LOGIN PORTAL</span>
              )}
            </button>
          </div>
        </form>

        <div className="text-center">
          <a href="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            &larr; Return to Public Website
          </a>
        </div>
      </div>
    </div>
  );
}
