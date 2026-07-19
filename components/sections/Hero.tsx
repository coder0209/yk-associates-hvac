'use strict';

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, MessageSquare } from 'lucide-react';
import { DEFAULT_CONTACT } from '@/lib/config';

interface HeroProps {
  headline?: string;
  tagline?: string;
}

export default function Hero({ headline, tagline }: HeroProps) {
  const finalHeadline = headline || "Engineering Comfort.\nDesigning Efficient Spaces.";
  const finalTagline = tagline || "End-to-end HVAC solutions engineered for performance, efficiency, and long-term reliability.";

  return (
    <section className="relative min-h-[90vh] flex items-center bg-slate-950 overflow-hidden py-20 lg:py-24">
      {/* Decorative Blueprint Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/80 to-transparent z-10" />

      {/* Decorative visual glow */}
      <div className="absolute top-1/4 right-10 h-72 w-72 rounded-full bg-primary/10 blur-[100px] z-0 pointer-events-none" />
      <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-secondary/10 blur-[100px] z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-primary/10 border border-primary/20 text-xs font-bold tracking-widest text-primary uppercase mb-6">
              HVAC Engineering & Contracting
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight whitespace-pre-line"
          >
            {finalHeadline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl"
          >
            {finalTagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-6 py-3.5 text-base font-bold text-white bg-primary hover:bg-primary-hover rounded shadow-lg transition-transform active:scale-98"
            >
              GET A QUOTE
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-6 py-3.5 text-base font-bold text-slate-200 border border-slate-700 hover:bg-slate-900 rounded transition-colors"
            >
              VIEW OUR PROJECTS
            </Link>
          </motion.div>

          {/* Quick Actions (Call/WhatsApp) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 pt-8 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-sm text-slate-400"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-300">Quick Contact:</span>
            </div>
            <a
              href={`tel:${DEFAULT_CONTACT.phone}`}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="h-4 w-4 text-secondary" />
              <span>Call: {DEFAULT_CONTACT.phone}</span>
            </a>
            <a
              href={`https://wa.me/${DEFAULT_CONTACT.whatsapp.replace(/[^\d]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <MessageSquare className="h-4 w-4 text-green-500 fill-current" />
              <span>WhatsApp Chat</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
