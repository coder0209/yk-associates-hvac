import React from 'react';
import Link from 'next/link';
import { getSolutions } from '@/lib/data';
import { Wind, Shield, CheckCircle2, ChevronRight } from 'lucide-react';

export default async function SolutionsPage() {
  const solutions = await getSolutions();

  return (
    <div className="bg-background">
      {/* HERO */}
      <section className="relative bg-slate-950 text-white py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 px-3 py-1 rounded">
            Systems Matrix
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            HVAC Solutions Engineered for Every Space
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            From smart VRF comfort control to chilled water plants for high-density occupancy.
          </p>
        </div>
      </section>

      {/* SOLUTIONS CATALOG */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((sol) => (
              <div
                key={sol.id}
                className="bg-card border border-border p-6 rounded flex flex-col justify-between hover:shadow-sm hover:border-secondary/20 transition-all group"
              >
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {sol.name}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {sol.description}
                  </p>
                  {sol.benefits && sol.benefits.length > 0 && (
                    <div className="border-t border-border/60 pt-4 mb-6">
                      <span className="text-xs font-bold text-slate-400 block uppercase mb-2">System Benefits:</span>
                      <ul className="space-y-2">
                        {sol.benefits.slice(0, 3).map((benefit: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div>
                  <Link
                    href={`/solutions/${sol.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold tracking-wider text-secondary uppercase hover:text-primary transition-colors"
                  >
                    <span>View System Specifications</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
