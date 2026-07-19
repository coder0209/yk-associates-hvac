import React from 'react';
import Link from 'next/link';
import { getIndustries } from '@/lib/data';
import { Building2, ShieldAlert, ChevronRight } from 'lucide-react';

export default async function IndustriesPage() {
  const industries = await getIndustries();

  return (
    <div className="bg-background">
      {/* HERO */}
      <section className="relative bg-slate-950 text-white py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 border border-primary/20 px-3 py-1 rounded">
            Sectors Served
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            HVAC Expertise Across Diverse Spaces
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Every building structure requires customized thermal airflow management. Explore our sector solutions.
          </p>
        </div>
      </section>

      {/* LIST OF INDUSTRIES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((ind) => (
              <div
                key={ind.id}
                className="bg-card border border-border p-8 rounded flex flex-col justify-between hover:shadow-sm hover:border-primary/20 transition-all group"
              >
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {ind.name}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {ind.description}
                  </p>
                  {ind.challenges && ind.challenges.length > 0 && (
                    <div className="border-t border-border/60 pt-4 mb-6">
                      <span className="text-xs font-bold text-slate-400 block uppercase mb-2">Technical Challenges Met:</span>
                      <ul className="space-y-2">
                        {ind.challenges.map((challenge: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div>
                  <Link
                    href={`/industries/${ind.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-secondary uppercase hover:text-primary transition-colors"
                  >
                    <span>View Sector HVAC Details</span>
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
