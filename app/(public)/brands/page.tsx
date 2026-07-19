import React from 'react';
import Link from 'next/link';
import { getBrands } from '@/lib/data';
import { ShieldCheck, Wind, HelpCircle } from 'lucide-react';

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <div className="bg-background min-h-screen">
      {/* HERO */}
      <section className="relative bg-slate-950 text-white py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 px-3 py-1 rounded">
            Equipment
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            HVAC Brands & Systems We Work With
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We work with leading global and national cooling manufacturers to procure reliable chillers, VRFs, and ducting systems.
          </p>
        </div>
      </section>

      {/* BRANDS GRID */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="bg-card border border-border p-6 rounded flex flex-col justify-between items-center text-center hover:shadow-sm hover:border-primary/25 transition-all group"
              >
                <div className="h-16 w-full flex items-center justify-center bg-slate-50 border border-border rounded mb-4">
                  {/* Since logos will be uploaded via Supabase, we fallback to bold name presentation if no file url matches */}
                  <span className="font-extrabold text-lg text-slate-500 group-hover:text-primary transition-colors uppercase tracking-wide">
                    {brand.name}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-bold text-sm text-foreground">{brand.name} Systems</h3>
                  {brand.description && (
                    <p className="text-xs text-muted-foreground leading-relaxed">{brand.description}</p>
                  )}
                </div>

                {brand.website_url && (
                  <div className="mt-4 pt-3 border-t border-border/60 w-full">
                    <a
                      href={brand.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-secondary uppercase hover:text-primary transition-colors"
                    >
                      <span>Visit Manufacturer Site</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCLOSURE CARD */}
      <section className="py-10 bg-muted border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Note: All manufacturer logos, registered trademarks, brand names, and product ranges referenced are properties of their respective owners. YK Associates provides professional procurement, mechanical system layout design, ducting installation, testing, and third-party commissioning integration using these HVAC units.
          </p>
        </div>
      </section>
    </div>
  );
}
